import { normalize, denormalize, schema } from 'normalizr'
import util from 'util'

const originalData = {
    id: "messages",
    messages: [
        {
            id: "1",
            user: {
                id: "juan@mail.com",
                name: "Juan",
                surname: "Lopez",
                age: "29",
                alias: "zagador",
                avatar: "zagador.png"
            },
            text: "hola amigos",
            date: "51952323"
        },
        {
            id: "2",
            user: {
                id: "profe@mail.com",
                name: "Nico",
                surname: "Geres",
                age: "32",
                alias: "profe",
                avatar: "profe.png"
            },
            text: "no se si amigos che",
            date: "515613218"
        },
        {
            id: "3",
            user: {
                id: "juan@mail.com",
                name: "Juan",
                surname: "Lopez",
                age: "29",
                alias: "zagador",
                avatar: "zagador.png"
            },
            text: "uh tiene razon",
            date: "515168843"
        },
        {
            id: "4",
            user: {
                id: "profe@mail.com",
                name: "Nico",
                surname: "Geres",
                age: "32",
                alias: "profe",
                avatar: "profe.png"
            },
            text: "no hay problema!",
            date: "5484932316"
        },
        {
            id: "5",
            user: {
                id: "juan@mail.com",
                name: "Juan",
                surname: "Lopez",
                age: "29",
                alias: "zagador",
                avatar: "zagador.png"
            },
            text: "prometo que no vuelve a pasar",
            date: "5435384152"
        },
        {
            id: "6",
            user: {
                id: "tomas@mail.com",
                name: "Tomi",
                surname: "Perez",
                age: "28",
                alias: "tompro",
                avatar: "tompro.png"
            },
            text: "jajaja me muero",
            date: "655654321"
        }
    ]
}

const user = new schema.Entity('users');
const message = new schema.Entity('messages', {
    user: user
});

const log = new schema.Entity('logs', {
    messages: [message]
});

const normData = normalize(originalData, log)
const denormData = denormalize(normData.result, log, normData.entities)

console.log('Original:')
console.log(util.inspect(originalData, false, 12))
console.log(JSON.stringify(originalData).length)
console.log('\n\nNorm:')
console.log(util.inspect(normData, false, 12))
console.log(JSON.stringify(normData).length)

console.log(`Compression rate: ${(100*JSON.stringify(normData).length/JSON.stringify(originalData).length).toFixed(2)}%`)

console.log('\n\ndeNorm:')
console.log(util.inspect(denormData, false, 12))