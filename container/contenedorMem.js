export default class Contenedor {

    data;

    constructor(_dbName, _schemaFunction){
        this.data = [];
    }

    _getNewId(){
        let newId = 1;
        this.data.forEach((e) => {
            if (e.id > newId) { newId = e.id}
        })
        return newId
    }

    save(val){
        this.data.push({id: this._getNewId(), ...val})
    }

    change(id, val){
        let toChangePos;
        this.data.find((e, i) => {
            toChangePos = i;
            return e.id === id
        })
        this.data[toChangePos] = val;
    }

    getAll(){
        return this.data;
    }

    getById(id){
        return this.data.find(e => e.id === id)
    }

    deleteAll(){
        this.data.length = 0;
    }

    deleteById(id){
        const temp = this.data;
        this.deleteAll()
        temp.forEach((e) => {
            if(e.id !== id){
                this.data.push(e);
            }
        })
    }
}
