const twilio = require('twilio');

const accSid = '';
const accTok = ''; //from your twilio account data

const client = twilio(accSid, accTok);

const options = {
    body : 'Hola este es un mensaje', //sms content
    from : '', //from twilio account phone data
    to: '+5492364513248'
}

try{ //can be also done with then/catch 
    const message = await client.messages.create(options);
    console.log(message);
} catch (e) {
    console.log(e);
}