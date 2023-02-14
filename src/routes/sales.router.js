const express = require('express');
const salesController = require('../controllers/sales.controller');
// const validateProprerys = require('../middlewares/validateProprerys');
const validateValuesQuantity = require('../middlewares/validateValuesQuantity');
const validateProductId = require('../middlewares/validateProductId');

const router = express.Router();

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSaleById);

router.post('/',
  validateValuesQuantity,
  // validateProprerys,
  validateProductId,
  salesController.createSale);

module.exports = router;