//SERVICE LAYER: does the logic part connecting with the PERSISTENCY LAYER THROUGH THE IMPORTS

import { getAll, save } from '../repositories/datos.js'

async function getDatabase(){
    var values = await getAll();
    //HERE WOULD BE PROCESSING
    return values;
}

async function createData(info) {
    //HERE WOULD BE PROCESSING
    const data = {...info, added: Date.now()};
    const result = await save(data);
    console.log(result);
    return result;
}

export {getDatabase, createData}