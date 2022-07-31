/*
La idea de un gestor de paquetes es no tener que descargar y actualizar manualmente los paquetes, los cuales ademas
suelen ubicarse en un servidor remoto (en la nube) como propiedad de dicho gestor.

NPM: gestor base de versiones de paquetes
ofrece interfaz de comandos CLI, repositorio para unificar las dependencias y un website.
cualquier persona puede aportar con una dependencia al repositorio

NVM: gestor de versiones de paquetes de Node

Instalar desde https://github.com/coreybutler/nvm-windows/releases
Eliminar las versiones presentes de NPM y Node
Instalar NVM

NVM se usa desde CLI, contiene todos los comandos de NPM, ademas de agregar el gestor de versiones de NODE

nvm list -> listar versiones de node disponibles en el sistema //las versiones argon, boron, carbon, etc.. son versiones comprimidas para los deploy en Docker, Heroku, etc.
nvm install [version] -> instalar esta versión de Node
nvm use [version] -> setea dicha versión para usarse con el comando "node", dicha version debe haber sido previamente instalada en el sistema con nvm install
nvm which [version] -> checkea que la versión esté instalada en el sistema, y devvuelve el path donde esté instalada
nvm alias [alias] [version] -> asigna un alias a la versión para poder ser utilizada en otros comandos
nvm alias [<pattern>] -> busca el alias a partir de un patrón, o limpia todos los alias en caso de que no haya patrón
nvm alias default [version] -> al asignar el alias "default" a una version, esta queda definida como predeterminada aún al apagar el ordenador

EN LA DIAPO (O INTERNET) ESTAN LOS COMANDOS PARA CADA PLATAFORMA, YA QUE PUEDEN VARIAR O NO ESTAR, POR EJEMPLO EN LINUX nvm list ES nvm ls
Y alias NO ESTÁ EN WINDOWS https://github.com/coreybutler/nvm-windows/issues/503

YARN: es mucho más rápido que NPM, ya que hace uso de un hilo paralelo, por lo que además se puede seguir corriendo codigo mientras se instala
Puede instalarse a través de npm de manera global "npm i -g yarn"

COMANDOS:
yarn set version latest && yarn init -y -> inicializacion del espacio de trabajo, en realidad solo es el init, pero se recomienda agregar la primera parte para 
asegurarnos que se use la ultima version de yarn, ya que se puede utilizar varias versiones en paralelo como NVM. se crea el mismo package json que node, pero
el lock es un archivo propio de yarn, al igual que alrchivo yarnrc que contiene las configuraciones de este entorno de trabajo de yarn
yarn add [modulo] -> instala el paquete "modulo", tambiémn puede usarse el comando install, para instalarla como dev dependency usar el parámetro --dev
yarn remove [modulo] -> desinstala el paquete "modulo"
yarn run [script] -> ejecuta el comando de nombre "script" que debe estar listado dentro del objeto "scripts" de package.json
yarn install -> revisa el objeto de "dependencies" y "devDependencies" de package.json e instala o desinstala los paquetes necesarios

PNPM: codigo abierto, eficiente en el espacio en disco

NPX: al instalarse guarda algunos paquetes en memoria del ordenador para que puedan ser instalados en un entorno sin conectarse a internet, no se si los que
instalas en otros entornos o una lista de los top
*/

/*
REPOSITORIO DE NPM:

package.json -> contiene la metadata general de nuestro entorno de trabajo (no se limita a lista de paquetes): version de node, scripts, tipo modulo o common, etc
locks (package-lock.json, yarnlock, etc) -> contiene información más detallada de todo lo instalado en el entorno, por ejemplo dependencias de dependencias, versiones en detalle, etc. -> NO ES NECESARIA EN PRODUCCION

Al crearse una cuenta en https://www.npmjs.com/ se pueden subir nuestros propios paquetes.
es recomendable asegurarse que se disponga la ultima version del npm CLI con "npm install latest@npm -g"
Es importante crear un README.md y tener los archivos del paquete en github, aunque no obligatorio

1) con npm login ingresamos a nuestra cuenta en el entorno de CLI
2) con npm publish publicamos nuestro paquete con el nombre, version, descripcion, etc que se disponga en el package.json

*/