const cluster = require('cluster'); //native Node package
const http = require('http')
const numCPUs = require('os').cpus().length;

//similarly to parent and child processes, there will be master and slave clusters
//so basically clustering in multiprocessing while child process is multithreading

if (cluster.isMaster){
    console.log(`Server has ${numCPUs} cores`);
    console.log(`PID MASTER IS ${process.pid}`);

    for(let i=0; i<numCPUs; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`); //with task manager or cmd we can end each process
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Hola mundo!');
    }).listen(8080)
    console.log(`Worker ${process.pid} started`);
}