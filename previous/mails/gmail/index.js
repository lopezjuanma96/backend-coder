import { createTransport } from "nodemailer";

const TEST = 'verner.conroy11@ethereal.email' //from Ethereal, given when creating an Ethereal Account
const HOST = 'jm.lopez@mi.unc.edu.ar'
const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {                                 //from Ethereal, given when creating an Ethereal Account
        user: HOST,
        pass: 'hjetevzuvfkntiwj'
    },
    tls: {                             //from here: https://stackoverflow.com/questions/46742402/error-self-signed-certificate-in-certificate-chain-nodejs-nodemailer-express
        rejectUnauthorized: false     //to avoid the Error: self signed certificate in certificate chain, not sure this is safe, but since it's for testing
    }
});

const mailOptions = {
    from: 'node.js server',
    to: TEST,
    subject: 'testing con gmail',
    html: '<h1 style="color:blue;">Contenido de prueba <span style="color:green;">Node</span></h1>',
    attachments: [
        {
            path: new URL('./path_to_image.png', import.meta.url).pathname //import.meta.url uses the url for that image, RESEARCH
        }
    ]
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