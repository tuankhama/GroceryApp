const express = require('express')
const router = express.Router();
const cartService = require('../controllers/carts')

// http:localhost:3000/carts/:idUser
router.get('/:idUser', async (req, res, next) => {
    try {
        const idUser = req.params.idUser;
        const fetchCart = await cartService.getCarts(idUser);
        res.status(200).json(fetchCart);
    } catch (error) {
        res.status(400).json(error);
    }
})
// http:localhost:3000/carts/add/:idUser/:idProduct?quantity=100
router.post('/add/:idUser/:idProduct', async (req, res, next) => {
    try {
        const { idUser, idProduct } = req.params;
        const { quantity } = req.query;
        const addCart = await cartService.addCart(idUser, idProduct, quantity);
        res.status(200).json(addCart);
    } catch (error) {
        res.status(400).json(error);
    }

})


// http:localhost:3000/carts/delete/:idUser/:idProduct
router.delete('/delete/:idUser/:idProduct', async (req, res, next) => {
    try {
        const { idUser, idProduct } = req.params;
        const removeCart = await cartService.removeCart(idUser, idProduct);
        res.status(200).json(removeCart);
    } catch (error) {
        res.status(400).json(error);
    }

})


// http:localhost:3000/carts/increase/:idUser/:idProduct
router.post('/increase/:idUser/:idProduct', async (req, res, next) => {
    try {
        const { idUser, idProduct } = req.params;
        const increase = await cartService.increaseQuantity(idUser, idProduct);
        res.status(200).json(increase);
    } catch (error) {
        res.status(400).json(error);
    }

})


// http:localhost:3000/carts/increase/:idUser/:idProduct
router.post('/decrease/:idUser/:idProduct', async (req, res, next) => {
    try {
        const { idUser, idProduct } = req.params;
        const increase = await cartService.decreaseQuantity(idUser, idProduct);
        res.status(200).json(increase);
    } catch (error) {
        res.status(400).json(error);
    }

})
module.exports = router;
