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
    cart.getById(thisCartId)
    .then((thisCart) => {
        if(thisCart){
            cart.deleteById(thisCartId)
            .then((deletedItem) => {
                res.status(200).send(JSON.stringify({deletedItem}));
            }).catch((err) => {
                logger.error(`Error when deleting cart with id ${thisCartId}`);
                res.status(500).json({at:'cartDelete', error: err.message});
            })
        } else {
            logger.error(`Invalid id sent to delete cart ${thisCartId}`);
            res.status(400).json({at:'cartDelete', error: `Invalid id sent to delete cart ${thisCartId}`});
        }
    })
    .catch((err) => {
        logger.error(`Error finding cart to delete with id ${thisCartId}`);
        res.status(400).json({at:'cartDelete', error: err.message});
    })
})

routerCart.get('/:id/productos', (req, res) => {
    const thisCartId = parseFloat(req.params.id);
    cart.getById(thisCartId)
    .then((thisCart) => res.status(200).json(thisCart.productos))
    .catch((err) => {
        logger.error(`Error searching for cart products, ${err.message}`)
        res.status(500).send(JSON.stringify({error: "ID carrito inexistente"}))
    })
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
                logger.error("Invalid product id or " + err.message)
                res.status(500).send(JSON.stringify({at: "cartUpdate", error: "ID producto inexistente o " + err.message}))
            })
        }).catch((e) => {
            logger.error("Invalid product id or " + err.message)
            res.status(500).send(JSON.stringify({at: "cartUpdate", error: "ID producto inexistente o " + err.message}));
    })
    }).catch((e) => {
        logger.error("Invalid cart id or " + err.message)
        res.status(500).send(JSON.stringify({error: "ID carrito inexistente o " + err.message}))
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
                res.status(400).send("No existe un producto con ese ID\n" + JSON.stringify(thisCart))
            }
        })
        .catch((err) => {
            logger.error("Invalid product ID or " +err.message);
            res.status(500).send(JSON.stringify({at: "deleteProdFromCart", error: "ID producto inexistente o " + err.message}));
        })
    })
    .catch((err) => {
        logger.error("Invalid cart ID or " +err.message);
        res.status(500).send(JSON.stringify({at: "deleteProdFromCart", error: "ID carrito inexistente o " + err.message}));
    })
})

export default routerCart