const validateProductId = async (req, res, next) => {
  const sales = req.body;
  sales.forEach((element) => {
    if (!element.productId) {
      return res.status(422).json({ message: 'Product not found' });
    }
  });
  return next();
};

module.exports = validateProductId;