import mongoose from "mongoose";
import {users} from './models/usuario.js'

async function CRUD(){

    const URL =  "mongodb+srv://zagador123:446032@cluster0.snysn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("Conectado!"))
    .catch((err) => console.log(err))
    
    //Creation
    const newUser = {
        name:"Juan",
        surname:"López",
        email:"jmlopesz@lopez.ccom",
        userName:"zaga",
        password:541235
    }

    const userSaveModel = new users(newUser);
    let userSaved = await userSaveModel.save();

    return userSaved
}

CRUD().then((u) => console.log("DONE!", u)).catch((e) => console.log(e))