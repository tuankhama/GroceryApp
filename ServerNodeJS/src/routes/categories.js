var express = require('express')
var router = express.Router();
const categories = require('../controllers/categories')

// http:localhost:3000/categories
router.get('/', async (req, res, next) => {
    try {
        const fetchCategories = await categories.getAllCategories();
        res.status(200).json(fetchCategories);
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;
