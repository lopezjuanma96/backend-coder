const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const mongoStore = require('connect-mongo');

const app = express();
app.use(cookieParser());

app.use(session({
    //store: mongoStore.create( { mongoUrl: 'mongodb://localhost:27017'}), //for local mongodb
    store: mongoStore.create( { mongoUrl: 'mongodb+srv://zagador123:446032@cluster0.snysn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
                                useNewUrlParser: true,
                                useUnifiedTopology: true
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}));

const getSessionName = req => req.session.nombre ?? '';

app.get('/', (req, res) => {
    if (!req.session.contador) {
        req.session.nombre = req.query.nombre;
        req.session.contador = 1;
        res.send(`Te damos la bienvenida ${getSessionName(req)}`);
    } else {
        req.session.contador++;
        res.send(`${getSessionName(req)} visitaste la página ${req.session.contador} veces.`);
    }
});

app.get('/olvidar', (req, res) => {
    const mensaje = `Hasta luego ${getSessionName(req)}`;

    req.session.destroy(err => {
        if (err) {
            res.json({error: 'olvidar', body: err});
        } else {
            res.send(mensaje);
        }
    })
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
});

app.on('error', error => console.log(`Error en servidor ${error}`));