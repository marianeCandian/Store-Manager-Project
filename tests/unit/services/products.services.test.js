const { expect } = require('chai');
const sinon = require('sinon');
const productsServices = require('../../../src/services/products.services');

const productModel = require('../../../src/models/products.model');

const {
   expected,
  product,
} = require('./mocks/products.services.mock');

describe('Verificando service da tabela products', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa dos produtos', async function () {
      sinon.stub(productModel, 'findAll').resolves(expected);
      const result = await productsServices.findAll();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(expected);
    });
  });

  describe('busca de um produto pelo id', function () {
    it('retorna um erro caso oproduto não existe', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      const result = await productsServices.findById(1);
      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
    
    it('retorna o produto caso ID existente', async function () {
      sinon.stub(productModel, 'findById').resolves(product);
      const result = await productsServices.findById(1);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(product);
    });
  });
  afterEach(function () {
     sinon.restore();
   });
});