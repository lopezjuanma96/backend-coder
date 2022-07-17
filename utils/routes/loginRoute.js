import { Router } from "express";
import { createNewUser } from "../loginMethods.js";

const routerLogin = new Router();

/////////LOGIN//////////
routerLogin.get('/login', (req, res) => {
    if (false){
        res.redirect('api/users/loginOk');
    }
    res.status(200).render('login');
});

routerLogin.post('/login', (req, res) => {
    const logObj = req.body;
    //AUTHENTICATE
    //GET DATA
    Object.keys(logObj).forEach((k) => req.session[k] = req.body[k]);
    res.redirect('api/users/loginOk');
});

/////////LOGOUT//////////
routerLogin.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err){
            res.status(400).send( {errorOn: "logout", log: err} );
        }
        res.status(200).redirect("/");
    });
});

/////////REGISTER//////////
routerLogin.get('/register', (req, res) => {
    res.status(200).render('register');
})

routerLogin.post('/register', (req, res) => {
    const data = req.body;
    createNewUser(data)
    .then(() => res.status(200).render('registerSuccess', { userAlias: data.alias }))
    .catch((e) => res.status(400).render('registerFail', {ERROR:e.message}));
})

export default routerLogin;