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

forever start <file.js> -> inicia el servidor del script en file.js
forever list -> lista los procesos con sus detalles //como no tenemos la consola activa, los console.log van a ir a los archivos .log que se ven en la columna logfile
forever stop <id> -> termina el proceso forever con id (lo podemos sacar de la columna pid de "forever list")
forever stopall -> termina todos los procesos de forever
forever -h -> levanta ayuda de los comandos

para usar clusters con foreves, simplemente hacemos "forever start" del mismo archivo cuantos clusters queramos
*/

/*
PM2.js -> similar a los anteriores pero con aun mas funcionalidades, más simpleza y mayor optimizacion
detecta automaticamente la cantidad de nucleos para levantar los servidores

lo instalamos de manera global y trabajamos con cli:

pm2 start file.js -> inicia el servidor del archivo file en segundo plano, por default en modo fork (1 solo cluster)
                  -> parametros: --name <valor> identificador de los valores en la tabla
                                 --watch 
                                 -i <número o max> inicializa en modo cluster con tantos clusters como se pasen en -i o el maximo si se pasa max

pm2 list -> lista los procesos con sus detalles en tabla
pm2 stop <algún metodo de identificacion> -> para el proceso identificado
pm2 stopall -> detiene todos los procesos.
pm2 delete -> cuando hacemos stop a un proceso queda parado pero se puede reiniciar con el mismo id, con delete lo borramos completamente
pm2 deleteall -> borra todos los procesos
pm2 describe <algún metodo de identificacion> -> detalles de un proceso en particular
pm2 logs -> muestra los logs de los procesos (o alguno si se identifica)
         -> los logs ademas se almacenan en archivos que comviene limpiarlos cada una cierta cantidad de tiempo para ahorrar espacio
pm2 monit -> genera una tabla dinamica con los datos
pm2 help -> ayuda de los comandos

*/