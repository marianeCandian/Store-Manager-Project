const productsService = require('../services/products.services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const products = await productsService.findAll();
  res.status(200).json(products.message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.insert(name);
  if (type) return res.status(errorMap.mapError(type)).json(message);
  return res.status(201).json(message);
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
};