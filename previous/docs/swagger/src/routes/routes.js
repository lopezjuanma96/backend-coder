const express = require('express');

const router = new express.Router();

router.get('/products/:id', (req, res) => {
    /* This will indicate swagger how this endpoint behaves, inputs and outputs
        #swagger.sumary = 'products getter'
        #swagger.description = 'gets some of all products from the database'
    */
    /*
        #swagger.parameters['id] = {
            in: 'path',
            description: 'product ID',
            type: 'integer'
        }
    */
    /*
        #swagger.parameters['only'] = {
            in: 'query',
            description: 'which fields of the product to keep',
            required: true,
            type: 'string'
        }
    */
    /*
        #swagger.responses[200] = {
            description: 'Products obtained successfully',
            schema: { $ref: '#/definitions/Products'}
        }
    */
    res.send('test');
})

router.post('/products', (req, res) => {
    /* This will indicate swagger how this endpoint behaves, inputs and outputs
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'product data to be saved',
            schema: { $ref: '#definitions/Product' }
        }
        #swagger.responses[200] = {
            description: 'Product added successfully',
            schema: { $ref: '#/definitions/Product'}
        }
        #swagger.responses[500] = {
            description: 'Internal server error',
        }
    */
    res.send('test');
})

module.exports = router;