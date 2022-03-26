// usamos el modulo nativo http con const http = require('http')

/*
FUNCIONAMIENTO: ver bien el PPT de la clase 6 

const server = http.createServer(callback(request, response)) -> crea el server
La función callback que enviamos a createServer() recibe dos parámetros que son la petición y la respuesta. 
La petición por ahora no la usamos, pero contiene datos de la petición realizada.
La respuesta la usaremos para enviarle datos al cliente que hizo la petición. 
De modo que "respuesta.end()" sirve para terminar la petición y enviarle datos al cliente.
La respuesta es un String que normalmente retorna informacion en formato JSON o XML.

server.on('event', callback(args_depending_on_event)) -> permite dar al servidor otras respuestas
en funcion de ciertos eventos, por ejemplo 'error'. dependiendo del evento seleccionado el callback
recibe distintos parametros, por ejemplo en 'error' recibe un parametro con el error generado

const connectedServer = server.listen(port, callback()) -> pone al servidor a escuchar en el puesto port
"listen()" recibe también una función callback que realmente no sería necesaria, 
pero que nos sirve para hacer cosas cuando el servidor se haya iniciado y esté listo. 
Simplemente, en esa función callback indico que estoy listo y escuchando en el puerto configurado.
Listen, además, devuelve un objeto que contiene los datos del servidor conectado.

/////EJEMPLO HASTA ACÁ/////////
const server = http.createServer((request, response) =>{
    response.end("Hola Mundo");
})
const connectedServer = server.listen(8080, () => {console.log("Servidor conectado al puerto 8080")})

y luego entro a localhost:8080 en el navegador
///////////////////////////////

BUSCAR APLICACION POSTMAN PARA EVALAR SERVIDORES
*/

/*
express: Framework que facilita la creacion de servidores, otro conocido es NextJS

const app = express() define la app que va a trabajar los metodos, se puede trabajar 
de manera más directa como const app = require('express')

const server = app.listen(PORT, callback) -> similar al listen de http pero no hace falta crear el server

server.on('event', callback(depending_on_event)) -> similar a http

app.get('subpath', callback(req, res)) -> permite definir el comportamiento del servidor ante un determinado
"subdirectorio" (o query) del servidor similarmente a createServer de http, 
por ejemplo si subpath es / es la respuesta para localhost:PORT
(aunque todavia no lo vimos, esta creando la respuesta a un GET)

ver que funciones tiene req y res, hasta ahora conozco send y end

/////EJEMPLO HASTA ACÁ/////////
const express = require('express')
const app = express()

const PORT = 8080
const server = app.listen(PORT, () => {console.log(`servidor conectado al puerto ${PORT}`)})
app.on('error', (err) => {console.log(`no pudo cargarse el servidor porque ${err}`)}) //app.on permite dar distintas respuestas ante distintos eventos

app.get('/', (req, res) => {
    //res.send("con send puedo mandar un string")
    res.send({message: "con send puedo mandar un objeto que se formatea a JSON"})
    //res.end("este es mi end");
})
///////////////////////////////
*/