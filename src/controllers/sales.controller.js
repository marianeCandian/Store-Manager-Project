const salesService = require('../services/sales.services');
const errorMap = require('../utils/errorMap');

const createSale = async (req, res) => {
  const { id, itemSold } = req.body;
  const { type, message } = await salesService.insertSales({ id, itemSold });
  if (type) return res.status(errorMap.mapError(type)).json(message);
  return res.status(201).json(message);
};

module.exports = {
  createSale,
};