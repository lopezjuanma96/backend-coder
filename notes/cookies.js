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