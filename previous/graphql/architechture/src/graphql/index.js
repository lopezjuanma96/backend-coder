import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { PersonasController } from "./controller/persona.controller.js";

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: {
        ...PersonasController.queries,
    },
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: {
        ...PersonasController.mutations,
    },
});

const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
});

export { schema };