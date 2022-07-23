//ARTILLERY: paquete para emular requests al servidor

/*
PAra hacer pruebas funcionales continuas
Para evaluar el funcionamiento de nuestra app
PAra comprobar los limites a los que puede llegar el hardware de nuestro servidor:
 - RAM
 - Almacenamiento
 - max requests simultaneas

Sirve para todo tipo de apps, no solo node

Conviene instalarlo globalmente  y trabajarlo de cli:
artillery quick --count [numero de req] -n [numero de usuarios] [http] > [log file path]

*/