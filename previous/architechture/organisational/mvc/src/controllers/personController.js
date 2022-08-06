import { getAll, save } from '../models/personModels.js';

async function postPersonController(req, res, next){
    await save(req.body);
    res.redirect('/html-onwire');
}

async function getPersonController(req, res, next){
    const persons = await getAll();
    res.render('template-html-onwire', { persons })
}

export { postPersonController, getPersonController };