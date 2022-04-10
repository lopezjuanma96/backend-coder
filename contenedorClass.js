const fs = require('fs');

module.exports = class Contenedor {

    filePath;
    fileString;

    constructor(_filePath){
        this.filePath = _filePath || "./container.json";
    }

    _getNewId(arr){
        let aux = 0;
        arr.forEach((elem) => {
            if (elem > aux){
                aux = elem;
            }
        })
        return aux + 1;
    }
    
    async save(val){
        try{
            const contentString = await fs.promises.readFile(this.filePath, 'utf-8');
            const content = JSON.parse(contentString);
            const newId = this._getNewId(content.map((elem) => elem.id));
            content.push({...val, id:newId});
            await fs.promises.writeFile(this.filePath, JSON.stringify(content));
            console.log("Nuevo valor creado");
        } catch (error) {
            throw new Error(`Error al intentar crear el nuevo valor:\n${error}`);
        }
    }

    async change(id, val){
        try{
            const contentString = await fs.promises.readFile(this.filePath, 'utf-8');
            const content = JSON.parse(contentString);
            content[content.findIndex((e) => e.id === id)] = {...val, id:id};
            await fs.promises.writeFile(this.filePath, JSON.stringify(content));
        } catch (error) {
            throw new Error(`Error al intentar crear el nuevo valor:\n${error}`);
        }
    }

    getAll(){
        try{
            return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
        } catch (error) {
            throw new Error(`Error leyendo los valores:\n${error}`);
        }
    }

    getById(id){
        const arr = this.getAll();
        const search = arr.find((elem)=> elem.id === id);
        if(search){
            return search;
        } else {
            throw new Error("No se encontro el id solicitado");
        }
    }

    async deleteAll(){
        try{
            prom = await fs.promises.unlink(this.filePath);
            console.log("Todos los valores fueron borrados");
        } catch (error) {
            throw new Error(`Error al intentar borrar todos los datos:\n${error}`);
        }
    }

    async deleteById(id){
        try{
            const arr = this.getAll();
            const newArr = arr.filter((elem) => elem.id != id);
            await fs.promises.writeFile(this.filePath, JSON.stringify(newArr));
            console.log(`El elemento con id ${id} fue eliminado correctamente`);
        } catch (error) {
            throw new Error(`Error al intentar borrar el elemento con id ${id}:\n${error}`);
        }
        
    }
}