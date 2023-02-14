// const camelize = require('camelize');
const connection = require('./connection');

const insertSales = async ({ date, id, sale }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)',
    [date],
  );
  sale.forEach((element) => connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, element.productId, element.quantity],
));

  return { id, itemSold: sale };
};

module.exports = {
  insertSales,
};