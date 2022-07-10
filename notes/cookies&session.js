/*
COOKIES: Datos guardados por las páginas y aplicaciones web del lado del cliente
Sirven para recolectar datos (por ejemplo contabilizar cuantas veces el usuario ingreso a la direccion)
mejorar la performance, etc.

cookie-parser.js
modulo que ayuda a crear cookies. Actua como middleware por lo que se invoca usando app.use('cookie-parser')
o si la queremos en un request en particular como request('URL', cookie-parser, (req, res) => {...}). Lo que hace
es agregar metodos y funciones dentro de los req y res.

//primero se crea y setea el objeto
import cookieParser from 'cookie-parser'

app.use(cookieParser(Secret)) //donde Secret es un string o array de strings que sirven de clave para las signed cookies, es opcional

//luego dentro de las http request, que ya tienen el middelware a traves del app.use, incluimos los comandos

req.cookie('key', value, params) //crea una cookie de valor value identificada con 'key' y en params se definen 
                                  //parametros como el tiempo de expiracion automatica o el uso de encriptacion

res.cookies //objeto que almacena las cookies presentes (RECORDEMOS QUE AL SER DEL CLIENTE, CAMBIAN NAVEGADOR A NAVEGADOR)
            //al ser objeto puedo acceder a cada cookie con su key como res.cookies.key o res.cookies['key']

res.signedCookies //objeto que almacena las signed cookies o cookies encriptadas

res.clearCookie() //metodo para borrar una o todas las cookies dependiendo de si se pasa el key de la cookie como parametro o no.
*/

/*
SESIONES: datos guardados durante el uso de un mismo navegador durante un tiempo determinado, 
por ejemplo cuando el usuario se loggea, mantenemos el nombre de usuarios en memoria para no tener
que pedirlo cada vez que cambia de pagina.

express-session.js
Se usa para gestionar sesiones, también funciona como middleware, por lo que se inicializa como

import session from 'express-session';
app.use(session({params})) //params recibe parametros de autenticacion, duracion de la sesion etc

y luego se aplican metodos y objetos desde los req y res.
para definir variables de sesion simplemente uso req.session.obj donde obj es el nombre del parametro que quiero crear,  modificar o leer, ej:

app.get('/', (req, res) => {
    if (!req.session.contador) {
        req.session.nombre = req.query.nombre;
        req.session.contador = 1;
        res.send(`Te damos la bienvenida ${getSessionName(req)}`);
    } else {
        req.session.contador++;
        res.send(`${getSessionName(req)} visitaste la página ${req.session.contador} veces.`);
    }
});

para limpiar la session se utiliza req.session.destroy(callback(err)), metodo que recibe un callback con un parametro de error que es true
si fallo y false si se logro finalizar la sesion, por lo que un logout se veria como:

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({ status: 'Logout error', body: err });
        } else {
            res.json('Logout ok');
        }
    });
});

FORMAS DE ALMACENAMIENTO DE SESSION

- session-memoryStore
Los datos se almacenan en la memoria de la ejecucion del programa, a penas finaliza la aplicacion (a nivel backend) los datos desaparecen
Solo se usa en desarrollo, nunca en produccion. Se utiliza de manera predeterminada con express-session.

- session-fileStore
Los datos se almacenan en archivos del lado del cliente. Al finalizar el programa no se borran, pero sí si se desinstala el navegador o se
borran las cookies desde config. Se intala session-file-store, y al inicializarlo requiere pasar como parametro la session de express:

import session from 'express-session';
import file-store from 'session-file-store';

const FileStore = file-store(session)
//en el ejemplo esta hecho con require

- redis
Similar a lo que hacíamos con mongod y MySQL, genera un servidor en el cual podemos guardar nuestros archivos.
La ventaja contra un FileStore simple es que todos los archivos estan organizados en el mismo lugar, y que
se pueden enviar cualquier tipo de objetos (no hace falta stringify ni otras transformaciones).
Para usarlo local se isntala y ejecuta en shell desde donde hay algunos comandos pero ademas una vez levantado
se puede controlar con un modulo redis instalable por npm.
Para usarlo en Windows se requiere un shell de Linux encima, ver instrucciones en la documentacion.
Tiene ademas una version remota (cloud) llamada RedisLab, al que también se puede conectar por el modulo npm
*/