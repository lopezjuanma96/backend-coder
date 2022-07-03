import mongoose from "mongoose";

const productsCollection = 'productos'
const productsSchema = new mongoose.Schema({
    title: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true, max: 100},
    id: {type: Number, required: true},
    timestamp: {type: Number, required: true}
})

const cartCollection = 'carrito'
const cartProductSchema = new mongoose.Schema({
    title: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true, max: 100},
    id: {type: Number, required: true}
})
const cartSchema = new mongoose.Schema({
    productos: {type: [cartProductSchema]}, //sets products to be an array of the schema cartProductSchema
    id: {type: Number, required: true},
    timestamp: {type: Number, required: true}
})

const chatCollection = 'chat'
const chatSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    socket: {type: String, required: true, max: 100},
    user: {type: String, required: true, max: 50},
    msg: {type: String, max: 255},
    date: {type: Date}
})

export const productsModel = mongoose.model(productsCollection, productsSchema)
export const cartModel = mongoose.model(cartCollection, cartSchema)
export const chatModel = mongoose.model(chatCollection, chatSchema)
export const URL = "mongodb+srv://zagador123:446032@cluster0.snysn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"