import { cartDAO as cart, prodDAO as prod } from "../../utils/DAOSelector.js";
import { Router } from "express";
import logger from "../logger.js";

const routerCart = new Router();

routerCart.post('/', (req, res) => {
    cart.save({productos: []})
    .then((newId) => {
        res.status(200).send(JSON.stringify({id: newId}));
    })
    .catch((err) => {
        logger.error(err);
        res.status(400).send('Unable to create new cart');
    })
})

routerCart.delete('/:id', (req, res) => {
    const thisCartId = parseFloat(req.params.id);
    try{
        const deletedItem = cart.getById(thisCartId);
        cart.deleteById(thisCartId);
        res.status(200).send(JSON.stringify({deletedItem}));
    } catch (e) {
        res.status(500).send(JSON.stringify({error: "ID carrito inexistente"}));
    }
})

routerCart.get('/:id/productos', (req, res) => {
    const thisCartId = parseFloat(req.params.id);
    cart.getById(thisCartId)
    .then((thisCart) => res.status(200).send(JSON.stringify(thisCart.productos)))
    .catch((err) => res.status(500).send(JSON.stringify({error: "ID carrito inexistente"})))
})

routerCart.post('/:id/productos/:id_prod', (req, res) => {
    const thisCartId = parseFloat(req.params.id);
    const thisProdId = parseFloat(req.params.id_prod);
    let gotCart = false;
    cart.getById(thisCartId)
    .then((thisCart) => {
        gotCart = true;
        prod.getById(thisProdId)
        .then((thisProd) => {
            const prodInCart = thisCart.productos.findIndex((elem) => elem.id === thisProdId && elem.id);
            console.log(prodInCart)
            if(prodInCart >= 0) {
                thisCart.productos[prodInCart].number++;
            } else {
                thisCart.productos.push({...thisProd, number: 1, id: thisProdId})
            }
            cart.change(thisCartId, thisCart)
            .then((changedCart) => res.status(200).send(JSON.stringify(changedCart)))
            .catch((e) => {
                logger.error(e.message)
                res.status(500).send(JSON.stringify({error: "Error al actualizar carrito"}))
            })
        }).catch((e) => {
            logger.error(e.message)
            res.status(500).send(JSON.stringify({error: "ID producto inexistente"}))
    })
    }).catch((e) => {
        logger.error(e.message)
        res.status(500).send(JSON.stringify({error: "ID carrito inexistente"}))
    })
})

routerCart.post('/:id/buy', (req, res) => {
    const thisCartId = parseFloat(req.params.id);
    cart.getById(thisCartId)
    .then((thisCart) => {
        logger.info('should be sending cart mail now..')
        res.status(200).redirect('/')
    })
    .catch((err) => res.status(500).send(JSON.stringify({error: "ID carrito inexistente"})))
})

routerCart.delete('/:id/productos/:id_prod', (req, res) => {
    const thisCartId = parseFloat(req.params.id);
    const thisProdId = parseFloat(req.params.id_prod);
    cart.getById(thisCartId)
    .then((thisCart) => {
        prod.getById(thisProdId)
        .then((thisProd) => {
            if (thisCart.productos.find((e) => e.id === thisProdId)){
                thisCart.productos = thisCart.productos.filter((e) => e.id !== thisProdId);
                cart.change(thisCartId, thisCart);
                res.status(200).send(JSON.stringify(thisCart));
            } else {
                res.status(200).send("There's no product of that ID in the requested Cart\n" + JSON.stringify(thisCart))
            }
        })
        .catch((err) => {
            logger.error(err.message);
            res.status(500).send(JSON.stringify({error: "ID producto inexistente"}));
        })
    })
    .catch((err) => {
        logger.error(err.message);
        res.status(500).send(JSON.stringify({error: "ID carrito inexistente"}));
    })
        
})

export default routerCart