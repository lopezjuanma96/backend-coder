const {options} = require('./options')
const knex = require('knex')(options)

const carsToAdd = [
    {name: 'volvo', price: 1500},
    {name: 'volkswagen', price: 2700},
    {name: 'masserati', price: 3700},
    {name: 'fiat', price: 10},
    {name: 'buggati', price: 4500},
];

(async() => {
    try{
        await knex('cars').insert(carsToAdd);
        let rows = await knex.from('cars').select('*');
        rows.forEach((row) => console.log(`${row['name']}, ${row['price']}`));
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        knex.destroy();
    }
})()