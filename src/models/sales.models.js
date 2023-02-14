// const camelize = require('camelize');
const connection = require('./connection');

const getSalesId = async () => {
  const [{ id }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );

  return id;
};

const insertSales = async ({ id, sale }) => {
  await Promise.all((sale.forEach((element) => connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, element.productId, element.quantity],
  ))));

  return { id, itemSold: sale };
};

module.exports = {
  insertSales,
  getSalesId,
};