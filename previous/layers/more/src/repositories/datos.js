//THIS WOULD BE THE DAOS FOR THE PERSISTENCY LAYER, THOUGH WE ARE NOW WORKING WITH LOCALLY SAVED DATA

const datos = [];

async function getAll() {
    return datos;
}

async function save(data) {
    datos.push(data);
    return datos;
}

export {getAll, save}