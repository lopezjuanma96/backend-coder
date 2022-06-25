/*

DBaaS: Databases as a Service: ejecucion y gestion de bases de datos optimizadas y alojadas en la infraestructura de un provedor en la nube (servicios cloud)
antes para tener tus datos (en formato de base de datos o no) debias comprar un ordenador.

IaaS: Infrastructure as a Service: aporta al DBaaS, donde los proveedores Cloud proveen distintas infraestructuras de datos dependiendo de las necesidades
(más o menos memoria, más o menos velocidad, etc..)

Alojamiento gestionado: El usuario solo carga los datos, el proveedor se encarga de evaluar que infraestructura necesita y le cobra por ese valor.
En el modelo clasico, debías estar al tanto de revisar tus datos para ver si hacia falta limpiar algo para recuperar espacio o comprar más hardware en la nube.
Ejemplo Google Cloud con Firebase, AWS Services, Microsoft Azure: mongoDB tiene Atlas (https://cloud.mongodb.com/).

MONGODB ATLAS: https://cloud.mongodb.com/

- Tiene una consola para correr los mismos comandos de mongoDB
- permite automatizacion: pueden crearse triggers de eventos
- flexible
- seguro
- escalable
- posee version gratuita
- compatible con otros servicios de nube (AWS, GCP, Azure)

Al crear un cluster me puedo conectar de 3 maneras: 

A) usando commandos del mongo shell (con mongo.exe del bin del directorio de Mongo)
B) usando la API desde nuestra aplicacion
C) usando MongoDB compass, con la GUI

FIREBASE: https://firebase.google.com/

En página de firebase:
- Crear un proyecto con nombre
- Ir a config -> cuentas de servicio
- Generar clave privada

En nuestro script:
- Agregar snippet de codigo
- Dentro del snippet de conexión, proveído por la parte de autenticacion, agregar -> databaseURL: 'https://NOMBREDELABASEDEDATOS.firebaseio.com', ej:

const admin = require("firebase-admin");

//AUTHENTICATION - Could be imported////
const serviceAccount = require("./db/react-backend-67669-firebase-adminsdk-wu9wg-56253767e1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://react-backend-67669.firebaseio.com'
});
//END AUTHENTICATION//

*/