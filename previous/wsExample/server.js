const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");

const app = express();
const http = new HttpServer(app);
const io = new IOServer(http);

app.use(express.static("./public"))

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname}); //another option for sendFile(__dirname + '/index.html')
})

http.listen(4000, () => console.log("Server ON!"))

const messageList = []

io.on('connection', (socket) => {
    console.log('usuario connectado');
    socket.emit('messages', messageList);
    //socket.emit('message', 'Este es un mensaje emitido por el socket del servidor'); //CUIDADO, es importante nombrar bien la variable (en este caso 'message') porque si no respeto el nombre del lado del cliente no va a andar
    socket.on('message', (data) => {
        messageList.push({id: socket.id, data});
        io.sockets.emit('messages', messageList); //broadcast envío a todos los clientes conectados: io.sockets.emmit(..)
    });
})