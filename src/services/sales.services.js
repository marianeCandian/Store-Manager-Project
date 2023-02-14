const salesModel = require('../models/sales.models');
const productModel = require('../models/products.model');

const validation = async (id) => {
  const result = await productModel.findById(id);
  if (!result) return { type: 404, message: 'Product not found' };

  return { type: null, message: '' };
};

const insertSales = async (sales) => {
  const verifyProduct = await Promise.all(sales.map((sale) => validation(sale.productId)));

  const veriry = verifyProduct
    .find((error) => error.type !== null);
  
  if (veriry !== undefined) return veriry;

  const id = salesModel.getSalesId();
  const getNewSale = await salesModel.insertSales({ id, sales });

  return { type: null, message: getNewSale };
};

const getAllSales = async () => {
  const result = await salesModel.getAllSales();
  return { type: null, message: result };
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);

  if (sale.length === 0) return { type: 404, message: 'Sale not found' };
  return { type: null, message: sale };
};

module.exports = {
  insertSales,
  getAllSales,
  getSaleById,
};