import express from 'express';
import { routerDatos } from './routes.js'

const PORT = 8080;

const app = express();
app.use(express.json());

app.use('/api/datos', routerDatos);
app.get('/', (req, res) => res.status(200).send('bienvenido'))

app.listen(PORT, () => console.log(`app activa en http://localhost:${PORT}`))

process.on('uncaughtException', (err) => console.log(err));