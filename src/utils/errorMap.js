const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  PRODUCT_NOT_INSERT: 404,
  NAME_INVALID: 400,
  PASSENGER_NOT_FOUND: 404,
  MISSING_VALUE: 400,
  OUTSIDE_VALUE: 422,
  NOTFOUND_PRODUCT: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};