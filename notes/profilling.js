//PROFILING: analisis de rendimiento para ver donde estan los cuellos de botella

/*
CURL: herramienta para realizar http request por consola. en Mac y Linux viene como comando por defecto,
en windows hay que bajar la app - POSTMAN posee una opcion para ver el codigo necesario para replicar una cierta request en
cada uno de los lenguajes, curl incluido

muchos navegadores tienen su profiler propio: en Chrome entrar a inspect://

node tiene su propia herramienta por codigo: ver 'details.txt' en ./profilings

hay paquetes de terceros que hacen profiling:
    -autocannon: para generar los prof logs, similar a artillery pero dentro del codigo
    -0x: similar al inspect de chrome (se instala global y corre el codigo)
    
    autocannon y 0x se utilizan en paralelo, con autocannon se generan las request dentro del codigo y con 0x se levanta el server 
    con inspeccion

*/