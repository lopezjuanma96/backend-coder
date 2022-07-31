//ROUTING LAYER: this could go all in the routes.js, but its common to have a controller file with the functions that are implemented
// on each route on routes.js. COMMUNICATES WITH THE SERVICE LAYER THROUGH THE IMPORTS

import { getDatabase, createData } from '../services/datos.js'

async function getDatabaseController(req, res){
    //HERE GETTING SOMETHING FROM REQ
    const data = await getDatabase();
    res.status(200).json(data);
}

async function createDataController(req, res){
    const data = req.body;
    const result = createData(data);
    res.status(201).json(result); //201 is common success status for creating new object/entity
}

export {getDatabaseController, createDataController}