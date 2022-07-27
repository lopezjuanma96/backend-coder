//compare running this with node and nodemon, reviewing the task manager to see how process change.
//if i kill the parent task (nodemon's) the whole process ends, if i kill the child task (our server's)
// nodemon keeps running but logs: [nodemon] app crashed - waiting for file changes before starting...

const express = require('express');
const app = express();
const PORT = parseInt(process.argv[2]) || 8080;
    
app.get('/datos', (req, res) => {
    res.send(`Servidor en puerto ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`);
})

app.listen(PORT, err => {
    if(!err) console.log(`Servidor escuchando en puerto ${PORT} - PID ${process.pid}`);
})