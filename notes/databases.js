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

/*

MongoDB : base de datos no relacional más utilizada

Se puede trabajar de manera remota (accediendo a un servidor en cloud) o creando nuestro servidor local.
En general se usa local para desarrollo y testing y luego se usa la nube para el uso real.
Uso gratuito para personas, tiene version empresarial.

Trabaja con colecciones y documentos: similar a JSON (como Firebase).
TABLA SQL -> COLECCION noSQL
FILA SQL -> DOCUMENTOS noSQL

al usarlo local, se descarga y se instalan los archivos que proveen dos ejecutables:
-- mongod.exe representa el servidor, sirve para crear los archivos necesarios que van a actuar como base de datos en una
carpeta y generar el servidor al cual hacer las consultas
-- mongo.exe representa el cliente con el que podemos hacer consultas a la base de datos

ALGUNOS COMANDOS:
mongod --dbpath path/to/db -> levanta el servidor de base de datos en la carpeta deeterminada, creando los archivos si es necesario (la primera vez)
mongo -> genera el cliente para hacer las consultas (el servidor debe estar levantado)
--dentro del cliente de mongo:
----show dbs -> muestra las bases de datos que contengan datos
----show collections -> muestra las collecciones dentro de la base de datos seleccionada
----db -> muestra la base de datos seleccionada para trabajar
----use __ -> permite seleccionar con que base de datos se trabajara, la crea si no existe
----db.____ -> selecciona una cierta coleccion dentro de la base de datos actual
----db.____.insert(__) -> inserta un nuevo documento en una coleccion de la base de datos actualmente seleccionada
----db.____.find(__) -> busca algun documento en la coleccion, o lista todos los documentos si no se pasa parametro.

Conexion por GUI a la base de datos:
Robo 3T -> Más estilizada, pero al ser paga se usa menos, tiene periood de prueba
MongoDBCompass -> viene con la instalacion gratuita de MongoDB

La mayoría de las cosas las trabajamos desde la consola propia de mongoDB pero me parece que es lo mismo que usar el paquete/librería de mongo en JS. (REVISAR)
*/

/*

MONGOOSE: https://mongoosejs.com/

MongoDB Object managing for JS

Se crea un modelo a partir de un esquema y un nombre (de base de datos), si esa base de datos no existe la crea:


import mongoose from "mongoose";

const userCollection = 'nombre_de_db'
const userSchema = new mongoose.Schema({ //this object can be passed as props object form another
    name: {type: String, required:true, max:100}, //max 100 chars
    surname: {type: String, required:true, max:100}, //another important parameter is "unique" which blocks two regs with the same value on that key to be added
    email: {type: String, required:true, max:100},
    userName: {type: String, required:true, max:100},
    password: {type: Number, required:true}
})

export const users = mongoose.model(userCollection, userSchema)

Luego se usa el modelo para crear o eliminar datos, con comandos similares a los de mongo, el unico 
un poco distinto es el create, ya que primero se crea el objeto a partir del esquema y luego se guarda en otro comando


//Creation
const newUser = {
    name:"Juan",
    surname:"López",
    email:"jmlopesz@lopez.ccom",
    userName:"zaga",
    password:541235
}

const userSaveModel = new users(newUser);  //ACA se crea el objeto basado en el esuema
let userSaved = await userSaveModel.save(); //ACA se guarda

//Read
console.log(await users.findOne({keys_to_search_at: values_to_find}));
console.log(await users.findMany({keys_to_search_at: values_to_find}));

//Update
const userUpdate = await users.updateOne({keys_to_search_at: values_to_find}, {$set: {keys_to_search_at: values_to_update}}); //el $set es la accion, es la más comun de uptdate

//Delete
const userDelet = await users.deleteOne({keys_to_search_at: values_to_find});


COMO SE VE TODAS LAS FUNCIONES SON ASINCRONAS ASI QUE SE TRABAJAN CON PROMESAS O AWAIT EN UNA ASYNC


*/
