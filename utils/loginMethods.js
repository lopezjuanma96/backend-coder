import usersDAO from '../daos/users/usuariosDAOMongoAtlas.js';

const users = new usersDAO();

export async function createNewUser(data){
    const userExists = await users.getById(data.alias);
    if(userExists){
        throw new Error("User already exists")
    } else {
        await users.save(data, data.alias);
    }
}