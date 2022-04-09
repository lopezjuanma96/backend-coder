const Contenedor = require('../contenedorClass.js')
const express = require('express')
const app = express()
const cont = new Contenedor('productosCont.json')
const PORT = 8080

const getRandom = () => {
    const contArr = cont.getAll();
    const rand = contArr.length * Math.random();
    const selection = parseInt(String(rand));
    return contArr[selection];
}

const server = app.listen(PORT, () => {console.log(`Servidor abierto en puerto ${PORT}`)})
app.on('error', (err) => {console.log(`Error en la carga del servidor:\n${err}`)})

app.get('/', (req, res) => {
    res.send('<ul><li><a href="./productos">Lista de Productos</a></li><li><a href="./productoRandom">Producto al Azar</a></li></ul>');
})

app.get('/productos', (req, res) => {
    res.send(cont.getAll());
})

app.get('/productoRandom', (req, res) => {
    res.send(getRandom());
})