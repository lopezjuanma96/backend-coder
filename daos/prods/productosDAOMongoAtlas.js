import Contenedor from "../../container/contenedorMongoAtlas.js";
import { productsModel } from "../settings/mongoAtlasOptions.js";

export default class ProductosDAO extends Contenedor {

    constructor(){
        super(productsModel);
    }
}
