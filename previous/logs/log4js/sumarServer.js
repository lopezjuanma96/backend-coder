const logger = require('./sumarLogger.js')
const express = require('express');

const app = express();

app.get('/sumar', (req, res) => {
    const { n1, n2 } = req.query;
    if(!isNaN(n1) && !isNaN(n2)){
        logger.info(`Parámetros ${n1} y ${n2} correctos para la suma`);
        res.send(`la suma es ${n1+n2}`);
    } else {
        logger.error(`Parámetros ${n1} y ${n2} inválidos para la suma`);
        res.send(`valores incorrectos o faltantes para la suma`)
    }
})

app.get('*', (req, res) => {
    logger.warn(`El usuario alcanzó una ruta no implementada`);
    res.send(`ruta no implementada`)
})

app.listen(8080, ()=> logger.info(`server online on mode ${process.env.NODE_ENV}`))

//we can check how running this without setting NODE_ENV or setting it to something that is not PROD creates the log files but only logs on console
// but if NODE_ENV is PROD then it wont log on console but will on the proper files with the proper levels (see sumarLogger.js)