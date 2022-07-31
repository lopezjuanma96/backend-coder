import { Router } from "express";
import { getDatabaseController, createDataController } from './controllers/datos.js'

const routerDatos = new Router();

routerDatos.get('/get', getDatabaseController);
routerDatos.post('/new', createDataController);

export {routerDatos}