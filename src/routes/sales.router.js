const express = require('express');
const salesController = require('../controllers/sales.controller');
const { validateProductId,
  validateQuantity, validateRequired } = require('../middlewares/validateSales');

const router = express.Router();

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSaleById);

router.post('/', validateProductId, validateQuantity, validateRequired, salesController.createSale);

module.exports = router;