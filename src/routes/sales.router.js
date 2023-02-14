const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateProprerys = require('../middlewares/validateProprerys');
const validateValuesQuantity = require('../middlewares/validateValuesQuantity');
const validateProductId = require('../middlewares/validateProductId');

const router = express.Router();

router.post('/',
  validateProprerys,
  validateValuesQuantity,
  validateProductId,
  salesController.createSale);

module.exports = router;