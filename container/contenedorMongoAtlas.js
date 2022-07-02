import mongoose from 'mongoose'
import { URL } from '../daos/settings/mongoAtlasOptions.js'

export default class Contenedor {
    
    model;

    constructor(_model) {
        this.model = _model;
        mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Conectado!");
        }).catch((err) => console.log(err))
    }

    async _getNewId(){
        const lastId = await this.model.find({}).sort({ id: -1 }).limit(1);
        try{
            return parseInt(lastId[0].id) + 1 || 1;
        } catch (e) {
            console.log('Unexistent or empty collection, starting at id: 1')
            return 1;
        }
    }
    
    async save(val){
        const id = await this._getNewId();
        const toSave = new this.model({id: id, ...val});
        await toSave.save();
        console.log(`Created new value with ID: ${id}`);
    }

    async change(id, val){
        const itemUpdated = await this.model.updateOne({id: id}, {$set: {...val}});
        console.log(`Updated element with ID: ${id} \n`, itemUpdated);
    }

    async getAll(){
        return await this.model.find()
    }

    async getById(id){
        return await this.model.find({id: id})
    }

    async deleteAll(){
        this.query.delete(); //REVISAR
    }

    async deleteById(id){
        const itemDeleted = await this.model.deleteOne({id: id})
        console.log(`Deleted element with ID: ${id} \n`, itemDeleted);
    }
}