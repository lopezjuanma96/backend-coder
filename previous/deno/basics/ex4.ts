await Deno.writeTextFile('test.txt', 'hola deno'); //to allow permission use flag --allow-write on deno run (deno run --flag)

const text = await Deno.readTextFile('test.txt'); //to allow permission use flag --allow-read on deno run (deno run --flag)
console.log(text)