import usersDAO from '../daos/users/usuariosDAOMongoAtlas.js';

const users = new usersDAO();

export async function createNewUser(data){
    const userExists = await users.getById(data.alias);
    if(userExists){
        throw new Error("User already exists")
    } else {
        await users.save(data, data.alias); //HERE add password hashing
    }
}

function checkPassword(a, b){
    return a === b; //HERE add hashing check
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