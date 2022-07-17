//this is a blocking process: you can see how entering on the calcular endpoint delays the root too
const http = require('http');
const { fork } = require('child_process');

let visitas = 0;
const server = http.createServer()
server.on('request', (req, res) => {
    let { url } = req;
    if (url === '/calcular') {
        const computo = fork('computo.js');
        computo.send('start'); //this send the fork's child server to start processing
        computo.on('message', (msg) => { //this waits for the fork's child server response
            res.end(`La suma es ${sum}`);
        })
    } else if (url === '/') {
        res.end('Ok ' + (++visitas));
    }})
    
const PORT = 8080;
server.listen(PORT, err => {
    if (err) throw new Error(`Error en servidor: ${err}`);
    console.log(`Server running on port ${PORT}`);
});