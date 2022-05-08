/////////////////////////
//// IMPORTS
/////////////////////////
import ContenedorProd from './daos/prods/contenedorProductosKnexClass.js';
import ContenedorChat from './daos/chat/contenedorChatKnexClass.js';
import { readFileSync } from 'fs';

import express from 'express'
import routerProd from './utils/routes/productRoute.js';
import routerCart from './utils/routes/cartRoute.js';

import { engine } from 'express-handlebars';

import { Server as IOServer } from 'socket.io';
import { Server as HttpServer } from 'http';

///////////////////////
//// SETUP
///////////////////////
const app = express();
const http = new HttpServer(app);
const io = new IOServer(http);
const prod = new ContenedorProd();
const messages = new ContenedorChat();
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
        messages.save({socket: socket.id, ...data})
        .then(() => {
            messages.getAll()
            .then((messageList) => io.sockets.emit('messageList', messageList))
            .catch((e) => console.log(e));
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