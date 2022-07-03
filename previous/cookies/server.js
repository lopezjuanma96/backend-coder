import cookieParser from "cookie-parser";
import express from 'express';

const app = express();

app.use(cookieParser('password1'));

app.get('/cookies', (req, res) => {
    if(req.query.cName){
        res.send(req.cookies[cName])
    }
    res.send(req.cookies);
})

app.get('/signedCookies/:cName', (req, res) => {
    if(req.cName){
        res.send(req.signedCookies[cName])
    }
    res.send(req.signedCookies);
})

app.get('/allCookies', (req, res) => {
    res.send(JSON.stringify({basicas: req.cookies, signed: req.signedCookies}));
})

app.post('/basicCookie', (req, res) => {
    res.cookie('server', 'value').send('Cookie básica creada')
})

app.post('/tempCookie', (req, res) => {
    const time = req.query.time || 5000;
    res.cookie('server', 'value', {maxAge: time}).send(`Cookie temporal creada por ${time} ms`)
})

app.post('/signedCookie', (req, res) => {
    res.cookie('server', 'value', {signed:true}).send('Cookie signed creada')
})

app.listen(8080, () => console.log('conectado'))