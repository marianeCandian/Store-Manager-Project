const productsModel = require('../models/products.model');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const insert = async (product) => {
  const newProductId = await productsModel.insert(product);
  const getNewProduct = await productsModel.findById(newProductId);

  if (getNewProduct.length === 0) {
    return { type: 'PRODUCT_NOT_INSERT', message: 'Product not insert' };
  }
  return { type: null, message: getNewProduct };
};

const updateById = async (id, name) => {
  const hasProduct = await productsModel.findById(id);

  if (!hasProduct) return { type: 404, message: 'Product not found' };

  await productsModel.updateById(id, name);
  return { type: null, message: hasProduct };
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
};