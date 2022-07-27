const log4js = require('log4js');

log4js.configure({
    appenders: {
        console: {type: 'console'},
        errorFile: {type: 'file', filename:'error.log'},
        debugFile: {type: 'file', filename:'debug.log'},
        ConsoleLogger: {type: 'logLevelFilter', appender:'console', level:'info'},
        ErrorFileLogger: {type: 'logLevelFilter', appender:'errorFile', level:'error'},
        DebugFileLogger: {type: 'logLevelFilter', appender:'debugFile', level:'debug'},
    },
    categories:{
        default:{
            appenders:['ConsoleLogger'], level:'all'
        },
        prod:{
            appenders:['ErrorFileLogger', 'DebugFileLogger'], level:'all'
        }
    }
})

let logger = process.env.NODE_ENV === "PROD" ? log4js.getLogger('prod') : log4js.getLogger('default');

logger.info(`logger set on mode ${process.env.NODE_ENV}`)
module.exports = logger