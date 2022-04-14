/*

HTTP
el cliente inicia siempre la conversacion: envia un request y el servidor recibe y/o envía datos

Websockets
una vez que el cliente inicial la conversacion, el servidor puede seguir enviando datos sin esperar el request
(especial uso en notificaciones y aplicaciones push, tracking de pedidos)
Es un concepto, no una característica de JS, por lo que se puede usar con otros lenguajes, sin embargo
JS se caracteriza por proveer Websockets simples

Principios:
- Luego del handshake el canal queda abierto
- El servidor se mantiene activo, y no requiere de un request para enviar info al usuario
- La comunicación se lleva a cabo por TCP
- se utiliza en medios que requieran conexiones rapidas: chats, apps de finanzas, venta de tickets, juegos online, camara de seguridad.
- Hoy aparecen nuevas variantes como las bases de datos en tiempo real, que pueden reemplazar o ayudar al uso de websockets

Como websockets reemplazo a HTTP, ejemplo chat:
(la palabra reemplazar no es correcta, porque no es que lo reemplaza en todos los ambitos
solo donde hacen falta conexiones bidireccionales y eficientes)

Si usara http solo, deberia recargar la pagina cada vez.
Para ello se desarrollo AJAX, que todavía se usa a veces para simular websockets con HTTP.
Sin embargo incluso con AJAX las conexiones son unidireccionales, por lo que los clientes 
tienen que estar solicitando updates todo el tiempo.
ANALOGÍA: HTTP es un walkie-talkie, Websockets es un telefono

https://www.google.com/url?sa=i&url=https%3A%2F%2Fed.team%2Fcomunidad%2Fdiferencias-entre-ajax-y-websockets&psig=AOvVaw2EBtQ2yfzvKuxI0EZqL1CC&ust=1650039336395000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKCZ_9v5k_cCFQAAAAAdAAAAABAE

herramienta para websockets: socket.io -> ya que la comunicacion es bidireccional, debe usarse tanto en cliente como servidor
características de socket.io: crea conexiones viables, no hace falta hacer la exception en FireWall
                              soporte para desconexiones, a menos que se indique lo contrario, el cliente siempre estara intentando reconectarse a un servidor desconectado
                              sistema heatbeat para deteccion de desconexion de cualquiera de los dos lados
                              soporte de estructura binaria, permitiendo usar cualquier herramienta que binarize datos

*/