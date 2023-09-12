const express = require('express');
const billService = require('../controllers/bills')
const router = express.Router();


// http:localhost:3000/bills/:idUser
router.get('/:idUser', async (req, res, next) => {
    try {
        const { idUser } = req.params;
        const fetchBill = await billService.getBills(idUser);
        res.status(200).json(fetchBill);
    } catch (error) {
        res.status(400).json(error);
    }
})

// http:localhost:3000/bills/detail/:idBill
router.get('/detail/:idBill', async (req, res, next) => {
    try {
        const { idBill } = req.params;
        const fetchBill = await billService.getBillDetail(idBill);
        res.status(200).json(fetchBill);
    } catch (error) {
        res.status(400).json(error);
    }
})

// http:localhost:3000/bills/add
router.post('/add', async (req, res, next) => {
    try {
        const { idUser, billItem, address, payment, phone, name } = req.body;
        const addBill = await billService.addBill(idUser, billItem, address, payment, phone, name);
        res.status(200).json(addBill);
    } catch (error) {
        res.status(400).json(error);
    }
})
// http:localhost:3000/bills/cancel/:idBill
router.post('/cancel/:idBill', async (req, res, next) => {
    try {
        const idBill = req.params.idBill;
        const cannelBill = await billService.cannelBill(idBill);
        res.status(200).json(cannelBill);
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;
