//BASES DE DATOS:

/* 

Se interactua con las bases de datos de igual manera que el  parradigma cliente servidor

Ciente por CLI: Interaccion con la base de datos por consola:
Cliente por GUI: depende dell tipo de base de datos existen diferentes aplicaciones, ej: beekeper. Muchos proveedores de bases de datos ofrecen sus propias apps también, como MySQL Workbench.
Cliente Web: algunas bases de datos permiten acceso mediante el navegador.
Cliente de Aplicacion: permite, con las respectivas librerías, acceder a las bases de datos desde nuestra aplicacion backend.

RECORDAR: paradigma CRUD -> Create, Read, Update, Delete. Lo usamos además de archivos y persistencias de memoria, en bases de datos.

Estructura:

Bases de Datos
    |
    |
 Servidor
    |
   /|\
  / | \
 Clientes

BASES DE DATOS SQL: Structured Query Language. Es un lenguahe asociado a bases de datos relacionales.

Ejemplos de bases de Datos: MySQL, MariaDB. Tienen las mismas estructuras y trabajan con sql, 
cambian un poco las sintaxis de como realizar acciones o como se devuelven los datos. 
Ambas tienen bases de datos con Licencia Publica General, pero MySQL además presenta una version comercial brindada 
por la licencia de Oracle Corporation.

- Bases de datos relacionales:

Atomicidad: 
Consistencia: 
Aislamiento: cada instancia es independiente al resto
Durabilidad: los datos se mantienen en el tiempo
(por las siglas en ingles: ACID)

Estructura definida, no dinámica

Escalamiento Vertical -> relacionado a la memoria

- Bases de datos no relacionales:

Estructura dinámica

Escalamiento horizontal -> relacionado a la memoria

ESCALAMIENTO HORIZONTAL Y VERTICAL: https://media-exp1.licdn.com/dms/image/C5612AQE1LjmX47bqHw/article-cover_image-shrink_600_2000/0/1520164690624?e=2147483647&v=beta&t=wxGdMK8IZrvTQmWYhipvqMuLxdl5INV9kyNGOSAmsGE

*/

/*

Aplicaciones:

XAMPP permite simular una base de datos localmente.
MySQL Workbench construye el servidor que entrará en contacto con la base de datos a través de una GUI.

*/

/*

Interccion desde nuestra aplicacion backend a bases de datos:

Librería Knex: genera consultas SQL ya adaptado a cada una de las bases de datos más conocidas, adaptando sus
consultas a cada baase de datos respectiva. Utiliza callbacks y promesas.

http://knexjs.org/
https://devhints.io/knex

se instala con npm y debe instalarse el submodulo respectivo para cada base de datos, ej para usar con MySQL
correriamos "npm i knex mysql"

USANDOLO ME SURGIO UN ERROR DE QUE LA BASE DE DATOS NO SOPORTA AUTENTICACION Y TUVE QUE USAR mysql2, ver:
https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
AL FINAL NO ERA ESO, ERA QUE COMO TUVE QUE PONERLE OTRO PUERTO AL DEFAULT, ESTABA AGREGANDOLO EN EL HOST DE LAS CONFIGS, TIPO:

const knex = require("knex")({
    client:'mysql', 
    connection: {
        host: '127.0.0.1:4306',
        user: 'root',
        password: '', //should not be added in plain code, 
        database: 'coderhouseexample'
    }
});

PERO EN REALIDAD TENIA QUE PONERLO COMO UN PARAMETRO APARTE

const knex = require("knex")({
    client:'mysql',
    connection: {
        host: '127.0.0.1',
        port: '4306',
        user: 'root',
        password: '', //should not be added in plain code, 
        database: 'coderhouseexample'
    }
});

knexLib es un submodulo de knx que permite crear una clase que maneje las operaciones y que en nuestro codigo
principal solo llamemos a los metodos de esa clase, y que quede el codigo más limpio y menos repetitivo
*/
