import express from 'express';
//import handlebars from "express-handlebars"; //airbnb codestyle uses ' instead of " 
import handlebars from 'express-handlebars';
import route from './routes/personRoutes.js'

const { engine } = handlebars;

const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
    }),
    );
    
app.set('view engine', 'hbs');
app.set('views', './src/views');
    
app.use('', route);

const PORT = 8080

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`))
