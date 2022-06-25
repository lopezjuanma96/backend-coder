import Contenedor from "../../container/contenedorFirebase.js";

export default class ProductosDAO extends Contenedor {

    constructor(){
        super('carrito');
    }
}