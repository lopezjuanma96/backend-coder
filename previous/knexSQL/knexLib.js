import knexLib from 'knex'
import { options } from './options.js'

class functionsSQL {
    constructor(config) {
        this.knex = knexLib(config);
    }
    createTable(name){
        return this.knex.schema.dropTableIfExists(name)
            .finally(() => {
                return this.knex.schema.createTable(name, (table) =>{
                    table.increments('id').primary();
                    table.string('name', 50).notNullable();
                    table.float('price');
                })
            })
    }
    insertRegistries(name, regs){
        return this.knex(name).insert(regs);
    }
    close(){
        this.knex.destroy();
    }
}

export default functionsSQL;


const sql = new functionsSQL(options)

sql.createTable('market')
.then(() => sql.insertRegistries('market', [{name: 'leche', price:50},{name: 'manzana', price:30},{name: 'agua', price:100}]))
.then(() => console.log("finalizado correctamente"))
.catch((e) => console.log(e))
.finally(() => sql.close())