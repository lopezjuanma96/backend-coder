import Contenedor from "../../container/contenedorMem.js";

export default class ProductosDAO extends Contenedor {

    constructor(){
        super('productos', (table) => {
            table.increments('id').primary();
            table.string('title', 50).notNullable();
            table.float('price');
            table.string('thumbnail', 255);
            table.float('timestamp');
        });
    }
}