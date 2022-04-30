const knex = require("knex")({
    client:'mysql', //might need to use mysql2 instead of mysql because https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
    connection: {
        host: '127.0.0.1',
        port: '4306',
        user: 'root',
        password: '', //should not be added in plain code, 
        database: 'coderhouseexample'
    }
}); //this config can be imported to another file of settings/options

/*
knex.schema.createTable('cars', (table) => {
    table.increments('id');
    table.string('name');
    table.integer('price');
}).then(()=>console.log("Tabla Creada!"))
.catch((err)=> console.log(err))
.finally(()=> knex.destroy()) //this is necessary to end the connection to the DB
*/

/*
const carsToAdd = [
    {name: 'volvo', price: 1500},
    {name: 'volkswagen', price: 2700},
]
knex('cars').insert(carsToAdd)
.then(()=> console.log("datos agregados"))
.catch((err)=> console.log(err))
.finally(()=> knex.destroy()) //this is necessary to end the connection to the DB
*/

/*
knex.from('cars').select('*')
.then((rows) => rows.forEach((row) => console.log(`elemento ${row['id']} con nombre ${row['name']} y precio ${row['price']}`)))
.catch((err)=> console.log(err))
.finally(()=> knex.destroy()) //this is necessary to end the connection to the DB

knex('cars').where({id:3}).update({name: 'buggati', price:10000}) //this does not seem to raise error if it doesn't find the required registry
.then(()=> console.log("precio actualizado"))
.catch((err)=> console.log(err))
.finally(()=> knex.destroy()) //this is necessary to end the connection to the DB

knex('cars').where({id:3}).del() //this does not seem to raise error if it doesn't find the required registry
.then(()=> console.log("registro eliminado"))
.catch((err)=> console.log(err))
.finally(()=> knex.destroy()) //this is necessary to end the connection to the DB
*/

/*
knex.from('cars').select('name').where('price', '>', 2000)
.then((rows) => rows.forEach((row) => console.log(`${row['name']}`)))
.catch((err)=> console.log(err))
.finally(()=> knex.destroy())

knex.from('cars').select('name', 'price').where('id', '<', 5)
.then((rows) => rows.forEach((row) => console.log(`${row['name']}, ${row['price']}`)))
.catch((err)=> console.log(err))
.finally(()=> knex.destroy())
*/

