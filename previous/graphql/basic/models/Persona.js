import { buildSchema } from 'graphql'

class Persona {
    constructor( id, {name, age}){
        this.id = id;
        this.name = name;
        this.age = age;
    }
}

const schema = buildSchema(`
    type Persona {
        id: ID!
        name: String
        age: Int
    }
    input PersonaInput {
        name: String,
        age: Int
    }
    type Query {
        getPersona(id: ID!): Persona
        getPersonas(field: String, value: String): [Persona]
    }
    type Mutation {
        createPersona(data: PersonaInput): Persona
    }
`)

export { Persona, schema }