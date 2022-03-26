//Node.js: entorno de ejecucion de JS, los navegadores lo tienen instalado para poder ejecutar el JS de cada pag
//si tenemos codigo en Js podemos usar la consola para ejecutarlo con el commando "node codigo.js"

/*
MODULOS NATIVOS
Node.js posee varios módulos incorporados (nativos) compilados en binario.
Estos módulos básicos están definidos en el código fuente de Node en la carpeta lib/ (ejemplo FileSystem).

Los módulos básicos tienen la preferencia de cargarse primero si su identificador es pasado desde require().
Por ejemplo, require('fs') siempre devolverá lo construido en el módulo fs (FileSystem), 
incluso si hay un fichero con ese nombre.
*/

/*
PACKAGE MANAGER
Los Package Managers (o Administradores de paquetes) sirven para no tener que descargar, 
instalar y mantener las dependencias de un proyecto a mano. Principalmente se usa NPM.

Si instalamos una dependencia en forma global, todos nuestros programas desarrollados en NodeJS 
contarán con esa librería, y con la versión que haya sido instalada.
En cambio, si instalamos en forma local, podremos elegir exactamente qué librería y con qué versión 
contará cada proyecto que desarrollemos.

package.json:
Es un archivo de configuración generado por NPM en formato JSON que es parte de un proyecto Node.js.
Podemos crearlo mediante la instrucción: npm init
Podemos especificar en este archivo la lista de dependencias, que son las librerías que usa el proyecto 
para funcionar o para realizar distintos tipos de testing.
Siempre que hayamos especificado nuestras dependencias EN EL ARCHIVO package.json 
podremos actualizar y mantener de forma fácil y segura las dependencias del proyecto con el comando 
npm install.
Además podemos hacer que npm agregue como dependencia al package.json un módulo a la vez que lo instala: 
- Si lo queremos como dependencia del proyecto, al comando ‘install’ le agregamos el nombre del módulo: 
npm install <algún-módulo>
- Si lo queremos como dependencia de todos nuestros proyectos, agregamos el parámetro --global o -g: 
npm install -g <algún-módulo>
- Si sólo es una dependencia del entorno de desarrollo, le agregamos --save-dev ó -D : 
npm install --save-dev <algún-módulo-dev> ó npm install -D <algún-módulo-dev> 

versionado:
Las librerías de NPM siguen un estándar de versionado de tres números, separados entre sí por un punto:
MajorRelease.MinorRelease.Patches
ej: 2.0.4

manejo de versiones: se logra a partir de anteponer simbolos al numero de version de un paquete:

> 	descargar/actualizar a cualquier versión posterior a la dada 

>=  descargar/actualizar a cualquier versión igual o posterior a la dada

<= 	descargar/actualizar a cualquier versión anterior a la dada

< 	descargar/actualizar a cualquier versión igual o anterior a la dada

~   descargar/actualizar la version dada y solo mantenerla actualizada hasta los Patches

^   descargar/actualizar la version dada y mantenerla actualizada en Patches y Minor Release

*   descargar/actualizar la version dada y mantenerla en todos los cambios (Patches, Minor y Major Release)

Finalmente, si no se pone ningún símbolo, se acepta únicamente la versión especificada.
Si en lugar de escribir una versión, se escribe ‘latest’, 
se descargará o actualizará siempre a la última versión disponible. 

IMPORTANTE:
Adicionalmente se pueden crear combinaciones con los criterios anteriores. 
Por ejemplo:  1.0.0 || >=1.1.0 <1.2.0 usará la versión 1.0.0 (si la encuentra) o alguna a partir de 1.1.0, 
pero anteriores a 1.2.0


*/
