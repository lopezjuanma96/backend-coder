//AUTORIZACION Y AUTENTICACION

/*
AUTENTICACION: Demostrar que uno es quien es. A traves de contraseñas, login con otras redes, link al mail (enlace magico)
AUTORIZACION: a partir de un usuario logueado, ver a que lugares/funciones tiene acceso.

La forma más simple es grabar la lista de usuarios localmente.

Passport.js
paquete que se encarga de gestionar la autenticacion y autorizacion con los distintos metodos, llamados "strategies", cada
uno con un paquete instalable distinto:

- passport-local: con nombre de usuario y contraseña
- passport-openid: con el estandar OpenID (estandar abierto de autenticacion federada)
- passport-oauth: mediante la api de otros proveedores como redes sociales.

IMPORTANTE: el uso de passport, o de cualquier metodo de autorizacion/autenticacion, no descarta al uso de cookies y sesiones,
digamos que uno te permite registrarte y loguearte/desloguearte, el otro mantiene tu sesion y datos guardados una vez hecho el login.

JWT.js -> Access Tokens
La idea es que una vez que me loguee o registre el servidor me de un access token que yo pueda usar para ingresar sin usar el usuario y contra cada vez.

*/