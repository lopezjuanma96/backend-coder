//DBaaS with Firebase: FIRESTORE

const admin = require("firebase-admin");

//AUTHENTICATION - Could be imported////
const serviceAccount = require("./db/react-backend-67669-firebase-adminsdk-wu9wg-56253767e1.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://react-backend-67669.firebaseio.com'
});
//END AUTHENTICATION//

console.log('Connected');

async function CRUD(){
    const db = admin.firestore();
    const query = db.collection('usuarios');

    //Create
    try{
        let id = 1;
        let doc = query.doc(`${id}`); //documents with the same id cannot be created it will raise error TRY IT OUT!
        await doc.create({nombre: 'Juan', dni: 216875132});
        id++;
        doc = query.doc(`${id}`);
        await doc.create({nombre: 'Ema', dni: 54321});
        doc = query.doc(); //if no id is passed, a random hash is passed
        await doc.create({nombre: 'Licha', dni: 551231})
    } catch (e) {
        console.log(e);
    }

    //Read
    try{
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;

        const response = docs.map((doc) => ({
            id: doc.id, //carefull how id is a parameter
            nombre: doc.data().nombre, //but data is a method
            dni: doc.data().dni
        }));
        console.log(response)
    } catch (e) {
        console.log(e);
    }

    //Special Read: Filter
    try{
        let id = 2;
        const doc = query.doc(`${id}`);
        const item = await doc.get();
        const response = item.data(); //can also get item.id
        console.log(response)
    } catch (e) {
        console.log(e);
    }

    //Update
    try{
        let id = 2;
        const doc = query.doc(`${id}`);
        let itemUpdated = await doc.update({dni : 569558}) //sumary of update process is returned, should see if theres a way to get the update results
        console.log('updated:', itemUpdated)
    } catch (e) {
        console.log(e);
    }

    //Delete
    try{
        let id=1;
        const doc = query.doc(`${id}`);
        let itemDeleted = await doc.delete();  //sumary of Delete process is returned, should see if theres a way to get the update results
        console.log('deleted:', itemDeleted);
    } catch (e) {
        console.log(e);
    }
}

CRUD();
