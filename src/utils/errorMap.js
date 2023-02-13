const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  SEEL_NOT_FOUND: 404,
  PRODUCT_NOT_INSERT: 404,
  NAME_INVALID: 400,
  INVALID_VALUE: 422,
  SEEL_CONFLICT: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};