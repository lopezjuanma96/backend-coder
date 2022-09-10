import { Application, Context } from "./deps.ts";

const app = new Application(); //express()

app.use((ctx: Context) => {
    ctx.response.body = 'Hello world'
});

await app.listen({ port: 8080 });

