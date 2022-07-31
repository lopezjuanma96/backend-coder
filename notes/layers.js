/*
ARQUITECTURA EN CAPAS: Se separan roles y responsabilidades de equipos y de componentes de la app en capas.

En proyectos pequeños o generales se usan 3:

- Capa de ruteo (routing): interfaz de programación (API)
- Capa de servicio (service): lógica de la app, accede a los datos y los modifica o elimina
- Capa de persistencia (persistency): hace el contacto con la base de datos (CRUD)

Cada capa solo se contacta con la capa inferior o superior, pero no salta.
Las conexiones son: la capa superior accede a las funciones de la capa inferior, y la capa inferior devuelve datos a la superior (recordar modulos React)
Podría agregarse al principio la capa de presentación que sería el front-end, se encargaría de mostrar los datos al cliente.

RECORDAR LA S DE PRINCIPIO SOLID: SINGLE RESPONSIBILITY
*/

/*
UN PASO MAS: CLEAN ARCHITECHTURE

https://github.com/JaviAPS94/scalio-challenge
*/