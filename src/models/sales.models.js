const camelize = require('camelize');
const connection = require('./connection');

const getSalesId = async () => {
  const [{ id }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );

  return id;
};

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales',
  );
  return result;
};

const insertSales = async (id, productId, quantity) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [id, productId, quantity],
  );

  return { id, itemSold: { productId, quantity } };
};

const getAllSales = async () => {
   const [allSales] = await connection.execute(
    `SELECT SP.sale_id,
      S.date,
      SP.product_id,
      SP.quantity 
    FROM StoreManager.sales_products AS SP
    JOIN StoreManager.sales AS S
    ON SP.sale_id = S.id
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
  findAll,
  insertSales,
  getSalesId,
  getAllSales,
  getSaleById,
};