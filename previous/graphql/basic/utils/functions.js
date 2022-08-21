import crypto from 'crypto';
import { Persona } from '../models/Persona.js';

const personaMap = {}

function getPersonas({ field, value }){
    if (field && value) return Object.values(personaMap).filter(elem => elem[`${field}`] == value);
    else return Object.values(personaMap)
}

function getPersona({ id }){
    if (personaMap[`${id}`]){
        const ret = {}
        ret[`${id}`] =  personaMap[`${id}`]
        return ret
    } else {
        throw new Error('Invalid Id');
    }
}

function createPersona({ data }){
    const id = crypto.randomBytes(10).toString('hex');
    const newPerson = new Persona(id, data);
    personaMap[`${id}`] = newPerson;
    return newPerson
}

export {
    getPersona,
    getPersonas,
    createPersona
}