import Contenedor from "../../container/contenedorMongoAtlas.js";
import { chatModel } from "../settings/mongoAtlasOptions.js";

export default class ChatDAO extends Contenedor {

    constructor(){
        super(chatModel);
    }
}
