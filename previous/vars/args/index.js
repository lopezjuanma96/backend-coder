const parseArgs = require('minimist')
const yargsMod = require('yargs/yargs');
const yargs = yargsMod(process.argv.slice(2)); //or const yargs = require('yargs/yargs')(process.argv.slice(2))

//PROCESS:ARGV
for(let i=0; i<process.argv.length;i++){
    console.log(`${i} -> ${process.argv[i]}`); //process.argv is native to node, and the first two elements are the node.js path and the filepath
}

//MINIMIST
//It's not necesarily done to process arguments but rather analyze arrays, which process.argv is
console.log(parseArgs(process.argv));
console.log(parseArgs(process.argv.slice(2))); //to skip the first two

//the - sign is used for keys
console.log(parseArgs(['-p', '8', '-p', '2', '-a', '3', '40', '50', 'hola'])); //all elements not preceded by key are assigned to the default "_"
console.log(parseArgs(['-p', '8', '-p', '2', '-n2', '3', '40', '50', 'hola'])); //to use keys with more than one letter i have to use double - (same as cli kwargs), then this will only use n instead of n2
console.log(parseArgs(['-p', '8', '-p', '2', '--n2', '3', '40', '50', 'hola'])); 
console.log(parseArgs(['-p', '8', '-p', '2', '--n2'])); //by default keys take a boolean true (again, same as cli args)

//settings of minimist
const options = { default: {nombre:'juan', apellido: 'manuel'} }
console.log(parseArgs(['-p', '8'], options))
console.log(parseArgs(['-p', '8', '--nombre', 'pepe'], options))
const options2 = { default: {port: 8080} } //usecase
console.log(parseArgs(['-p', '8', '-n', 'pepe'], options2))
const options3 = { default: {port: 8080} , alias: { n: 'nombre' } } 
console.log(parseArgs(['-p', '8', '-n', 'pepe'], options3))

//YARGS
const yargs1 = yargs.default({nombre:'juan', apellido: 'manuel'}).alias({ n: 'nombre' });
const yargs1res = yargs1.argv
console.log(yargs1res) //dont have to pass a new array because it's been passed on the object creation method: yargs = yargsMod(process.argv.slice(2))

const yargs2 = yargs.boolean('debug'); //casting: this will try to force the value/s under 'debug' key to be booolean
const yargs2res = yargs2.argv
console.log(yargs2res)