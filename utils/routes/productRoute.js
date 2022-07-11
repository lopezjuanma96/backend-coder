import { Router } from "express";
import { prodDAO as prod } from "../../DAOSelector.js";
import { productFaker } from "../fakerGen.js";
import { mwSearchId, checkUser } from "../mws.js";

const routerProd = new Router();

routerProd.get('/', mwSearchId, (req, res) => {
    const id = res.locals.id;
    if(isNaN(id)){
        prod.getAll()
        .then((allProducts) => res.render('main', {data:allProducts, dataExist:allProducts?allProducts.length>0:false}))
        .catch((e) => console.log(e));
    } else {
        try{
            prod.getById(id)
            .then((prod) => res.send(prod))
            .catch((e) => console.log(e));
        } catch (err) {
            res.status(500).send({error: "El producto no existe"})
        }
    }
})

routerProd.get('/test', (req, res) => {
    const iterations = req.query.number || 5;
    const allProducts = productFaker(iterations);
    res.render('main', {data:allProducts, dataExist:allProducts?allProducts.length>0:false})
})

routerProd.post('/', (req, res) => {
    const body = req.body;
    const parsePrice = parseFloat(body.price);
    if(isNaN(parsePrice)){
        res.status(400).send("Invalid Price Input");
    } else {
        const newProd = {...body, price: parsePrice};
        prod.save(newProd)
        .then(() => res.redirect('/'))
        .catch((e) => console.log(e))
        .finally(prod.close());
    }
})

routerProd.put('/', mwSearchId, (req, res) => {
    const id = res.locals.id;
    const body = req.body;
    const parsePrice = parseFloat(body.price);
    if(isNaN(id)){
        res.status(400).send({error: "Invalid Product ID"});
    } else if (isNaN(parsePrice)){
        res.status(400).send("Invalid Price Input");
    } else {
        try{
            const newProd = {...body, price: parsePrice};
            prod.change(id, newProd)
            .then(() => res.status(200).send(newProd))
            .catch((e) => {throw e})
            .finally(prod.close());
        } catch (err) {
            res.status(500).send({error: "El producto no existe"})
        }
    }
})

routerProd.delete('/', mwSearchId, (req, res) => {
    const id = res.locals.id;
    if(isNaN(id)){
        res.status(400).send({error: "Invalid Product ID"});
    } else {
        try{
            prod.getById(id)
            .then(res.status(200).send(temp))
            .catch((e) => {throw e});
            prod.deleteById(id)
            .catch((e) => {throw e})
            .finally(prod.close());
        } catch (err) {
            res.status(500).send({error: "El producto no existe"})
        }
    }
})

export default routerProd