// WEBPACK ES UN EMPAQUETADOR DE PAQUETES (package bundler)

//transforma todo el codigo en uno solo, minimizado para poder cargarse y ejecutarse facilmente en servidores o VM de bajos recursos
//con plugins tambien permite minificar y ofuscar (ocultar logica propietaria) nuestro codigo

// instalamos con npm, tanto al paquete como al modulo cli (npm install webpack webpack-cli)

//uso en CLI (ver root/previous/webpack):

/* 
webpack <files> //empaqueta todos los archivos enlistados en files 
webpack <files> --mode=production //empaqueta todos los archivos enlistados en files para produccion, sin comentarios 
webpack <files> --mode=development -w //empaqueta todos los archivos enlistados en files para dev, con comentarios y en modo watch (esperando cambios) 
*/

//WEBPACK USA UN MODULO DE NODE QUE ESTA DEPRECADO EN LA VERSION 17, POR LO QUE CUANDO USEMOS ESA VERSION HAY QUE CAMBIAR UNA DE LAS VARIABLES DE ENTORNO
