const express = require('express');
const session = require('express-session');

const cookieParser = require('cookie-parser');

//const FileStore = require('session-file-store')(session); //ONE WAY

const filestore = require('session-file-store'); //ANOTHER WAY, MORE SIMILAR TO WHAT WOULD BE DONE WITH import
const FileStore = filestore(session);

const app = express();
app.use(cookieParser('password1'));
app.use(session({ 
    store: new FileStore( {path: './sessions', ttl: 300, retries: 0}),
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

app.get('/with-session', (req, res) => {
    if (!req.session.contador) {
        req.session.contador = 1;
        res.send('Bienvenido');
    } else {
        req.session.contador++;
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces.`);
    }
});

app.get('/login', (req, res) => {
    const { username, password } = req.query;
    if (username !== 'alex' || password !== '123') {
        return res.send('login failed');
    }

    req.session.user = username;
    req.session.admin = true;
    res.send('login success');
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({ status: 'Logout error', body: err });
        } else {
            res.json('Logout ok');
        }
    });
});

app.get('/private', auth, (req, res) => {
    res.send('Si estas viendo esto es porque eres admin');
})

function auth(req, res, next) {
    if (req.session?.user === 'alex' && req.session?.admin) {
        return next();
    }
    return res.status(401).send('Error de autorización');
}

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
});
