import knex from 'knex';
const { knex: knexLib} = knex;
import options from '../settings/sqLiteOptions.js';

export default class Contenedor {

    knex;
    tableReady;

    constructor(){
        this.knex = knexLib(options);
        this.knex.schema.hasTable("messages")
        .then((res) => {
            this.tableReady = res;
            if (!res){
                this.knex.schema.createTable("messages", (table) => {
                    table.increments('id').primary();
                    table.string('socket', 100).notNullable();
                    table.string('user', 50).notNullable();
                    table.string('msg', 255);
                    table.string('date', 100);
                })
                .then(() => this.tableReady = true);
            }
        })
    }
    
    save(val){
        if (this.tableReady){
            const toAdd = {...val};
            return this.knex('messages').insert([toAdd]);
        }
    }

    change(id, val){
        if (this.tableReady){
            return this.knex.from('messages').where('id', id).update(val);
        }
    }

    getAll(){
        if (this.tableReady){
            return this.knex('messages').select('*');
        }
    }

    getById(id){
        if (this.tableReady){
            return this.knex('messages').select('*').where('id', id);
        }
    }

    deleteAll(){
        if (this.tableReady){
            return this.knex.schema.dropTable('messages');
        }
    }

    deleteById(id){
        if (this.tableReady){
            return this.knex.from('messages').where('id', id).del();
        }
    }

    close() {
        this.knex.destroy();
    }
}