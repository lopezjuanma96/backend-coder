// ALTERNATIVA A API REST, creada por FACEBOOK

/*
La principal ventaja es que permite que el objeto de respuesta no tenga que tener una estructura fija,
entonces si mi base de datos tiene productos, con el mismo endpoint puedo una vez pedir el nombre,
otra vez pedir el precio, otro el stock y la fecha, etc.

Este filtrado suele hacer que las consultas sean mas rápidas y flexibles.

No existen metodos de GET, POST, PUT y DELETE, sino Consultas y Mutaciones.

- Consultas: consumir datos, especificando como recibirlos (flexibilidad)
- Mutaciones: escribir o modificar datos.

El paquete de GraphQL genera documentacion automatica y posee una app propia para generar los distintos request

Un esquema de GraphQL representa que clases de objetos se pueen solicitar y cuales son sus campos.
Un esquema permite unificar toda la api, proveyendo una unica fuente de información.
Debido a que la fuente de informacion es siempre la misma, la evolucion de funciones o la creacion
de nuevas funciones no afecta el desempeño de las anteriores, a menos que así se desee. Esto es viable
en API REST, pero se debe hacer manualmente.
GraphQL se puede implementar sobre y//o a la par de una API REST
La estructura de datos es bastante diferente a las de las API REST, así que suele ser complejo
interpretarlas tanto en backend como en frontend si uno esta acostumbrado a API REST.
Delegan más trabajo al servidor.
https://medium.com/sciforce/the-strength-and-beauty-of-graphql-in-use-16814fdc07cc

*/