// CLUSTERS

/*
Tener varios clusters o nodos permiten tener varios nucleos de procesamiento para aprovechar al maximo las capacidades del servidor.
Ademas si un nodo se cae el resto pueden intentar cubrir su funcionamiento sin que se caiga todo el server.
*/

/*
cluster.js -> modulo nativo para la gestion de clusters
el funcionamiento es similar al de proceso global y child, en el sentido que son como sockets que se comunican entre si con send() y on()
de alguna manera creo que los procesos global y child son equivalente a multithreading y los clusters son equivalentes a multiprocessing

//nodemon, usado para correr el codigo nuevamente cada vez que se actualiza algo, usa un proceso padre y a nuestro servidor como hijo para matarlo y renovarlo.
*/

/*
forever.js -> permite correr la aplicacion en segundo plano, para que no tenga que tener la consola abierta para mantener a mi servidor abierto
ademas, si se llegara a caer el servidor, intentaría levantarlo nuevamente.
al igual que nodemon, crea el proceso padre que esta mirando a nuestro servidor, pero en vez de esperar cambios de codigos, lo hace viendo cambios en las funcionalidades

ademas permite gestionar los clusters de nuestra apliacion facilmente.

lo ideal es instalarlo globalmente para manejarlo por cli

forever start file.js -> inicia el servidor del script en file.js
forever list -> lista los procesos con sus detalles //como no tenemos la consola activa, los console.log van a ir a los archivos .log que se ven en la columna logfile
forever stop id -> termina el proceso forever con id (lo podemos sacar de la columna pid de "forever list")
forever stopall -> termina todos los procesos de forever
forever -h -> levanta ayuda de los comandos

para usar clusters con foreves, simplemente hacemos "forever start" del mismo archivo cuantos clusters queramos
*/

/**

*/