const validateValuesQuantity = async (req, res, next) => {
  const sales = req.body;
  sales.forEach((element) => {
    if (element.quantity.length <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
  });
  return next();
};

module.exports = validateValuesQuantity;