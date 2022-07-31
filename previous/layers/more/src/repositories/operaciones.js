//THIS WOULD BE THE DAOS FOR THE PERSISTENCY LAYER, THOUGH WE ARE NOW WORKING WITH LOCALLY SAVED DATA

const ops = [];

async function getAll() {
    return ops;
}

async function save(data) {
    ops.push(data);
    return ops;
}

export {getAll, save}