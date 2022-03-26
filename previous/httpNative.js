const http = require('http')
const moment = require('moment')

const server = http.createServer((request, response) =>{
    const hora = parseInt(moment().format('h')); //variante: new Date().getHours();
    let msg;
    if(hora > 12){
        msg = "o debería decir Buenas Tardes";
    } else {
        msg = "o debería decir Buenas Noches xD"
    }
    response.end(`Hola Mundo ${msg}`);
})
const connectedServer = server.listen(8080, () => {console.log("Servidor conectado al puerto 8080")})
