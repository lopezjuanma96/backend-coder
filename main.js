const Contenedor = require('./contenedorClass.js');
const express = require('express');
const { Router } = express;

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

const server = app.listen(PORT, () => {console.log(`Servidor abierto en puerto ${PORT}`)})
app.on('error', (err) => {console.log(`Error en la carga del servidor:\n${err}`)})
app.use(express.static(__dirname + '/public'))

router.get('/productos', (req, res) => {
    if(Object.entries(req.query).length > 0){
        const searchId = parseFloat(req.query.id);
        try{
            if(isNaN(searchId)){
                console.log(searchId)
                res.status(400).send("Invalid Product ID")
            } else {
                res.send(cont.getById(searchId));
            }
        } catch (err) {
            res.status(500).send(err)
        }
    } else {
        res.send(cont.getAll());
    }
})

router.get('/productoRandom', (req, res) => {
    res.send(getRandom());
})

router.post('/productos', (req, res) => {
    const body = req.body;
    const parsePrice = parseFloat(body.price);
    if(isNaN(parsePrice)){
        res.status(400).send("Invalid Price Input");
    } else {
        const newProd = {...body, price: parsePrice};
        cont.save(newProd);
        res.status(200).send(newProd);
    }
})

router.put('productos', (req, res) => {
    if(Object.entries(req.query).length > 0){
        const searchId = parseFloat(req.query.id);
        try{
            if(isNaN(searchId)){
                console.log(searchId)
                res.status(400).send("Invalid Product ID")
            } else {
                const temp = cont.getById(searchId);
                const newProd = {...req.body, price : parseFloat(req.body.price)};
                cont.deleteById(searchId);
                cont.save(newProd);
                res.send(temp);
            }
        } catch (err) {
            res.status(500).send(err)
        }
    } else {
        res.send(cont.getAll());
    }
})

router.delete('productos', (req, res) => {
    if(Object.entries(req.query).length > 0){
        const searchId = parseFloat(req.query.id);
        try{
            if(isNaN(searchId)){
                console.log(searchId)
                res.status(400).send("Invalid Product ID")
            } else {
                const temp = cont.getById(searchId);
                cont.deleteById(searchId);
                res.send(temp);
            }
        } catch (err) {
            res.status(500).send(err)
        }
    } else {
        res.send(cont.getAll());
    }
})

app.use('/api', router)