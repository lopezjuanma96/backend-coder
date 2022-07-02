import Contenedor from "../../container/contenedorMongoAtlas.js";
import { productsModel } from "../settings/mongoAtlasOptions.js";

export default class ProductosDAO extends Contenedor {

    constructor(){
        super(productsModel);
    }
}

const dao = new ProductosDAO()
dao.save({"title":"lechuga","price":200,"thumbnail":"lechuga.png","timestamp":1651417769460},{"title":"tomate","price":200,"thumbnail":"tomate.png","id":9,"timestamp":1651417938187})
