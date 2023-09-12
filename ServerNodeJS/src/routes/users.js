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
    const { password, oldpass } = req.body;
    const changePass = await userController.changePasword(idUser, oldpass, password);
    res.status(200).json(changePass);
  } catch (error) {
    res.status(400).json(error);
  }
})


// http:localhost:3000/users/address/:idUser
router.post('/address/:idUser', async (req, res, next) => {
  try {
    const idUser = req.params.idUser;
    const { name, phone, address, detailAddress } = req.body;
    const result = await userController.addAddress(idUser, name, phone, address, detailAddress);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
})


// http:localhost:3000/users/editaddress/:idUser
router.post('/editaddress/:idUser/:idAddress', async (req, res, next) => {
  try {
    const { idUser, idAddress } = req.params;
    const { name, phone, address, detailAddress } = req.body;
    const result = await userController.editAddress(idUser, idAddress, name, phone, address, detailAddress);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
})


// http:localhost:3000/users/removeaddress/:idUser
router.post('/removeaddress/:idUser/:idAddress', async (req, res, next) => {
  try {
    const { idUser, idAddress } = req.params;
    const result = await userController.removeAddress(idUser, idAddress);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
})


// http:localhost:3000/users/getaddress/:idUser
router.get('/getaddress/:idUser', async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const result = await userController.getAddress(idUser);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
})

// http:localhost:3000/users/getaddress/:idUser/:idAddress
router.get('/getdetailaddress/:idUser/:idAddress', async (req, res, next) => {
  try {
    const { idUser, idAddress } = req.params;
    const result = await userController.getDetailAddress(idUser, idAddress);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
})
module.exports = router;
