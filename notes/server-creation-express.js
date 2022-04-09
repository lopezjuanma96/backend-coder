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

/*HTTP: protocolo de transferencia de archivos a través de la metodología solicitud-respuesta

Codigos de estado: representan el estado de una petición
1xx: Informativa, el servidor recibio la solicitud y esta procesandola
2xx: Exito, peticion recibida y procesada con exito
3xx: Redireccion, más acciones son requeridas para completar la solicitud
4xx: Error de cliente, la petición no puede ser procesada por un error en la misma (direccion o contenido invalido)
5xx: Error de servidor, la petición no puede ser procesada por un error o incapacidad en el servidor (la petición pareciera válida)

*/

/*API: Define como se comunican los sistemas. Puede tener interfaz gráfica

API REST: (REpresentational State Transfer) tipo de API con ciertos parámetros:

-> Cacheable

-> Arquitectura Cliente-Servidor sin estado (stateless): 
cada petición debe contener toda la informacion necesaria y ser independientes entre sí

-> Operaciones Comunes: 
todos los recursos deben poder ser consumidos con POST, GET, PUT y DELETE
estos son comparables a los métodos CRUD de la bases de datos Create, Read, Update, Delete

-> Interfaz Uniorme:
la estructura de los recursos y las URI/URL de los métodos debe ser uniforme y consistente.

-> Utilizacion de hipermedios:
trabajar con compaginación, por ejemplo devolviendo en una lista de los primeros 100 productos
de una base datos, la URL para la solicitud de los próximos 100

La transferencia de datos se hace a través de XML o JSON 
(JSON hoy es la más común, XML era comun antes en servicios SWAP, en vez de REST)

API RESTful:
APIs centradas en los recursos del backend/base de datos, llamados sustantivos, ej: Usuario;
son lo contrario a las API RPC (Remote Procedure Calls) que están basadas en los métodos o 
procedimientos del backend, llamados verbos, ej: getUsuario.
*/

/* EXPRESS AVANZADO

siempre empezando con 

const express = require('express')
const app = express()
const server = app.listen(PORT, () => {console.log(`Servidor abierto en puerto ${PORT}`)})

Operación GET:

//query params que se acceden como URI?queryParams
app.get("/URI", (req, res) => {
    //los queryParams entran como req.query
    if (Object.entries(req.query).length > 0){
        res.json({
            response:"request con query params",
            query: req.query
        })
    } else {
        res.json({
            response:"request sin query params",
            query: undefined
        })
    }
})

//params que se acceden como URI/params
app.get("/URI/:ident", (req, res) => {
    //los queryParams entran como req.query
    if (Object.entries(req.params.ident).length > 0){
        res.send({
            response:"request con query params",
            query: req.params.ident
        })
    } else {
        res.send({
            response:"request sin query params",
            query: undefined
        })
    }
})

*/