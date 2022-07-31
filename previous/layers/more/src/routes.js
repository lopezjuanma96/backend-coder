import { Router } from "express";
import { getDatabaseController, createDataController } from './controllers/datos.js'
import {getSumaController, getRestaController, getMultiplicacionController, getDivisionController, getOperacionesController} from './controllers/operaciones.js'

const routerDatos = new Router();

routerDatos.get('/get', getDatabaseController);
routerDatos.post('/new', createDataController);

const routerOps = new Router();

routerOps.get('/suma', getSumaController);
routerOps.get('/resta', getRestaController);
routerOps.get('/mult', getMultiplicacionController);
routerOps.get('/div', getDivisionController);
routerOps.get('/all', getOperacionesController);

export {routerDatos, routerOps}