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
        const toSave = new this.model({id: id, ...val, timestamp:Date.now()});
        await toSave.save();
        console.log(`Created new value with ID: ${id}`);
    }

    async change(id, val){
        const itemUpdated = await this.model.updateOne({id: id}, {$set: {...val}});
        console.log(`Updated element with ID: ${id} \n`, itemUpdated);
    }

    async getAll(){
        const data = await this.model.find().lean().exec(); //using lean to get a json object instead of a mongoose one: https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
        return data
    }

    async getById(id){
        const data = await this.model.findOne({id: id}).lean().exec();//using lean to get a json object instead of a mongoose one: https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
        return data
    }

    async deleteAll(){
        this.query.delete().exec(); //REVISAR
    }

    async deleteById(id){
        const itemDeleted = await this.model.deleteOne({id: id}).exec();
        console.log(`Deleted element with ID: ${id} \n`, itemDeleted);
    }
}