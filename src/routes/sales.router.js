const express = require('express');
const salesController = require('../controllers/sales.controller');
const { validateProductId, validateQuantity } = require('../middlewares/validateSales');

const router = express.Router();

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSaleById);

router.post('/', validateProductId, validateQuantity, salesController.createSale);

module.exports = router;