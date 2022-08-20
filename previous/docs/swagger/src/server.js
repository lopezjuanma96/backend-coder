const express = require('express');
const swgUi = require('swagger-ui-express');
const swgFile = require('../docs/swagger-example.json');
const routes = require('./routes/routes.js');

const app = express();

app.use(express.json());
app.use('/api', routes);
app.use('/doc', 
        swgUi.serve, 
        swgUi.setup(swgFile)
        )

app.listen(880, () => console.log(`Server listening on http://localhost:880`));