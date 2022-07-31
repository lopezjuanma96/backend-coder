import { getAll, save } from '../repositories/operaciones.js';
import operaciones from 'ejemplonpmcoderhouseap31820';

async function getSuma(num1, num2){
    const sumaResult = await operaciones.suma(num1, num2);
    await saveOp('suma', {num1, num2}, sumaResult)
    return sumaResult
}
async function getResta(num1, num2){
    const restaResult = await operaciones.resta(num1, num2);
    await saveOp('resta', {num1, num2}, restaResult)
    return restaResult
}
async function getMultiplicacion(num1, num2){
    const multiplicacionResult = await operaciones.multiplicacion(num1, num2);
    await saveOp('multiplicacion', {num1, num2}, multiplicacionResult)
    return multiplicacionResult
}
async function getDivision(num1, num2){
    const divisionResult = await operaciones.division(num1, num2);
    await saveOp('division', {num1, num2}, divisionResult)
    return divisionResult;
}

async function saveOp(type, param, result){
    const info = {
        type,
        param,
        result
    }
    info.timestamp = Date.now();
    await save(info);
}

async function getOperacionesResults() {
    const oper = await getAll();
    return oper;
}

export {getSuma, getResta, getMultiplicacion, getDivision, getOperacionesResults}