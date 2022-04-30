create database mibase;

create table usuarios (
	id int unsigned not null auto_increment, #no pueden tener signos negativos ni cero y son autoincrementales
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    edad int unsigned not null,
    email varchar(50) not null,
    primary key(id) #la clave primaria sirve para que no haya dos entradas con la misma id
    );
    
insert into usuarios (nombre, apellido, edad, email) values (
	'Juan', 'Perez', 23, 'jp@gmail.com'), (
    'Maria', 'Sanchez', 45, 'mmsj@hotmail.com');

select * from usuarios;

delete from usuarios where id = 2;
update usuarios set edad=27 where id=1;