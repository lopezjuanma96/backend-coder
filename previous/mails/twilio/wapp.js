// on the twilio page, "Try it out" tab, there's a step by step introduction to using twilio

const twilio = require('twilio');

const accSid = '';
const accTok = ''; //from your twilio account data

const client = twilio(accSid, accTok);

const options = {
    body : 'Hola este es un mensaje de Whatsapp', //sms content
    from : 'whatsapp:[number]', //from twilio try it out -> whatsapp tutorial
    to: 'whatsapp:+5492364513248'
}

try{ //can be also done with then/catch 
    const message = await client.messages.create(options);
    console.log(message);
} catch (e) {
    console.log(e);
}