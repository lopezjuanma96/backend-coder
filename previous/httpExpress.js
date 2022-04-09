const { response } = require('express');
const express = require('express')
const app = express()

const PORT = 8080
let visitCount = 0; 
const server = app.listen(PORT, () => {console.log(`servidor conectado al puerto ${PORT}`)})
app.on('error', (err) => {console.log(`no pudo cargarse el servidor porque ${err}`)}) //app.on permite dar distintas respuestas ante distintos eventos

app.get('/', (req, res) => {
    res.send('<h1 style="color:blue">Bienvenidos al servidor express</h1>')
})

app.get('/visitas', (req, res) => {
    visitCount++;
    if(Object.entries(req.query).length > 0){
        if(req.query.div){
            visitCount/=parseFloat(req.query.div);
        }
    }
    res.send(`La cantidad de visitas es ${visitCount}`)
})

app.get('/fyh/:tiempo', (req, res) => {
    const fecha = new Date();
    const fechaResp = {
        ano: fecha.getFullYear(),
        mes: fecha.getMonth(),
        dia: fecha.getDay(),
        hora: fecha.getHours()
    }
    res.send(Object.fromEntries(Object.entries(fechaResp).filter((elem) => elem[0] === req.params.tiempo)));
})

app.get('/fyh', (req, res) => {
    const fecha = new Date();
    const fechaResp = {
        ano: fecha.getFullYear(),
        mes: fecha.getMonth(),
        dia: fecha.getDay(),
        hora: fecha.getHours()
    }
    res.send( fechaResp );
})

