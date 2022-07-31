import {getSuma, getResta, getMultiplicacion, getDivision, getOperacionesResults} from '../services/operaciones.js'

async function getSumaController(req, res){
    const result = await getSuma(Number(req.query.num1), Number(req.query.num2))
    res.json(result)
}
async function getRestaController(req, res){
    const result = await getResta(Number(req.query.num1), Number(req.query.num2))
    res.json(result)
}
async function getMultiplicacionController(req, res){
    const result = await getMultiplicacion(Number(req.query.num1), Number(req.query.num2))
    res.json(result)
}
async function getDivisionController(req, res){
    const result = await getDivision(Number(req.query.num1), Number(req.query.num2))
    res.json(result)
}

async function getOperacionesController(req, res){
    const result = await getOperacionesResults();
    res.json(result)
}

export {getSumaController, getRestaController, getMultiplicacionController, getDivisionController, getOperacionesController}