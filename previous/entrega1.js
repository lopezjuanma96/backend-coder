class Usuario {
    nombre;
    apellido;
    libros = [];
    mascotas = [];

    constructor(_nombre, _apellido){
        this.nombre = _nombre;
        this.apellido = _apellido;
    }

    getFullName(){
        return `${this.apellido}, ${this.nombre}`
    }

    addMascota(_animal){
        if (typeof(_animal) === 'string'){
            this.mascotas.push(_animal);
        } else {
            console.warn(`El valor ${_animal} ingresado en el método addMascota no es de tipo string`);
        }
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(_title, _author){
        if (typeof(_title) === 'string' && typeof(_author) === 'string'){
            this.libros.push({nombre: _title, autor: _author});
        } else {
            console.warn(`Uno o más de los valores ${_title} y ${_author} ingresados en el método addBook no son del tipo string`);
        }
    }

    getBookNames(){
        return this.libros.map((l) => l.nombre);
    }
}

jm = new Usuario("Juan Manuel", "López")

console.log(jm.getFullName());

console.log('antes de agregar mascotas tengo:',  jm.countMascotas());
jm.addMascota("perro");
jm.addMascota("gato")
console.log('intentando agregar una mascota con nombre invalido')
jm.addMascota(2);
console.log('luego de agregar mascotas tengo:',  jm.countMascotas());

console.log('antes de agregar libros tengo estos:', jm.getBookNames());
jm.addBook("Cien años de soledad", "GG Marquez");
jm.addBook("La historia del tiempo", "Stephen Hawking");
console.log('intentando agregar un libros incorrectamente');
jm.addBook(365, "JK Rowling");
jm.addBook("Hary Potter");
console.log('luego de agregar libros tengo estos:', jm.getBookNames());

