/*
MOTORES DE PLANTILLAS: hoy se conocen como monolitos
funcionalidad que se usaba mucho antes, hoy mas que nada en aplicaciones chicas.
tienen backend y frontend dentro de un mismo script/aplicacion

Hoy aparece en muchos sistemas publicos o bancarios que utilizan Java por lo que corren todo
en el mismo codigo

PATRON MVC: modelo-vista-controlador (recordar JS)
se usa mucho en MOTORES DE PLANTILLAS 
el modelo gestiona todo el funcionamiento, recibiendo datos/solicitudes del controlador, que las recibe del usuario
y entregando interfaces de interaccion a la vista, que las muestra al usuario.
A veces tambien se usa en backend solo, pero principalmente monolitos.
Desventaja: Es mucho mas complejo que otras aplicaciones puedan interactuar con tu logica, en general se limita a un
backend que trabaja solo para el frontend.

El motor de plantillas en sí toma una plantilla en un lenguaje pseudo HTML y le inserta la informacion
proveniente del controlador de MVC para entregarselo a la vista.

Express tiene algunas plantillas incorporadas, cuya sintaxis varía levemente.

- handlebars:
se utiliza un codigo pseudoHTML donde las variables se identifican con doble llave {{variable}} cuyo valor
se reemplaza según un JSON que se ingresa como input que posea {variable: valor}
ej:
<p> Hola {{remitente}} soy {{emisor}}</p>
{remitente: "Juan", emisor:"Pedro"}

puede utilizarse en cliente o en servidor, el uso en cliente es muy comun en SPA con JS nativo
existen cdn o versiones web de handlebars, pero tembien existe el framework express-handlebars (ver abajo).

-otros..

-Motores de plantillas custom:
Para crear el motor usamos app.engine(ext, callback), donde ext es un string con la extension de los archivos,
y callback recibe al motor, las opciones y un callback de final de proceso que recibe un error o el resultado del procesado, 
y representa la traduccion del motor en si
Con app.set('views', path) especificamos donde se encuentran las plantillas 
Con app.set('view engine', ext) especificamos el nombre del motor de plantillas
finalmente en nuestro response de un request http hacemos req.render('archivo_template', objeto_datos)
donde el objeto de datos es el string reemplazado y 'archivo_template' es el path al template pero sin la extension de archivo,
o al menos no hace falta agregarla, porque se buscara con la extension dada en app.engine

- express-handlebars:
en realidad es una adaptacion del anterior (handlebars solo), lo pongo a parte para que quede mas prolijo
se instala con npm install, ojo que las instrucciones estan para la version 5.3 y hace poco salio la 6

const hb = require("express-handlebars")

app.engine( //al igual que en el custom inicializamos el motor con engine pero ahora en vez de definirlo nosotors pasamos el dato del handlebars
    'hbs', //NO SE BIEN QUEE ES ESTO
    handlebars({ // y aqui pasamos este objeto con algunos parametros que devolvera el callback ya listo
        extname: '.hbs',
        defaulltLayout:
        ..
    })
)
app.set('views', path)
app.set('view engine', name)

luego creamos el archivo template con extension .hbs siguiendo las instrucciones de definicion de variables de handlebars
(viendo la docu se ve que ademas de los {{variable}} hay otras que aportan otras configs, por ejemplo incrustar todo un
hbs en otro hbs, creo que con {{>file}}, y aplicar logica con #if, #each, etc.)

*/