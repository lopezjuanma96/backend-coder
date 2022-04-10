// ROUTER EN EXPRESS

/*Express tiene un router propio

- importación:

const {Router} = require("express"); //si lo quiero solo

ó

const express = require("express");
const {Router} = express; //para tener express también

- USO:

router  = new Router()

//Opcionalmente
router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.get('subroute', getCallback); //similar a los metodos de la app=express();
router.post('subroute', postCallback); //similar a los metodos de la app=express();

app.use('URL', router); //entonces para acceder a los recursos del router entro a 'URL/subroute' tanto en get y post

*/

/*Recursos estáticos: usado cuando no se dispone de acceso a una base de datos para manejar nuestros
archivos, estos se pueden almacenar directamente en el servidor y ser accedidos como elementos estáticos

app.use(express.static('pathCarpetaDeRecursos'))

por ejemplo puedo tener una carpeta llamada 'public' en el mismo directorio donde está el script del servidor
dondeguardo mis datos, luego en el script ingreso

app.use(express.static('public'))

y todos los archivos se accederan como 'URL/archivo' 
OJO QUE NO ES URL/public/archivo, porque los archivos se cargan directamente como elementos estaticos
esto ademas quiere decir que si tengo dos archivos con el mismo nombre en distintas carpetas se van a pisar
si quiero diferenciarlos, agrego el subruteo en el app.use, que incluso puede ser el mismo nombre de la carpeta

app.use('/static', express.static('public')) //los archivos de la carpeta public se acceden como 'URL/static/archivo'

pudiendo entonces hacer

app.use('/images', express.static('images'))
app.use('/videos', express.static('videos'))

si el sscript del servidor se llama desde un directorio distinto al suyo, no se va a encontrar la carpeta con
los recursos, por lo que siempre es útil agregar la variable __dirname que contiene la direccion de nuestro script

app.use('/images', express.static(__dirname + '/images'))

*/

/*MIDDLEWARE: cumplen distintas funciones de procesamiento de las distintas request antes de que lleguen al servidor
o vuelvan a cliente. ej: el request solicita datos y envia un token de autenticacion, un middleware 
checkea que las credenciales sean correctas, otro verifica que permisos tiene el usuario, si todos son 
exitosos el request llega al server y se procesa la solicitud, a la salida otros middleware modifican la respuesta
para que llegue más apta para el cliente en vez del servidor

- MIDDLEWARE GLOBAL se aplica a todos lo request/response

app.use((req, res, next) => {
    .. //procesamiento del request, posibles response
    next()
})

app.get('URL', (req, res) => {..}) //el request de este get pasara antes por el middleware de arriba

-MIDDLEWARE ESPECIFICO: se aplica solo a las solicitudes marcadas

function mw(req, res, next){ //puede definirse con flecha tambien, o anonima directamente en el app.get o post
    ...
    next()
}

app.get('URL', mw, (req, res) => {...}) //el request de este get pasa por el middleware
app.get('URL', (req, res) => {...}) //el request de este get no

-- MIDDLEWARE DE MANEJO DE ERRORES: es una manera de usar los middleware generalmente globales pero se
puede hacer tambien con especificos, para ahorrar codigo en el manejo de errores. ej:

app.get('URL', (req,res,next) =>{
    ..
    try{
        ..
    } catch(err) {
        ..
        next(err) //este next llamará al middleware posterior (global o local), enviando el error ademas de req y res
    }
})

app.post('URL', (req,res,next) =>{
    ..
    try{
        ..
    } catch(err) {
        ..
        next(err) //este next llamará al middleware posterior (global o local), enviando el error ademas de req y res
    }
})

app.use((err, req, res, next) => { //este middleware, en este caso global, se ejecutara en caso de error en todos los metodos REST que yo agregue
    ... //error handling
})

EN REALIDAD EL MÉTODO use() DE app ESTA DEDICADO A MIDDLEWARES, CUANDO HACÍAMOS app.use(express.json)
O app.use(express.static(..)) ESTABAMOS USANDO MIDDLEWARES YA DEFINIDOS POR express

-- MIDDLEWARE DE TERCEROS

//antes: npm install cookieParser
...
const cookies = require("cookieParser")
app = express()
app.use(cookies())
*/

/*MULTER: SUBIR ARCHIVOS
no es una subdependencia de express! hay que instalarla con npm

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); //define la carpeta de guardado en uploads/
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`) //define el nombre de cada archivo suubido como la fecha
    }
})

const upload = multer({ storage: storage }); //este objeto contiene las caracteristicas para maanejar la carga en la variable storage, dentro de ellas un middleware para el POST request

app.post('uploadFile', upload.single('miArchivo'), (req,res,next) => {
    const archivo = req.file;
    res.send("subido exitosamente")
})

app.post('uploadMultFiles', upload.array('misArchivos', cantMax), (req,res,next) => {
    const archivos = req.files;
    res.send("subido exitosamente")
})

*/