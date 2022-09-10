import { Context, helpers } from '../../deps.ts';
import type { User } from '../types/user.ts';
import { findUserById, newUser } from '../dbs/user.ts';

export const findUser = async (ctx: Context) => {
    const { uid } = helpers.getQuery(ctx, { mergeParams: true }); //mergeParams generates a unique object with all params 
    try{
        const user: User = await findUserById(uid);
        ctx.response.body = user;
    } catch (err) {
        ctx.response.status = 404;
        ctx.response.body = { err: err.message, uid }
    }
}

export const createUser = async (ctx: Context) => {
    try {
        const { name, birth } = await ctx.request.body().value;
        const created: User = await newUser(name, birth)
        ctx.response.body = created;
    } catch (err) {
        ctx.response.status = 404;
        ctx.response.body = { err: err.message }
    }
}