import { red, green, bgWhite, bgYellow, bold } from 'https://deno.land/std@0.155.0/fmt/colors.ts';

console.log('hello world');

console.log(red('hello red world'));
console.log(bgWhite(red('hello river plate')));

console.log(green(bgYellow(bold('super hello world'))))

const port = Number(Deno.env.get('PORT')) || 8080;
console.log(port)

/* 
this will ask for permitions to get enviroment variables (this is much safer), to allow them automatically there's flags like --allow-env

deno run ex3.ts -> logs 8080
PORT=8090 deno run ex3.ts -> logs 8090 (windows need set env variables: set PORT=8090 deno run ex3.ts) but asks for permissions
PORT=8090 deno run --allow-env ex3.ts -> logs 8090 but doesnt ask for permissions
*/