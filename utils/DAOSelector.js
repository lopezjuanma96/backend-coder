import ProductosDAO from '../daos/prods/productosDAOFirebase.js'
import ChatDAO from '../daos/chat/chatDAOMem.js'
import CarritoDAO from '../daos/cart/CarritoDAOMongoAtlas.js'

export const prodDAO = new ProductosDAO();
export const chatDAO = new ChatDAO();
export const cartDAO = new CarritoDAO();