/////////////////////////
//// IMPORTS
/////////////////////////
const ContenedorProd = require('./contenedorProductosKnexClass.js');
const ContenedorChat = require('./contenedorChatKnexClass.js')
const Contenedor = require('./contenedorClass.js');
const express = require('express');
const { Router } = express;
const { engine } = require('express-handlebars');
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const { readFileSync } = require('fs');

///////////////////////
//// SETUP
///////////////////////
const app = express();
const http = new HttpServer(app);
const io = new IOServer(http);
const routerProd = new Router();
const routerCart = new Router();
const prod = new ContenedorProd();
const messages = new ContenedorChat();
const cart = new Contenedor('./carritoCont.json');
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const server = http.listen(PORT, () => {console.log(`Servidor abierto en puerto ${PORT}`)})

app.on('error', (err) => {console.log(`Error en la carga del servidor:\n${err}`)})
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

/////////////////////////////////////////
///////// TOOLS: (should be imported from another script later)
////////////////////////////////////////
const mwSearchId = (req, res, next) => {
    if(Object.entries(req.query).length > 0){
        const searchId = parseFloat(req.query.id);
        if(isNaN(searchId)){
            res.status(400).send({error: "Invalid Product ID"});
        } else {
            res.locals.id = searchId;
            next();
        }
    } else {
        res.locals.id = NaN;
        next();
    }
}

const checkUser = (req, res, next) => {
    const userName = localStorage.getItem('userName')
    console.log(`Leyendo usuario ${userName}`)
    if(userName){
        const userAccessList = JSON.parse(readFileSync("./userAccessList.json"));
        if(userName != "" && userAccessList.find((elem) => elem === userName)){
            console.log("El usuario se encuentra en la base de datos")
            next();
        } else {
            console.log("El usuario no se encuentra en la base de datos")
            req.redirect("/");
        }
    }
}

//////////////////////////////////////
////// PRODUCT REQUESTS
//////////////////////////////////////
routerProd.get('/productos', mwSearchId, (req, res) => {
    id = res.locals.id;
    if(isNaN(id)){
        prod.getAll()
        .then((allProducts) => res.render('main', {data:allProducts, dataExist:allProducts?allProducts.length>0:false}))
        .catch((e) => console.log(e));
    } else {
        try{
            prod.getById(id)
            .then((prod) => res.send(prod))
            .catch((e) => console.log(e));
        } catch (err) {
            res.status(500).send({error: "El producto no existe"})
        }
    }
})

routerProd.post('/productos', (req, res) => {
    const body = req.body;
    const parsePrice = parseFloat(body.price);
    if(isNaN(parsePrice)){
        res.status(400).send("Invalid Price Input");
    } else {
        const newProd = {...body, price: parsePrice};
        prod.save(newProd)
        .then(() => res.redirect('/'))
        .catch((e) => console.log(e))
        .finally(prod.close());
    }
})

routerProd.put('/productos', mwSearchId, (req, res) => {
    id = res.locals.id;
    const body = req.body;
    const parsePrice = parseFloat(body.price);
    if(isNaN(id)){
        res.status(400).send({error: "Invalid Product ID"});
    } else if (isNaN(parsePrice)){
        res.status(400).send("Invalid Price Input");
    } else {
        try{
            const newProd = {...body, price: parsePrice};
            prod.change(id, newProd)
            .then(() => res.status(200).send(newProd))
            .catch((e) => {throw e})
            .finally(prod.close());
        } catch (err) {
            res.status(500).send({error: "El producto no existe"})
        }
    }
})

routerProd.delete('/productos', mwSearchId, (req, res) => {
    id = res.locals.id;
    if(isNaN(id)){
        res.status(400).send({error: "Invalid Product ID"});
    } else {
        try{
            prod.getById(id)
            .then(res.status(200).send(temp))
            .catch((e) => {throw e});
            prod.deleteById(id)
            .catch((e) => {throw e})
            .finally(prod.close());
        } catch (err) {
            res.status(500).send({error: "El producto no existe"})
        }
    }
})

app.use('/api/productos', routerProd);

//////////////////////////////////////
////// CART REQUESTS
//////////////////////////////////////

routerCart.post('/', (req, res) => {
    const newId = cart.save({productos: []});  //i dont know why this is returning a promise.
    res.status(200).send(JSON.stringify({id: newId}));
})

routerCart.delete('/:id', (req, res) => {
    const thisCartId = parseFloat(req.params.id);
    try{
        const deletedItem = cart.getById(thisCartId);
        cart.deleteById(thisCartId);
        res.status(200).send(JSON.stringify({deletedItem}));
    } catch (e) {
        res.status(500).send(JSON.stringify({error: "ID carrito inexistente"}));
    }
})

routerCart.get('/:id/productos', (req, res) => {
    const thisCartId = parseFloat(req.params.id);
    const thisCart = cart.getById(thisCartId);
    res.status(200).send(JSON.stringify(thisCart.productos));
})

routerCart.post('/:id/productos/:id_prod', (req, res) => {
    const thisCartId = parseFloat(req.params.id);
    const thisProdId = parseFloat(req.params.id_prod);
    try{
        const thisCart = cart.getById(thisCartId);
        try {
            const thisProd = prod.getById(thisProdId);
            thisCart.productos.push(thisProd);
            cart.change(thisCartId, thisCart);
            res.status(200).send(JSON.stringify(thisCart));
        } catch (e) {
            res.status(500).send(JSON.stringify({error: "ID producto inexistente"}));
        }
    } catch (e) {
        res.status(500).send(JSON.stringify({error: "ID carrito inexistente"}));
    }
})

routerCart.delete('/:id/productos/:id_prod', (req, res) => {
    const thisCartId = parseFloat(req.params.id);
    const thisProdId = parseFloat(req.params.id_prod);
    try{
        const thisCart = cart.getById(thisCartId);
        try {
            const thisProd = prod.getById(thisProdId);
            if (thisCart.productos.find((e) => e.id === thisProdId)){
                thisCart.productos = thisCart.productos.filter((e) => e.id !== thisProdId);
                cart.change(thisCartId, thisCart);
                res.status(200).send(JSON.stringify(thisCart));
            } else {
                res.status(200).send("There's no product of that ID in the requested Cart\n" + JSON.stringify(thisCart))
            }
        } catch (e) {
            res.status(500).send(JSON.stringify({error: "ID producto inexistente"}));
        }
    } catch (e) {
        res.status(500).send(JSON.stringify({error: "ID carrito inexistente"}));
    }
})

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