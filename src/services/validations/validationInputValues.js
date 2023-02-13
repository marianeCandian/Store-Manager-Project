// const { nameSchema } = require('./schems');

// const validateName = (name) => {
//   const { error } = nameSchema.validate(name);
//   if (error.value === undefined) {
//     return { type: 'NAME_INVALID', message: '"name" is required' };
//   }
//   if (!error) {
//     return { type: null, meddage: '' };
//   }
//   return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' };
// };

// module.exports = validateName;