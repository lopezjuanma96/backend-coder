import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import PersonasDaoMem from '../../dao/PersonasDaoMem.js';
import { PersonaType } from '../types/Personas.js';

const personasDaoMem = new PersonasDaoMem();

const getPersonas = {
    type: new GraphQLList(PersonaType),
    description: 'obtener personas',
    resolve: async() => {
        const personas = personasDaoMem.getAll();
        return personas;
    }
};

const PersonaById = {
    type: PersonaType,
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, { id }) => {
        const person = personasDaoMem.getById(id)
        console.log(person);
        return person
    }
};

const putPersona = {
    type: PersonaType,
    args: {
        id: { type: GraphQLID },
        nombre: { type: GraphQLString },
        apellido: { type: GraphQLString },
        dni: { type: GraphQLString },
        edad: { type: GraphQLInt }
    },
    resolve: async (_, { id, nombre, apellido, dni, edad }) => {
        const result = personasDaoMem.updateById(
            id,
            {
                nombre,
                apellido,
                dni,
                edad
            }
        )
        return result
    }
}

const delPersona = {
    type: PersonaType,
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, { id }) => {
        const deleted = personasDaoMem.deleteById(id)
        return deleted;
    }
}

const postPersona = {
    type: PersonaType,
    args: {
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        apellido: { type: new GraphQLNonNull(GraphQLString) },
        dni: { type: new GraphQLNonNull(GraphQLString) },
        edad: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async(_, { nombre, apellido, dni, edad }) => {
        const added = personasDaoMem.save({
            nombre,
            apellido,
            dni,
            edad
        });
        return added;
    }
}

const PersonasController = {
    mutations: {
        postPersona,
        putPersona,
        delPersona
    },
    queries: {
        getPersonas,
        PersonaById
    }
}

export { PersonasController }