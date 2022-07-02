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
    products: {type: [cartProductSchema]}, //sets products to be an array of the schema cartProductSchema
    id: {type: Number, required: true},
    timestamp: {type: Number, required: true}
})

export const productsModel = mongoose.model(productsCollection, productsSchema)
export const cartModel = mongoose.model(cartCollection, cartSchema)
export const URL = "mongodb+srv://zagador123:446032@cluster0.snysn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"