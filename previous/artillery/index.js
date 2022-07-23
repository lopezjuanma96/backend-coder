const express = require("express");
const cluster = require('cluster');
const {cpus} = require('os');
const { isPrimitive } = require("util");

const PORT = 8080
const MODE = process.argv[2]
const isCluster = MODE === "CLUSTER"

if (isCluster && cluster.isPrimary){
    const numCPUs = cpus().length;
    for (var i = 0; i< numCPUs; i++){
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        cluster.fork();
    })
} else {
    const app = express()
    app.get('/', (req, res) => {
        const primes = [];
        const max = req.query.max || 1000;
        for (var i = 0; i<max; i++){
            if (isPrime(i)) primes.push(i);
        }
        res.json(primes);
    })
    app.listen(PORT, (err) => {if(!err) console.log('server running')})
}

function isPrime(num){
    if ( [0,1,2,3].includes(num) ) return true;
    else if ( [2,3].some(n => num%n == 0) ) return false;
    else {
        let i=5; w=2;
        while (i**2 <=num) {
            if (num%i == 0) return false;
            i+=w;
            w = 6-w;
        }
    }
    return true;
}