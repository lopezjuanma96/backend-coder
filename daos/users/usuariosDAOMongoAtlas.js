import Contenedor from "../../container/contenedorMongoAtlas.js";
import { usersModel } from "../settings/mongoAtlasOptions.js";

export default class UsuariosDAO extends Contenedor {

    constructor(){
        super(usersModel);
    }

    async save(val, id){
        const toSave = new this.model({id: id, ...val, timestamp:Date.now()});
        await toSave.save();
        console.log(`Created new value with ID: ${id}`);
    }
}
