/////////////////////////
//// IMPORTS
/////////////////////////
import {} from 'dotenv/config';
//with import it has to be done like this because importing to a variable and then running config does not "translate" to other files, since imports are done before running functions. SHOULD SEE HOW TO PASS PARAMS (for example the .env path)

import { prodDAO as prod, chatDAO as messages } from './utils/DAOSelector.js';
import { log as msgSchema } from './utils/norms/msgSchema.js'
import { normalize, denormalize } from 'normalizr';

import express from 'express'
import routerProd from './utils/routes/productRoute.js';
import routerCart from './utils/routes/cartRoute.js';
import routerLogin from './utils/routes/loginRoute.js';

import { engine } from 'express-handlebars';

import { Server as IOServer } from 'socket.io';
import { Server as HttpServer } from 'http';

import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';

import { checkUser } from './utils/mws.js';

import yargsMod from 'yargs/yargs';
import { fork } from 'child_process';
import { compute } from './utils/randomChild.js';

///////////////////////
//// SETUP
///////////////////////
const app = express();
const http = new HttpServer(app);
const io = new IOServer(http);
const yargs = yargsMod(process.argv)
            .alias({ p: 'PORT', port: 'PORT' })
            .array('PORT')
            .default({ port: 8080 });
const PORT = yargs.argv.PORT[0];

process.on('uncaughtException', (err) =>{
    console.log(`Uncaught Exception raised by: ${err}`) //INSTEAD OF CONSOLE LOGGING, THIS CAN BE LOGGED ON FILES SO WHEN TESTING RUNNING THE SCRIPT AND GOING TO THE FILE TO GET A "REPORT"
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: './views/layouts',
    partialsDir: './views/partials'
}))
app.set('view engine', 'hbs');
app.set('views', './views');

const server = http.listen(PORT, () => {console.log(`Servidor abierto en http://localhost:${PORT}`)})

app.on('error', (err) => {console.log(`Error en la carga del servidor:\n${err}`)})
app.use(express.static('./public'));
app.use(express.static('./views'));

app.use(cookieParser());

app.use(session({
    store: mongoStore.create( { mongoUrl: 'mongodb+srv://zagador123:446032@cluster0.snysn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
                                useNewUrlParser: true,
                                useUnifiedTopology: true
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie : { maxAge : 60000 }
}));

app.get('/api/home', checkUser, (req, res) => {
    const userData = {...req.session};
    delete userData.cookie;
    res.render('home', { userData });
})

//////////////////////////////////////
////// PRODUCT REQUESTS
//////////////////////////////////////

app.use('/api/productos', routerProd);

//////////////////////////////////////
////// CART REQUESTS
//////////////////////////////////////

app.use('/api/carrito', routerCart);

//////////////////////////////////////
////// CHAT REQUESTS
//////////////////////////////////////

app.get('/api/chat', checkUser, (req, res) => {
    const userData = {...req.session};
    delete userData.cookie;
    res.render('chat', { userData });
})

//////////////////////////////////////
////// LOGIN REQUESTS
//////////////////////////////////////

app.use('/api/users', routerLogin);

//////////////////////////////////////
////// INFO REQUESTS
//////////////////////////////////////

app.get('/info', (req, res) => {
    res.render('info', {
        args: JSON.stringify(yargs.argv),
        os: process.platform,
        version: process.version,
        rss: process.memoryUsage().heapTotal,
        path: process.execPath,
        dir: process.cwd(), 
        id: process.pid,
    })
})

app.get('/api/random', (req, res) => {
    const nums = parseInt(req.query.nums) || 100000000;
    const max = parseInt(req.query.max) || 1000;
    
    if(Boolean(req.query.fork)){
        const compute = fork('./utils/randomChild.js');
        compute.send(`start,${nums},${max}`);
        compute.on('message', (msg) => {
            res.status(200).json(msg);
        })
    } else {
        res.status(200).json(compute(nums, max));
    }
})

//////////////////////////////////////
////// GLOBAL MIDDLEWARES
//////////////////////////////////////

app.use((req, res, next) => {
    res.status(404).send(JSON.stringify({ error : -2, descripcion: `ruta ${req.url} metodo ${req.method} no implementada`}))
})


///////////////////////////////////
////// WEBSOCKET
///////////////////////////////////

io.on('connection', (socket) => {
    console.log('usuario connectado');
    messages.getAll()
    .then((messageList) => socket.emit('messageList', messageList))
    .catch((e) => console.log(e));
    //socket.emit('message', 'Este es un mensaje emitido por el socket del servidor'); //CUIDADO, es importante nombrar bien la variable (en este caso 'message') porque si no respeto el nombre del lado del cliente no va a andar
    socket.on('chatMessage', (data) => {
        messages.getAll()
        .then((messageList) => {
            if (messageList.length === 0){
                const msgObj = {id: "messages", messages: [{id: "1", ...data}]};
                messages.save(normalize(msgObj, msgSchema))
                .then(() => {
                    messages.getAll()
                    .then((messageList) => io.sockets.emit('messageList', messageList))
                    .catch((e) => console.log(e));
                })
            } else {
                const msgObj = denormalize(messageList[0].result, msgSchema, messageList[0].entities);
                const newId = msgObj.messages.map((o) => parseInt(o.id)).sort((a,b) => b-a)[0] + 1
                msgObj.messages.push({ id: `${newId}`, ...data});
                messages.change(0, normalize(msgObj, msgSchema))
                .then(() => {
                    messages.getAll()
                    .then((messageList) => io.sockets.emit('messageList', messageList))
                    .catch((e) => console.log(e));
                })
            }
        })
        .catch((e) => console.log(e)); //broadcast envío a todos los clientes conectados: io.sockets.emmit(..)
    });
    socket.on('productAdd', (data) => {
        const parsePrice = parseFloat(data.price);
        if(isNaN(parsePrice)){
            throw Error("Invalid Price Input");
        } else {
            const newProd = {...data, price: parsePrice};
            prod.save(newProd)
            .catch((e) => console.log(e))
            .finally(() => {
                io.sockets.emit('updateProducts', true)
            });
        }
    })
})