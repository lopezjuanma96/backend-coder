import express from 'express';
import faker from 'faker';
import { writeFileSync } from 'fs';

const app = express();

//MANUAL MOCKING
const nom = ['Juan', 'Manuel', 'Pedro'];
const ape = ['López', 'Minervino', 'Ferro'];
const col = ['verde', 'rojo', 'azul'];

const getRandomElement = (array) => array[Math.floor(array.length*Math.random())]
const generateRandomSet = () => [getRandomElement(nom), getRandomElement(ape), getRandomElement(col)]

//FAKER MOCKING

faker.locale = 'es';
const { name, internet, random } = faker;
/*
var str = "NOMBRE;APELLIDO;EMAIL;TRABAJO;LUGAR\n"
for(let i=0; i<100;i++){
    str += `${name.firstName()};${name.lastName()};${internet.email()};${name.jobTitle()};${random.locale()}\n`
}

writeFileSync('./data.txt', str)
*/
app.get('/test', (req, res) => {
    for(var i = 0; i<10; i++){
        console.log(generateRandomSet());
    }

})

app.get('/testFaker', (req, res) => {
    const reqNumber = parseInt(req.query.num) || 10;
    const resp = []
    for(var i=0; i<reqNumber; i++){
        resp.push([name.firstName(), name.lastName(), internet.email(), name.jobTitle(), random.locale()])
    }
    res.send(resp)
})

app.listen(8080, () => console.log('conectado'))