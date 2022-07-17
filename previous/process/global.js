//GLOBAL PROCESS
//is accessible in any script of the server that's been mounted

console.log(`Dir: ${process.cwd()}`);
console.log(`ProcessID: ${process.pid}`);
console.log(`Node Version: ${process.version}`);
console.log(`Process title: ${process.title}`);
console.log(`OS: ${process.platform}`);
console.log(`Memory usage: ${process.memoryUsage().heapTotal}`);
console.log(`Memory usage: ${process.memoryUsage().heapUsed}`);

console.log('Node Dir:', process.execPath);

//listeners on server
//process.on('event', callback)

process.on('exit', (code) => {
    console.log('exit with code', code)
})
process.on('beforeExit', (code) => {
    console.log('wake me up before you gogo')
})
process.on('uncaughtException', (err) => {
    console.log('you did not catch this error', err)
})

//stdout (C implementation, gets called when using console.log)
//it has the advantages of flushing and new line not forced
process.stdout.write('hola por stdout\n'); //have to add the \n because it does not add a new line by default
console.log('hola por console');
process.stderr.write('hola por stderr\n')

//end application
process.exit(0); //the parameter is the exit code, normally 0 is for non problem exit and each other value has a specific meaning