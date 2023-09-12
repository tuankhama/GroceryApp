const express = require('express')
const router = express.Router();
const productController = require("../controllers/products")
// http:localhost:3000/products
router.get('/', async (req, res, next) => {
    try {
        const fetchProducts = await productController.getAllProduct();
        res.status(200).json(fetchProducts);
    } catch (error) {
        res.status(400).json(error);
    }
})


// http:localhost:3000/products/getbycate/:idCate
router.get('/getbycate/:idCate', async (req, res, next) => {
    try {
        const idCate = req.params.idCate;
        const fetchProducts = await productController.getProductByIdCate(idCate);
        res.status(200).json(fetchProducts);
    } catch (error) {
        res.status(400).json(error);
    }
})

// http:localhost:3000/products/detail/:idProduct
router.get('/detail/:idProduct', async (req, res, next) => {
    try {
        const idProduct = req.params.idProduct;
        const fetchProducts = await productController.getDetailProduct(idProduct);
        res.status(200).json(fetchProducts);
    } catch (error) {
        res.status(400).json(error);
    }
})


module.exports = router;
