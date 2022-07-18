//PROXY: servidor que hace de intermediario entre el servidor y el cliente

/*
- Principalmente ayuda en la seguridad.
- Load Balancing: balanceo de carga
- Caching
- Compresion y decompresion de datos
- Certificados SSL

-DOS TIPOS:

--> proxy directo (forward): anonimato del lado del cliente.
--> proxy inverso (reverse): anonimato del lado del servidor. Los certificados SSL se suelen crear en el proxy inverso.
No son mutuamente excluyentes, pueden funcionar en paralelo.
Let's Encrypt: Autoridad de certificacion gratuita, automatizada y OpenSource

Ahora principalmente vemos el proxy inverso que es el que nos interesa desde el backend
*/

/*
nginx.exe -> sistema muy usado para proxy inverso, load balancing y caching

se descarga y extrae, y se ejecuta el nginx.exe que genera el servidor que va a ahcer de proxy en localhost
(para que sea facil gestionarlo usar el taskmanager o tasks en cmd:
tasklist /fi "imagename eq nginx.exe"
taskkill /fi "imagename eq nginx.exe" /f)

el servidor mostrara lo que este en la carpeta html al abrirlo en localhost (sin puerto, supongo que entra al default pero no me funciono con 8080)

Configuraciones:

-- LOAD BALANCER: 
1) colocamos el siguiente codigo debajo de "#gzip on"
upstream node_app {
		server 127.0.0.1:8081;
		server 127.0.0.1:8082 weight=3;                                  //siginifica que va a estar redirigiendo a esos dos puertos las request, cada 3 que mande al 8082 manda una al 8081
	}
2)luego dentro de server incluimos como root la carpeta del servidor/app que queremos montar con el proxy, debajo del server_name:
server {                                                                    //esto ya estaba
    listen       80;                                                        //esto ya estaba
    server_name  nginx_node;                                                //esta modificamos
    root C:\Users\lopez\ForDdrive\backend-coder\previous\proxy\public;      //esto agregamos: al darle la carpeta public podemos dejar de usar app.use('/public') en nuestro server, sino que lo gestione nginx
...
3) modificamos el location con la siguiente información
location /datos/ {                                                         //esto significa que tenemos que luego abrir localhost/datos, y por lo tanto nosotros tenemos que darle una ruta GET de datos a nuestro server
    proxy_pass http://node_app
}

*/