import mongoose from "mongoose";

const userCollection = 'usuarios'
const userSchema = new mongoose.Schema({ //this object can be passed as props object form another
    name: {type: String, required:true, max:100}, //max 100 chars
    surname: {type: String, required:true, max:100}, //another important parameter is "unique" which blocks two regs with the same value on that key to be added
    email: {type: String, required:true, max:100},
    userName: {type: String, required:true, max:100},
    password: {type: Number, required:true}
})

export const users = mongoose.model(userCollection, userSchema)
