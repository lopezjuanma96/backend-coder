import { knex } from '../daos/settings/mariaOptions.js'

export default class Contenedor {

    knex;
    tableReady;
    db;

    constructor(_dbName, _schemaFunction){
        this.knex = knex;
        this.db = db;
        this.knex.schema.hasTable(this.db)
        .then((res) => {
            this.tableReady = res;
            if (!res){
                this.knex.schema.createTable(this.db, _schemaFunction)
                .then(() => this.tableReady = true);
            }
        })
    }

    save(val){
        if (this.tableReady){
            const toAdd = {...val};
            return this.knex(this.db).insert([toAdd]);
        }
    }

    change(id, val){
        if (this.tableReady){
            return this.knex.from(this.db).where('id', id).update(val);
        }
    }

    getAll(){
        if (this.tableReady){
            return this.knex(this.db).select('*');
        }
    }

    getById(id){
        if (this.tableReady){
            return this.knex(this.db).select('*').where('id', id);
        }
    }

    deleteAll(){
        if (this.tableReady){
            return this.knex.schema.dropTable(this.db);
        }
    }

    deleteById(id){
        if (this.tableReady){
            return this.knex.from(this.db).where('id', id).del();
        }
    }

    close() {
        this.knex.destroy();
    }
}
