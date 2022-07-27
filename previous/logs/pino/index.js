const logger = require('pino')();

//calling the object with a filename sets it to log in files, without parameters to log in console
//this could also be done as pino = require('pino'); pinoConsole = pino(); pinoFile = pino(file.log)
//CORRECTION: pino does not support various transport simultaneously

logger.info('log info');
logger.error('log error');

//it has variable input too

logger.info({data:33}, 'log info') //pass the data as another key in the 
logger.info('log info %d', 42) // similar to python format, it's input on the %d