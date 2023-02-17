const salesService = require('../services/sales.services');

const createSale = async (req, res) => {
  const sales = req.body;
  const newSale = await salesService.insertSales(sales);
  if (newSale.message) return res.status(404).json(newSale);
  return res.status(201).json(newSale);
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