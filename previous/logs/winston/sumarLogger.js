const winston = require('winston');

function buildProdLogger() { //winston does not allow for creation of debug and productions set of loggers, so we have to do it manually
    const prodLogger = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: 'debug.log', level: 'debug' }),
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
        ]
    });
    return prodLogger;
};

function buildDevLogger() {
    const prodLogger = winston.createLogger({
        transports: [
            new winston.transports.Console({ level: 'info' }),
        ]
    });
    return prodLogger;
};


const logger = (process.env.NODE_ENV === 'PROD') ? buildProdLogger() : buildDevLogger();

module.exports = logger;