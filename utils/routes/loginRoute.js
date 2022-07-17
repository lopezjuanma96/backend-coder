import { Router } from "express";
import { createNewUser, loginUser } from "../loginMethods.js";

const routerLogin = new Router();

/////////LOGIN//////////
routerLogin.get('/login', (req, res) => {
    if (false) { //HERE add jwt token
        res.redirect('api/users/loginOk');
    }
    res.status(200).render('login');
});

routerLogin.post('/login', (req, res) => {
    const logObj = req.body;
    loginUser(logObj)
    .then((userData) => {
        Object.keys(userData).forEach((k) => req.session[k] = userData[k]);
        res.render('loginSuccess', {userAlias: userData.alias});
    })
    .catch((e) => res.render('loginFail', {ERROR: e}))
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