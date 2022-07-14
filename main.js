/////////////////////////
//// IMPORTS
/////////////////////////
import { prodDAO as prod, chatDAO as messages } from './DAOSelector.js';
import { log as msgSchema } from './utils/norms/msgSchema.js'
import { normalize, denormalize } from 'normalizr';

import express from 'express'
import routerProd from './utils/routes/productRoute.js';
import routerCart from './utils/routes/cartRoute.js';

import { engine } from 'express-handlebars';

import { Server as IOServer } from 'socket.io';
import { Server as HttpServer } from 'http';

import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';

///////////////////////
//// SETUP
///////////////////////
const app = express();
const http = new HttpServer(app);
const io = new IOServer(http);
const PORT = 8080;

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

const server = http.listen(PORT, () => {console.log(`Servidor abierto en puerto ${PORT}`)})

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
    saveUninitialized: false
}));

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

app.get('/api/chat', (req, res) => {
    res.render('chat');
})

//////////////////////////////////////
////// LOGIN REQUESTS
//////////////////////////////////////

app.post('/api/login', (req, res) => {
    const logObj = req.body;
    Object.keys(logObj).forEach((k) => req.session[k] = req.body[k]);
    res.status(200).redirect("/");
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