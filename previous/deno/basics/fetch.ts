const response = await fetch('https://jsonplaceholder.typicode.com/todos/1'); //bypass with --allow-net flag
const data = await response.json();

console.log(data);