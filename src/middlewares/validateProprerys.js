const validateProprerys = (req, res, next) => {
  const sales = req.body;
  const verifyId = sales.every((e) => e.productId);
  const verifyQuantity = sales.every((e) => e.quantity);
  
  if (!verifyId) return res.status(400).json({ message: '"productId" is required' });

  if (!verifyQuantity) return res.status(400).json({ message: '"quantity" is required' });

  next();
};

module.exports = {
  validateProprerys,
};