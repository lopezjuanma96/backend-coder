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