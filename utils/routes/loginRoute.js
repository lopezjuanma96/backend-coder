import { Router } from "express";

const routerLogin = new Router();

routerLogin.get('/login', (req, res) => {
    if (false){
        res.redirect('api/users/loginOk');
    }
    res.status(200).render('login');
});

routerLogin.post('/login', (req, res) => {
    const logObj = req.body;
    Object.keys(logObj).forEach((k) => req.session[k] = req.body[k]);
    res.redirect('api/users/loginOk')
});

routerLogin.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err){
            res.status(400).send( {errorOn: "logout", log: err} );
        }
        res.status(200).redirect("/");
    });
});

routerLogin.get('/register', (req, res) => {
    res.status(200).render('register');
})

export default routerLogin;