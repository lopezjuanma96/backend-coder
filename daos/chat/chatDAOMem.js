import Contenedor from "../../container/contenedorMem.js";

export default class ChatDAO extends Contenedor {

    constructor(){
        super('productos', (table) => {
            table.increments('id').primary();
            table.string('socket', 100).notNullable();
            table.string('user', 50).notNullable();
            table.string('msg', 255);
            table.string('date', 100);
        });
    }
}