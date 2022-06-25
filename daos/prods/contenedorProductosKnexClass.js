import knex from 'knex';
const { knex: knexLib} = knex;
import options from '../settings/mariaOptions.js';

export default class Contenedor {

    knex;
    tableReady;

    constructor(){
        this.knex = knexLib(options);
        this.knex.schema.hasTable("products")
        .then((res) => {
            this.tableReady = res;
            if (!res){
                this.knex.schema.createTable("products", (table) => {
                    table.increments('id').primary();
                    table.string('title', 50).notNullable();
                    table.float('price');
                    table.string('thumbnail', 255);
                    table.float('timestamp');
                })
                .then(() => this.tableReady = true);
            }
        })
    }
    
    save(val){
        if (this.tableReady){
            const toAdd = {...val, timestamp:Date.now()};
            return this.knex('products').insert([toAdd]);
        }
    }

    change(id, val){
        if (this.tableReady){
            return this.knex.from('products').where('id', id).update(val);
        }
    }

    getAll(){
        if (this.tableReady){
            return this.knex('products').select('*');
        }
    }

    getById(id){
        if (this.tableReady){
            return this.knex('products').select('*').where('id', id);
        }
    }

    deleteAll(){
        if (this.tableReady){
            return this.knex.schema.dropTable('products');
        }
    }

    deleteById(id){
        if (this.tableReady){
            return this.knex.from('products').where('id', id).del();
        }
    }

    close() {
        this.knex.destroy();
    }
}