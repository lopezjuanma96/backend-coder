import Contenedor from "../../container/contenedorMongoAtlas.js";
import { cartModel } from "../settings/mongoAtlasOptions.js";

export default class CarritoDAO extends Contenedor {

    constructor(){
        super(cartModel);
    }
}
