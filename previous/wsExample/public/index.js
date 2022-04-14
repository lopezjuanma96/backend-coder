// este script representa a el cliente

const socket = io(); //conexion con websockets, la variable io la saca del script server.js, no se bien como

socket.on('message', (data) => { //'message es el nombre de la variable que defini en el servidor
    alert(data);
    socket.emit('messageResp', 'Este es un mensaje enviado desde el cliente por sockets'); //nuevamente cuidado con el nombre de la variable para recibirla bien desde el servidor
})