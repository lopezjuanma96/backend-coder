import { createTransport } from "nodemailer";

const TEST = 'verner.conroy11@ethereal.email' //from Ethereal, given when creating an Ethereal Account

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {                                 //from Ethereal, given when creating an Ethereal Account
        user: 'verner.conroy11@ethereal.email',
        pass: 'pxJpSG6m2JENbgBCJx'
    },
    tls: {                             //from here: https://stackoverflow.com/questions/46742402/error-self-signed-certificate-in-certificate-chain-nodejs-nodemailer-express
        rejectUnauthorized: false     //to avoid the Error: self signed certificate in certificate chain, not sure this is safe, but since it's for testing
    }
});

const mailOptions = {
    from: 'node.js server',
    to: TEST,
    subject: 'testing',
    html: '<h1 style="color:blue;">Contenido de prueba <span style="color:green;">Node</span></h1>'
}

try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
} catch (e) {
    console.log('ERROR:')
    console.log(e.message);
}

//OR:

/*
transporter.sendMail(mailOptions)
.then((info) => console.log(info))
.catch((e) => console.log(e.message))
*/