import twilio from "twilio";
import { createTransport } from "nodemailer";
import logger from './logger.js';

const accSid = '';
const accTok = ''; //from your twilio account data

const WAPP_SRC = ''; //source where to send the whatsapp messages from
const MSG_SRC = ''; //source where to send the text messages from
const MAIL_SRC = {
    user: 'jm.lopez@mi.unc.edu.ar',
    pass: 'hjetevzuvfkntiwj'
}; //source where to send the emails from

const client = twilio(accSid, accTok);

async function sendMessage(dest, cart){
    const options = {
        body : cartToMsgBody(cart),
        from : MSG_SRC,
        to: dest
    }
    
    client.messages.create(options)
    .then((msg) => {
        logger.info(`Sent confirmation message to ${dest}.`);
        return msg
    })
    .catch((err) => {
        logger.error(`Could not send confirmation message to ${dest}, because of ${err.message}`);
    })
}

async function sendWhatsapp(dest, cart){
    const options = {
        body : cartToMsgBody(cart),
        from : `whatsapp:${WAPP_SRC}`,
        to: `whatsapp:${dest}`
    }
    
    client.messages.create(options)
    .then((msg) => {
        logger.info(`Sent confirmation Whatsapp to ${dest}.`);
        return msg
    })
    .catch((err) => {
        logger.error(`Could not send confirmation Whatsapp to ${dest}, because of ${err.message}`);
    })
}

async function sendMail(cart, user){
    const transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: MAIL_SRC,
        tls: {                             //from here: https://stackoverflow.com/questions/46742402/error-self-signed-certificate-in-certificate-chain-nodejs-nodemailer-express
            rejectUnauthorized: false     //to avoid the Error: self signed certificate in certificate chain, not sure this is safe, but since it's for testing
        }
    });
    
    const options = {
        from: 'server@no-response',
        to: user.mail,
        subject: `Cart Summary for ${user.alias}`,
        html: cartToMailBody(cart, user.alias)
    };

    transporter.sendMail(options)
    .then((info) => {
        logger.info(`Sent summary of cart for user ${user.alias}.`);
        return info
    })
    .catch((err) => {
        logger.error(`Could not send summary of cart for user ${user.alias} because of ${err.message}`);
    })
}

function cartToMailBody(cart, userName){
    return `
    <h2>El usuario ${userName} a comprado:</h2>
    <list>
        ${cart.productos.map((elem) => 
            `<ul>${elem.number} ${elem.number > 1? elem.name + 's' : elem.name}</ul>`
        ).join('\n\t')}
    </list>
    `
}

function cartToMsgBody(cart){
    return cart.productos.map((elem) => {
        `- ${elem.number} ${elem.number > 1? elem.name + 's' : elem.name}`
    }).join('\n');
}

export default {sendMail, sendMessage, sendWhatsapp}