const Contenedor = require('./contenedorClass.js');
const express = require('express');
const { Router } = express;
const handlebars = require('express-handlebars');

const app = express();
const router = new Router();
const cont = new Contenedor('productosCont.json');
const PORT = 8080;

const getRandom = () => {
    const contArr = cont.getAll();
    const rand = contArr.length * Math.random();
    const selection = parseInt(String(rand));
    return contArr[selection];
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

const server = app.listen(PORT, () => {console.log(`Servidor abierto en puerto ${PORT}`)})
app.on('error', (err) => {console.log(`Error en la carga del servidor:\n${err}`)})
app.use(express.static(__dirname + '/public'))

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

router.get('/productos', mwSearchId, (req, res) => {
    id = res.locals.id;
    if(isNaN(id)){
        const allProducts = cont.getAll();
        console.log(allProducts?allProducts.length>0:false)
        res.render('main', {data:allProducts, dataExist:allProducts?allProducts.length>0:false})
    } else {
        try{
            res.send(cont.getById(id));
        } catch (err) {
            res.status(500).send({error: "El producto no existe"})
        }
    }
})

router.get('/productoRandom', (req, res) => {
    res.send(getRandom());
})

router.get('/chat', (req, res) => {
    res.render('chat');
})

router.post('/productos', (req, res) => {
    const body = req.body;
    const parsePrice = parseFloat(body.price);
    if(isNaN(parsePrice)){
        res.status(400).send("Invalid Price Input");
    } else {
        const newProd = {...body, price: parsePrice};
        cont.save(newProd);
        //res.status(200).send(newProd);
        res.redirect('/')
    }
})

router.put('/productos', mwSearchId, (req, res) => {
    id = res.locals.id;
    const body = req.body;
    const parsePrice = parseFloat(body.price);
    if(isNaN(id)){
        res.status(400).send({error: "Invalid Product ID"});
    } else if (isNaN(parsePrice)){
        res.status(400).send("Invalid Price Input");
    } else {
        try{
            cont.getById(id); //to raise error if it doesn't exist
            const newProd = {...body, price: parsePrice};
            cont.change(id, newProd);
            res.status(200).send(newProd);
        } catch (err) {
            res.status(500).send({error: "El producto no existe"})
        }
    }
})

router.delete('/productos', mwSearchId, (req, res) => {
    id = res.locals.id;
    if(isNaN(id)){
        res.status(400).send({error: "Invalid Product ID"});
    } else {
        try{
            const temp = cont.getById(id);
            cont.deleteById(id);
            res.status(200).send(temp);
        } catch (err) {
            res.status(500).send({error: "El producto no existe"})
        }
    }
})

app.use('/api', router)