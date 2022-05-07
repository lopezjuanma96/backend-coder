import mongoose from "mongoose";
import { users } from "./models/usuario.js";

async function CRUD(){
    try{
        //Database Conection
        const URL = 'mongodb://localhost:27017'; //if using on localhost, the server has to be created somewhere with mondod.exe --dbpath path/to/db (from mongoDB bin directory)
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Base de datos conectada")

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

        //Read
        console.log(await users.findOne({}));
        
        //Update
        const userUpdate = await users.updateOne({name: 'Juan'}, {$set: {password:3214}});
        console.log("Updated");
        
        console.log(await users.findOne({}));
        
        //Delete
        const userDelet = await users.deleteOne({name: 'Juan'});
        console.log("Deleted")

        console.log(await users.findOne({}));
    } catch (err) {
        console.log(err);
    }
}

CRUD()
    .then(() => console.log("Done"))