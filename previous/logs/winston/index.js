const winston = require('winston');

//Levels: silly, debug, verbose, info, warn, error
const logger = winston.createLogger({
    level: 'warn',
    transports: [
        new winston.transports.Console({ level: 'verbose' }),
        new winston.transports.File({ filename: 'info.log', level: 'error' })
    ]
})

logger.log('silly', 'log silly');
logger.log('debug', 'log debug');
logger.log('verbose', 'log verbose');
logger.log('info', 'log info');
logger.log('warn', 'log warn');
logger.log('error', 'log error');

logger.debug('log debug');
logger.error('log error');