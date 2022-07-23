//PAAS: Platform as a Service

/*
Se ofrece la plataforma como un servicio. En general, a diferencia de servidores basicos
es que cobran por accesos y no por almacenamiento, y escalar el hardware facilmente, incluso a veces
de manera automatizada y responsiva.
ejs: Heroku, Firebase, Google Cloud, AWS, Azure

Suelen proveer Frameworks para hacer el setup y deploys
Suelen proveer analiticas
Otros servicios: seguridad, autenticacion, IA, versionado, equipo temporal de trabajo
Otras ventajas: hardware y software sofisticado a bajo costo, equipos de desarrollo multigeograficos

OJO EN LOS DEPLOY PARA DEFINIR LA CONSTANTE PUERTO USAR LA VARIABLE DE ENTORNO:
const PORT = process.env.port || 8080

Terminos:
    IAC: Infrastructure as Code. Hacer los settings de la PaaS, DBaaS, etc desde el mismo codigo con algn framework (no de CLI, desde el codigo en si)
    IAM: Identity and Access Management: muchos PaaS ofrecen interfaces muy simples para poder gestionar las cuentas y permisos de una app

HEROKU: es un PaaS, tiene conexion con git para hacer deploy directamente de una rama

Registrarse en la pagina y descargar el cli (instalable o npm)
 - heroku login -> para loguearse por navegador
 - heroku git:remote [config][repo] -> definir un repo desde donde heroku hara el build, con la config puede definirse si sera un nuevo repo o uno existente

AWS (Amazon Web Services): la ventaja es que ademas de ser un PaaS, tiene servicios de cloud

    - Elastic Beanstalk: Servicio de AWS para facilitar el deploy -> incluya load balancer, vms (llamadas EC2 en AWS por Elastic Compute Cloud), 
        Buckets (para almacenar archivos como imagenes y logs), DynamoDB y Amazon SNS (notificaciones) , 
        creo que comparable seria Cloud Run, pero tampoco es tan facil comparar las herramientas de distintas cloud 1 a 1
    - Cloud Formation: Servicio de AWS para automatizar el ajuste de la infraestructura y los deploys- Existen herramientas como
    - Terraform que hacen lo mismo pero multiplataforma, o sea que una misma automatizacion la haga en AWS o GCP cambiando un solo parametro
    - Para el IAC se descarga un SDK


*/