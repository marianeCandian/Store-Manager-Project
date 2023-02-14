const salesService = require('../services/sales.services');

const createSale = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.insertSales(sales);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const getAllSales = async (_req, res) => {
  const result = await salesService.getAllSales();
  return res.status(200).json(result.message);
};

const getSaleById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await salesService.getSaleById(id);

    if (type) return res.status(type).json({ message });

    return res.status(200).json(message);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};