import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { schema } from './models/Persona.js';

import { getPersona, getPersonas, createPersona } from './utils/functions.js';

const app = express();

app.use('/graphql',
        graphqlHTTP({
            schema: schema,
            rootValue: {
                getPersona,
                getPersonas,
                createPersona
            },
            graphiql: true
        })
)

app.listen(8080, (err) => 'open on http://localhost:8080')