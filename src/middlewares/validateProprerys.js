const validateProprerys = (req, res, next) => {
  const sales = req.body;
  for (let i = 0; i < sales.length; i += 1) {
    if (!sales[i].quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  }

  return next();
};

module.exports = {
  validateProprerys,
};