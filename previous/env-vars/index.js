const config = require('./config.js');
const express = require('express');
require('dotenv').config()

console.log(config.NODE_ENV)
console.log(process.env.FONDO, process.env.FRENTE)

const app = express();

app.get('/', (req, res) => res.send('holis'))

app.listen(config.PORT, config.HOST, ()=>console.log(`abierto en puerto ${config.PORT} y host ${config.HOST}`))
//to modify this values with arguments on CLI: NODE_ENV=production PORT=8080 HOST=128.1.1.2 node index
//(does not work on powershell or windows cmd, have to set env vars for the whole system/user)