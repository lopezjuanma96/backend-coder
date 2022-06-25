import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const serviceAccount = require("./react-backend-67669-firebase-adminsdk-wu9wg-56253767e1.json") // use the require method
const admin = require('firebase-admin')

export default class Contenedor {
    db;
    query;

    constructor(collection) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://react-backend-67669.firebaseio.com'
        });
        this.db = admin.firestore();
        this.query = this.db.collection(collection);
        console.log(`Connected to Firestor Collection: ${collection}`);
    }

    async _getNewId(){
        const querySnapshot = await this.query.get();
        const docs = querySnapshot.docs;
        if(docs.length > 0) {
            let lastId = 0;
            docs.forEach((doc) => {
                const docId = parseFloat(doc.id);
                lastId = docId > lastId ? docId : lastId;
            })
            return lastId + 1;
        } else {
            return 1;
        }
        //not the most efficient way, maybe this https://stackoverflow.com/questions/52772169/get-data-ordered-by-document-id-in-firestore-by-javascript
    }
    
    async save(val){
        const id = await this._getNewId();
        const doc = this.query.doc(`${id}`);
        await doc.create(val);
        console.log(`Created new value with ID: ${id}`);
    }

    async change(id, val){
        const doc = this.query.doc(`${id}`);
        const itemUpdated = await doc.update(...val);
        console.log(`Updated element with ID: ${id} \n`, itemUpdated);
    }

    async getAll(){
        const querySnapshot = await this.query.get();
        const docs = querySnapshot.docs;
        return docs.map((doc) => ({
            id: doc.id,
            //COMPLETAR
        }))
    }

    async getById(id){
        const doc = this.query.doc(`${id}`);
        return doc
    }

    async deleteAll(){
        this.query.delete(); //REVISAR
    }

    async deleteById(id){
        const doc = this.query.doc(`${id}`);
        const itemDeleted = await doc.delete();
        console.log(`Deleted element with ID: ${id} \n`, itemDeleted);
    }
}