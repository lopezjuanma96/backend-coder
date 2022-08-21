import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt
} from 'graphql';

const PersonaType = new GraphQLObjectType({
    name: "Persona",
    description: "Persona Type",
    fields: () => ({
        id: { type: GraphQLID },
        nombre: { type: GraphQLString },
        apellido: { type: GraphQLString },
        dni: { type: GraphQLString },
        edad: { type: GraphQLInt }
    })
});

export { PersonaType };