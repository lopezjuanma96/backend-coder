//CHILD PROCESSES
//it's basically multithreading in Node

const { exec, execFile, spawn } = require('child_process');

//exec('command', callback) -> runs cmd scripts
exec('ls -lh', (error, stdout, stderr) => { //the difference between error and stderr is that the second is raised when the execution went well but the error was on this callback
    if(error){ console.log('exec error:', error.message) }
    if(stderr){ console.log('callback error:', stderr) }
    console.log('exec output:', stdout)
})

//execFile(path, callback) -> runs a script on a file, uses the system command so be carefull on the type of file, exe should be best option
execFile('command.bat', (error, stdout, stderr) => { 
    if(error){ console.log('exec error:', error.message) }
    if(stderr){ console.log('callback error:', stderr) }
    console.log('execFile output:', stdout)
})

//spawn('command', ['params']) -> manages long processes so that they can be done on chunks, for optimization

const spawnChild = spawn('find', ['.']) //since it does not receive a callback function, we have to assign it to a variable to get the stdout and so

spawnChild.stdout.on('data', data => console.log(`spawn data: ${data}`));
spawnChild.on('error', err => console.log(`spawn error: ${err}`));
spawnChild.on('close', code => console.log(`spawn exit code: ${code}`));
spawnChild.stderr.on('data', data => console.log(`spawn stderr: ${data}`));

//fork(file) -> mostly used, prevents blocking by running a section of JS code on a separate thread
//fork creates a child parallel server to carry the processes that should not block the parent. 
//this two servers comunicate similarly to how sockets did.
//see blocking.js, notblocking.js and computo.js to get the workings.