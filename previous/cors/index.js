const express = require('express');
const cors = require('cors');

const app = express();

//cors is used as middleware, in this case globally but it can be done to each action/verb/endpoint separately
app.use(cors()) //no restrictions for cross-origin
app.use(cors( //some options, others can be explored at: https://www.npmjs.com/package/cors
    {
        origin: 'https://www.example.com', //allowed origin
        optionsSuccessStatus: 200,
        methods: 'GET' //allowed methods
    }
))

app.get('/', (req, res) => {
    res.send('hola mundo!')
})

//cors as specific middleware
const mwCors = cors()
app.get('/ex', mwCors, (req, res) => {
    res.send('hola mundo!')
})

app.listen(8080, () => console.log('conected'))