import usersDAO from '../daos/users/usuariosDAOMongoAtlas.js';
import bCrypt from 'bcrypt';

const users = new usersDAO();

//MANUALLY DONE
export async function createNewUser(data){
    const userExists = await users.getById(data.alias);
    if(userExists){
        throw new Error("User already exists")
    } else {
        await users.save({...data, pass: doHash(data.pass)}, data.alias);
    }
}

function checkPassword(a, b){
    return  bCrypt.compareSync(a, b);
}

function doHash(pass) {
    return bCrypt.hashSync(pass, bCrypt.genSaltSync(10), null);
}

export async function loginUser(data){
    const userExists = await users.getById(data.alias);
    if(userExists){
        if(checkPassword(data.pass, userExists.pass)){
            userExists.alias = userExists.id;
            delete userExists.id;
            delete userExists.pass;
            return userExists;
        } else {
            throw new Error("Invalid Credentials");
        }
    } else {
        throw new Error("Invalid Credentials");
    }
}

//FOR LAST PROJECT: DO IT WITH PASSPORT AND USE ALIAS AS _id NOT id (mongoDb document id NOT a key inside the document called id)
