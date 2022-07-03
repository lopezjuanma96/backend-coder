import Contenedor from "../../container/contenedorArchivo.js";

export default class CarritoDAO extends Contenedor {

    constructor(){
        super('./carritoCont.json');
    }
}