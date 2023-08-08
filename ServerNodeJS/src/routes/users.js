const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')
// http:localhost:3000/users/register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const registerUser = await userController.registerUser(name, email, password);
    res.status(200).json(registerUser);
  } catch (error) {
    res.status(400).json(error);
  }
})

// http:localhost:3000/users/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginUser = await userController.loginUser(email, password);
    res.status(200).json(loginUser);
  } catch (error) {
    res.status(400).json(error);
  }
})



// http:localhost:3000/users/change/:idUser
router.post('/change/:idUser', async (req, res, next) => {
  try {
    const idUser = req.params.idUser;
    const { password } = req.body;
    const changePass = await userController.changePasword(idUser, password);
    res.status(200).json(changePass);
  } catch (error) {
    res.status(400).json(error);
  }
})

module.exports = router;
