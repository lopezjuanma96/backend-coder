//EFICIENCIA EN PAGINAS

/* 

No hay que conservar los console logs en nuestro deploy final porque nadie los puede ver y son sincrónicos así que bloquean las ejecuciones.

Otras técnicas para mejorar el procesamiento de nuestro server es:

- Comprimir los archivos transmitidos -> gzip
- Evitar funciones síncronas (como console.log)
- Los logs y errors pueden llevarse a archivos externos con modulos como debug winston o bunyan
- Manejar correctamiente las excepciones para que no se clave el server, porque aún si tenemos un modulo como pm2 que los reinicia, para el usuario son tiempos muertos.

Conveniente:
- usar la variable de entorno NODE_ENV en modo debug y produccion. En produccion guarda muchas vistas en cache eficientizando. pero ademas nosotros podemos desarrollar codigo para 
usar ifs que dependan de como esta NODE_ENV.
- Usar algún metodo de master/slave para reiniciar servidores que se caigan, y una alerta si se cae master.
- usar clusters
- usar redis o nginx para tener datos en cache: para informacion que no varía más que una vez al día.
- usar load balancer: nginx o con alguno de los serverless (route 53 en amazon, cloudRun en Gcloud creo)

*/

//LOGGERS

/*
Se usa en muchas aplicaciones pero donde más se ve su efecto es en las aplicaciones grandes.
guardan los errores e impresiones de procesos en archivos o consolas pero no como las que usamos localmente sino en consolas globales que puede visualizar toda la empresa.

Grafano y SignalFx -> recoger todos los logs de varias aplicaciones en un mismo punto para mejorar la busqueda, analisis, filtrado

- Log4Js (TIEEEEEMBLA)

- Winston

- Pino -> más simple de configurar
*/