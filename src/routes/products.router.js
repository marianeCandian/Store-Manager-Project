const express = require('express');
const productController = require('../controllers/products.controller');
const { validateName } = require('../middlewares/validateName');

const router = express.Router();

router.get('/:id', productController.getProduct);

router.get('/', productController.listProducts);

router.post('/', validateName, productController.createProduct);

router.put('/:id', validateName, productController.updateById);

module.exports = router;