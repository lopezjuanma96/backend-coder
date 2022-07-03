import Contenedor from "../../container/contenedorMem.js";

export default class CarritoDAO extends Contenedor {

    constructor(){
        super('productos', (table) => {
            table.json('products');
            table.increments('id').primary();
            table.timestamp('timestamp').defaultTo(knex.fn.now());
        });
    }
}