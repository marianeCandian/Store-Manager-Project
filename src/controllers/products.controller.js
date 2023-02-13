const productsService = require('../services/products.services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const products = await productsService.findAll();
  res.status(200).json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(errorMap.mapErrror(type).json(message));
  return res.status(200).json(message);
};

module.exports = {
  listProducts,
  getProduct,
};