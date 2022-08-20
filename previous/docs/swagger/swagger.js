const swgAuto = require('swagger-autogen')({ openapi: '3.0.0' }); //openapi is the paradigm for documenting

const output = './docs/swagger-example.json';
const endpoints = ['./src/routes/routes.js']; //we can add more than one endpoint source

const data = {
    info: {
        title: 'API Coderhouse',
    },
    servers: [
        { url: 'http://development.com/api', description: 'dev server'},
        { url: 'http://production.com/api', description: 'prod server'},
        { url: 'http://localhost:3000.com/api', description: 'local server'},
    ],
    components: {
        schemas: { //structure for each method (general) or endpoint (specific), they are filled with example data
            Product: {
                name: 'test',
                price: 2525,
                description: 'product test'
            },
            Products: [
                {
                    id: 1,
                    name: 'test1',
                    price: 2525,
                    description: 'product test1'
                },
                {
                    id: 2,
                    name: 'test2',
                    price: 2555,
                    description: 'product test2'
                }
            ]
        }
    }
}

swgAuto(output, endpoints, data);

