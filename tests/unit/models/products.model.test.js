const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');
const { expected } = require('./mocks/products.model.mock');

describe('Testes de unidade do model de produtos da tabela products', function () {
  it('Recuperando a lista de produtos cadastrados', async function () {
    sinon.stub(connection, 'execute').resolves([expected]);
    const result = await productModel.findAll();
    expect(result).to.be.deep.equal(expected);
  });

  it('Recuperando um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[expected[0]]]);
    const result = await productModel.findById(1);
    expect(result).to.be.deep.equal(expected[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});

