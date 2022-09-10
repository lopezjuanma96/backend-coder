import { serve } from 'https://deno.land/std@0.100.0/http/mod.ts'; 
//CAREFUL: current version does not return an async iterable for serve, but works with promises and request handler: https://stackoverflow.com/questions/70963882/deno-serve-imported-from-std-http-server-ts-is-not-async-iterable

const server = serve({port: Number(Deno.env.get('PORT')) || 8080}); //--allow-net (and of course --allow-env) to bypass permission

for await(const req of server) {
    req.respond({body: "hola soy el servidor deno"})
}

