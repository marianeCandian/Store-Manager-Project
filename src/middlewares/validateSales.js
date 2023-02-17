const productsModel = require('../models/products.model');

const validateProductId = (req, res, next) => {
  const { body } = req;

  const productRequired = body.some((e) => !e.productId);

  if (productRequired) return res.status(400).json({ message: '"productId" is required' });

  return next();
};

const validateQuantity = (req, res, next) => {
  const { body } = req;

  const validateRequired = body.some((e) => !e.quantity);

  const quantity = body.some((e) => e.quantity <= 0);

  if (quantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  if (validateRequired) return res.status(400).json({ message: '"quantity" is required' });

  return next();
};

const validateRequired = async (req, res, next) => {
  const sales = req.body;

   const newSales = await Promise.all(sales.map(async (e) => productsModel
    .findById(e.productId)));
    
  const verifySale = newSales.every((e) => e);
  
  if (!verifySale) return res.status(404).json({ message: 'Product not found' });

  return next();
};

module.exports = {
  validateQuantity,
  validateProductId,
  validateRequired,
};