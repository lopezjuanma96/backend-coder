const prodChoice = "Firebase"
const chatChoice = "Mem"
const cartChoice = "Archivo"

import ProductosDAO from `./daos/prods/productosDAO${prodChoice}`
import ChatDAO from `./daos/prods/productosDAO${chatChoice}`
import CarritoDAO from `./daos/prods/productosDAO${cartChoice}`

export const prodDAO = new ProductosDAO();
export const chatDAO = new ChatDAO();
export const cartDAO = new CarritoDAO();