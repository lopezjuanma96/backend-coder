import path from 'path';
import { getAll, save } from '../models/mealModels.js';

const __dirname = path.resolve();

async function postMealController(req, res, next){
    const meal = await save(req.body);
    res.send(meal);
}

async function getMealController(req, res, next) {
    res.sendFile(`${__dirname}/src/views/template-data-onwire.html`);
}

async function getMealJSONController(req, res, next) {
    const meals = await getAll();
    res.json({meals});
}

export { postMealController, getMealController, getMealJSONController };