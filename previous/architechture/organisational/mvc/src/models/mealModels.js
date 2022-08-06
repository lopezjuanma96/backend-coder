const data = []
async function save(obj){
    data.push(obj);
    return obj;
}

async function getAll(){
    return data;
}

export { save, getAll }