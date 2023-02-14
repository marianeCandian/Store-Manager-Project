const camelize = require('camelize');
const connection = require('./connection');

const getSalesId = async () => {
  const [{ id }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );

  return id;
};

const insertSales = async ({ id, sale }) => {
  sale.forEach((element) => connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, element.productId, element.quantity],
  ));

  return { id, itemSold: sale };
};

const getAllSales = async () => {
   const [allSales] = await connection.execute(
    `SELECT StoreManager.sales_products.sale_id,
      StoreManager.sales.date,
      StoreManager.sales_products.product_id,
      StoreManager.sales_products.quantity
    FROM StoreManager.sales_products
    JOIN StoreManager.sales
    ON StoreManager.sales_products.sale_id = sales.id
    ORDER BY
      sale_id ASC,
      product_id ASC`,
  );

  return camelize(allSales);
};

const getSaleById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id, quantity
    FROM StoreManager.sales_products
    JOIN StoreManager.sales
    ON id = StoreManager.sales_products.sale_id
    WHERE id = ?
    ORDER BY product_id`,
    [id],
  );

  return camelize(sale);
};

module.exports = {
  insertSales,
  getSalesId,
  getAllSales,
  getSaleById,
};