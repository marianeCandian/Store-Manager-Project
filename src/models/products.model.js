const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM store_manager_db.products',
  );
  return result; 
};

const findById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM store_manager_db.products WHERE id = (?)',
    [id],
  );

  return result;
};

module.exports = {
  findAll,
  findById,
};