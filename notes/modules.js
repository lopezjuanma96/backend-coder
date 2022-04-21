// CREAR ARCHIVOS DE CODIGO COMO MODULOS:

/*
    hasta ahora veniamos usando importacion de scripts comunes (commonJS) con require,
    y para exportarlos debíamos hacer module.exports = funcion_u_objeto_a_exportar
    esta importacion es sincronica y gasta tiempo de ejecucion

    creando modulos, que lo hacemos indicando en el package.json la config: "type": "module"
    esto permite importar codigo de manera asincrona, con el comando import,
    y exportarlos con export funcion_u_objeto_a_exportar (esto es un feature nuevo de ES6)
    (similar a cuando trabajabamos los imports en React)

    Al ser asincrona, import devuelve una promesa y admite el uso de comandos async y await.
    Entonces los modulos que no son necesarios para el funcionamiento se trabajan como promesas,
    a los que si son necesarios usamos el await, incluso pudiendo hacer imports condicionales o
    que los imports no esten al principio sin en el momento que lo necesito.

    LOS MODULOS SON MUY IMPORTANTES PARA EL JIT (Just In Time) COMPILING

*/