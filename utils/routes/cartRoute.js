import { cartDAO as cart, prodDAO as prod } from "../../DAOSelector.js";
import { Router } from "express";

const routerCart = new Router();

routerCart.post('/', (req, res) => {
    const newId = cart.save({productos: []});  //i dont know why this is returning a promise.
    res.status(200).send(JSON.stringify({id: newId}));
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
    const thisCart = cart.getById(thisCartId);
    res.status(200).send(JSON.stringify(thisCart.productos));
})

routerCart.post('/:id/productos/:id_prod', (req, res) => {
    const thisCartId = parseFloat(req.params.id);
    const thisProdId = parseFloat(req.params.id_prod);
    let gotCart = false;
    cart.getById(thisCartId)
    .then((thisCart) => {
        gotCart = true;
        prod.getById(thisProdId)
        .then((thisProd) => {s
            thisCart.productos.push(thisProd);
            cart.change(thisCartId, thisCart)
            .then((changedCart) => res.status(200).send(JSON.stringify(thisCart)))
            .catch((e) => res.status(500).send(JSON.stringify({error: "Error al actualizar carrito"})))
        }).catch((e) => res.status(500).send(JSON.stringify({error: "ID producto inexistente"})))
    }).catch((e) => res.status(500).send(JSON.stringify({error: "ID carrito inexistente"})))
})

routerCart.delete('/:id/productos/:id_prod', (req, res) => {
    const thisCartId = parseFloat(req.params.id);
    const thisProdId = parseFloat(req.params.id_prod);
    try{
        const thisCart = cart.getById(thisCartId);
        try {
            const thisProd = prod.getById(thisProdId);
            if (thisCart.productos.find((e) => e.id === thisProdId)){
                thisCart.productos = thisCart.productos.filter((e) => e.id !== thisProdId);
                cart.change(thisCartId, thisCart);
                res.status(200).send(JSON.stringify(thisCart));
            } else {
                res.status(200).send("There's no product of that ID in the requested Cart\n" + JSON.stringify(thisCart))
            }
        } catch (e) {
            res.status(500).send(JSON.stringify({error: "ID producto inexistente"}));
        }
    } catch (e) {
        res.status(500).send(JSON.stringify({error: "ID carrito inexistente"}));
    }
})

export default routerCart