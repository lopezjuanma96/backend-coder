export const mwSearchId = (req, res, next) => {
    if(Object.entries(req.query).length > 0){
        const searchId = parseFloat(req.query.id);
        if(isNaN(searchId)){
            res.status(400).send({error: "Invalid Product ID"});
        } else {
            res.locals.id = searchId;
            next();
        }
    } else {
        res.locals.id = NaN;
        next();
    }
}

export const checkUser = (req, res, next) => {    
    if (req.session.alias) {
        next();
    } else {
        res.redirect("/")
    }
    
    /* User permissions validation
    const userName = localStorage.getItem('userName')
    console.log(`Leyendo usuario ${userName}`)
    if(userName){
        const userAccessList = JSON.parse(readFileSync("./userAccessList.json"));
        if(userName != "" && userAccessList.find((elem) => elem === userName)){
            console.log("El usuario se encuentra en la base de datos")
            next();
        } else {
            console.log("El usuario no se encuentra en la base de datos")
            req.redirect("/");
        }
    }
    */
}