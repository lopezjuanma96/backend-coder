import config from './config.js';
import express from 'express';
import cors from 'cors';

import RouterNews from './routes/news.js'

const app = express()

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(cors());

const routeNews = new RouterNews();
app.use('/api/news', routeNews.start())

const PORT =  config.PORT || 8080;

const server = app.listen(PORT, () => console.log(`
    Server connected to http://localhost:${PORT}\n
    (${config.NODE_ENV || ""} - ${config.PERSIST || ""})`));

server.on('error', err => console.log(`Server found error: ${err}`));