import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import { schema } from './src/models/Persona.js';

const app = express();

app.use('/graphql',
        graphqlHTTP({
            schema: schema,
            graphiql: true
        })
)

app.listen(8080, (err) => 'open on http://localhost:8080')