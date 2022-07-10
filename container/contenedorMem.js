export default class Contenedor {

    data;

    constructor(_dbName, _schemaFunction){
        this.data = [];
    }

    async _getNewId(){
        let newId = 1;
        this.data.forEach((e) => {
            if (e.id > newId) { newId = e.id}
        })
        return newId
    }

    async save(val){
        const newId = await this._getNewId();
        this.data.push({id: newId, ...val})
    }

    async change(id, val){
        let toChangePos;
        this.data.find((e, i) => {
            toChangePos = i;
            return e.id === id
        })
        this.data[toChangePos] = val;
    }

    async getAll(){
        return this.data;
    }

    async getById(id){
        return this.data.find(e => e.id === id)
    }

    async deleteAll(){
        this.data.length = 0;
    }

    async deleteById(id){
        const temp = this.data;
        this.deleteAll()
        temp.forEach((e) => {
            if(e.id !== id){
                this.data.push(e);
            }
        })
    }
}
