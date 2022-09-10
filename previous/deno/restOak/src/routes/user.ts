import { Context, Router } from "../../deps.ts";
import { findUser, /*deleteUser, updateUser,*/ createUser } from '../controllers/users.ts'

export const router = new Router()
    .get('/', (ctx: Context) => ctx.response.body='helloworld')
    .get('/api/users/:uid', findUser)
    /*
    .delete('api/users/:uid', deleteUser)
    .patch('api/users', updateUser)
    */
    .post('/api/users', createUser);