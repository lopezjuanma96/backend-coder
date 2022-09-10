import { reset } from "https://deno.land/std@0.152.0/fmt/colors.ts";
import { resolve } from "https://deno.land/std@0.152.0/path/win32.ts";
import { uid, User } from "../types/user.ts";

export const findUserById = async (uid: uid) : Promise<User> => {
    return new Promise((resolve, reject) => {
        if (uid !== "001") throw new Error('User not found');
        
        setTimeout(() => {
            resolve({
                uid,
                name: 'test',
                birth: new Date()
            })
        }, 1000)
    })
}

export const newUser = async (name: string, birth: Date) : Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                uid: "001",
                name, 
                birth
            })
        }, 1000)
    })
    
}