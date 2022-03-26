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
    res.send(`La cantidad de visitas es ${visitCount}`)
})

app.get('/fyh', (req, res) => {
    const fecha = new Date();
    res.send(
        {
            ano: fecha.getFullYear(),
            mes: fecha.getMonth(),
            dia: fecha.getDay(),
            hora: fecha.getHours()
        }
        )
})