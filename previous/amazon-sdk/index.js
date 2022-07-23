//THIS FILE TOGHETER WITH THE package.json SHOULD BE UPLOADED TO AWS ELASTIC BEANSTALK AS A COMPRESSED ZIP

const express = require('express');
const AWS = require('aws-sdk');

const app = express()
app.use(express.json())

AWS.config.update({
    region: 'us-east-1'
})

const SNS = new AWS.SNS();
const SNStopic = 'asdasfasfasfas'

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'ancakvnkdv'

app.get('/', (req, res) => {
    res.send('test api')
})

app.get('/prods', async(req, res) => {
    const params =  {
        TableName : TABLE_NAME
    }

    try{
        const productos = await scanDynamoRecords(params)
        res.json(productos)
    } catch (e) {
        res.send('erro')
    }
})

app.post('/prods', async(req, res) => {
    const params =  {
        TableName : TABLE_NAME,
        TableProduct : req.query.id
    }

    dynamodb.put(params, req.body).promise() // to do async mode
    .then()
})

const scanDynamoRecords = async(params) => {
    
}