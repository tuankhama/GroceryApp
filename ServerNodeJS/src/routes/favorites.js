const express = require('express')
const router = express.Router();
const favoritesService = require('../controllers/favorites')
// http:localhost:3000/favorites/:idUser
router.get('/:idUser', async (req, res, next) => {
    try {
        const idUser = req.params.idUser;
        const fetchFavorites = await favoritesService.getFavorites(idUser);
        res.status(200).json(fetchFavorites);
    } catch (error) {
        res.status(400).json(error);
    }
})

// http:localhost:3000/favorites/add/:idUser/:idProduct
router.post('/add/:idUser/:idProduct', async (req, res, next) => {
    try {
        const { idUser, idProduct } = req.params;
        const addFavorites = await favoritesService.addFavorite(idUser, idProduct);
        res.status(200).json(addFavorites);
    } catch (error) {
        res.status(400).json(error);
    }

})

// http:localhost:3000/favorites/delete/:idUser/:idProduct
router.delete('/delete/:idUser/:idProduct', async (req, res, next) => {
    try {
        const { idUser, idProduct } = req.params;
        const addFavorites = await favoritesService.deleteFavorite(idUser, idProduct);
        res.status(200).json(addFavorites);
    } catch (error) {
        res.status(400).json(error);
    }

})

module.exports = router;
