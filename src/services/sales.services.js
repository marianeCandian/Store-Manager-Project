const salesModel = require('../models/sales.models');
// const productsModel = require('../models/products.model');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { type: null, message: sales };
};

const findById = async (id) => {
  const salesId = await salesModel.getSaleById(id);

  if (!salesId || !salesId.length) {
    return { type: 404, message: 'Sale not found' };
  }
  return salesId;
};

const insertSales = async (sales) => {
  const id = await salesModel.getSalesId();

  await Promise.all(sales
    .map((sale) => salesModel.insertSales(id, sale.productId, sale.quantity)));

  return { id, itemsSold: sales };
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
  findById,
  findAll,
  insertSales,
  getAllSales,
  getSaleById,
};