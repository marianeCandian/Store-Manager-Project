const salesModel = require('../models/sales.models');
const productsModel = require('../models/products.model');

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
  const newSales = await Promise.all(sales.map(async (e) => productsModel
    .findById(e.productId)));
    
  const verifySale = newSales.every((e) => e);
  
  if (!verifySale) return { type: 404, message: 'Product not found' };
  
  const id = await salesModel.getSaleById();
  console.log(sales);

  const getNewSale = await Promise.all(sales
    .map(async (e) => salesModel.insertSales(id, e.productId, e.quantity)));

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
  findById,
  findAll,
  insertSales,
  getAllSales,
  getSaleById,
};