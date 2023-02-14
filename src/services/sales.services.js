const salesModel = require('../models/sales.models');

const insertSales = async ({ id, itemSold }) => {
  const date = Date.now();
  const getNewSale = await Promise.all(itemSold
    .map(
      async (sale) => salesModel
        .insertSales({ date, id, sale }),
));

  return { type: null, message: getNewSale };
};

module.exports = {
  insertSales,
};