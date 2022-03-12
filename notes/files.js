//Hoy en día no se usan mucho para contener datos, porque la mayoría de la información se está empezando a guardar en bases de datos
//Sí se sigue usando para generar reportes, por ejemplo exportar un excel o una imagen con un gráfico de como se estuvo comportando la app
//También se usan para guardar datos estáticos, como documentos legales, lineamientos, etc, pero son archivos que se guardan para entregarlos directamente a quien lo solicite, no para procesamiento

//Modulo de NodeJs para archivos: file system (fs) -> nativo al lenguaje
//puede usarse tanto de manera sincrónica como asincrónica, en sta última es apto tanto para callbacks como promesas

//Para importar este modulo:
// require('fs') => pero esto hay que asignarlo a una variable

const fs = require('fs');
let data
//uso sincrónico
try{
    data = fs.readFileSync('./texto.txt', 'utf-8');
} catch (error) {
    console.log(error);
    data = "hola che - bueno no hablo más"
}
//hay que tener cuidado con las direcciones, porque si al script se lo llama de una carpeta distinta a en la que existe, la ruta va a guiarse a partir de donde se lo llama no desde donde esta el archivo

console.log(data);

fs.writeFileSync('./texto.txt', 'HOLA CHE');
data = fs.readFileSync('./texto.txt', 'utf-8');
console.log(data);
fs.writeFileSync('./texto.txt', 'hola che');

fs.appendFileSync('./texto.txt', '- bueno no hablo más');

fs.unlinkSync('./texto.txt');

//modo asincrónico
//con callbacks

fs.readFile('./texto.txt', (error, content) => {
                                                if (error) {
                                                    //throw new Error(`Error en la lectura: ${error}`)
                                                    fs.writeFileSync("./texto.txt", "hola che");
                                                    data = 'hola che';
                                                } else {
                                                    console.log("File read successfully")
                                                    data = content;
                                                }                                     
                                            })

fs.appendFile('./texto.txt', ' agregandote', (error) => {
                                                    if (error) {
                                                        throw new Error(`Error en la escritura: ${error}`);
                                                    } else {
                                                        console.log("Escritura exitosa");
                                                    }
})



//con promises

fs.promises.readFile('./texto.txt', 'utf-8')
    .then((res) => console.log('leído:', res))
    .catch((err) => console.log(err))

//OTRAS FUNCIONES: la mayoría tienen su version sincronica y asincronica

//crear directorio: fs.mkdir
//listar archivos en directorio: fs.readdir