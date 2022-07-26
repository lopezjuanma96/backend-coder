const log4js = require('log4js');

/* 
//ONE WAY FOR CONFIG
log4js.configure({
    appenders: {
        miLoggerConsole: {type: 'console'}, //the first name are chosen by me, appenders are the loggers themselves
        miLoggerFile: {type: 'file', filename: 'info.log'},
        miLoggerFile2: {type: 'file', filename: 'info2.log'}
    },
    categories: {
        default: {appenders:['miLoggerConsole'], level:['trace']},//levels: trace, debug, info, warn, error, fatal (from least to most critical), the level chosen is the least level to log and from there all the higher ones
        console: {appenders:['miLoggerConsole'], level:['debug']}, //so this will log debug, info, warn, error, fatal
        file: {appenders:['miLoggerFile'], level:['warn']}, //this will log warn, error, fatal
        file2: {appenders:['miLoggerFile2'], level:['info']},
    }
})
*/

/*
const loggerConsola = log4js.getLogger('consola');

loggerConsola.trace('Text trace');
loggerConsola.debug('Text debug');
loggerConsola.info('Text info');
loggerConsola.warn('Text error');
loggerConsola.fatal('Text fatal');
*/

/*
const loggerConsola = log4js.getLogger('default');

loggerConsola.trace('Text trace');
loggerConsola.debug('Text debug');
loggerConsola.info('Text info');
loggerConsola.warn('Text error');
loggerConsola.fatal('Text fatal');
*/

//OTHER WAY FOR CONFIG

log4js.configure({
    appenders: {
        console: { type: 'console' },
        archivo: { type: 'file', filename: 'info3.log' },
        loggerConsola: { type: 'logLevelFilter', appender: 'console', level: 'info' },
        loggerArchivo: { type: 'logLevelFilter', appender: 'archivo', level: 'error' },
    },
    categories: {
        default: { appenders: ['loggerConsola'], level: 'all' },
        custom: { appenders: ['loggerConsola', 'loggerArchivo'], level: 'all' }
    }
});

const loggerCustom = log4js.getLogger('custom');

loggerCustom.trace('Text trace');
loggerCustom.debug('Text debug');
loggerCustom.info('Text info');
loggerCustom.warn('Text warn');
loggerCustom.error('Text error');
loggerCustom.fatal('Text fatal');