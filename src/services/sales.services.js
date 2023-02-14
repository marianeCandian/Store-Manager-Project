const salesModel = require('../models/sales.models');

const insertSales = async (sales) => {
  const id = salesModel.getSalesId();
  const getNewSale = await Promise.all(sales
    .map(
      async (sale) => salesModel
        .insertSales({ id, sale }),
  ));

  return { type: null, message: getNewSale };
};

module.exports = {
  insertSales,
};