const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsServices = require('../../../src/services/products.services');
const productsCotroller = require('../../../src/controllers/products.controller');

const { expedted, newName } = require('./mocks/products.controller.mock');

describe('Teste de unidade do productsController', function () {
  describe('Listando os produtos', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'findAll')
        .resolves({ type: null, message: expedted });

      // act
      await productsCotroller.listProducts(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expedted);
    });

    it('deve responder com 200 e os dados do banco quando existir', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'findById')
        .resolves({ type: null, message: expedted });

      // Act
      await productsCotroller.getProduct(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(expedted);
    });

    it('Retorna um erro caso o id do produto não exista', async function () {
      const res = {};
      const req = {
        params: { id: 10 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(productsServices, 'findById').resolves({ type: 404, message: 'Product not found' });

      await productsCotroller.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  describe('Verifica rota de atualizar um produto', function () {
    // it('Faz a atualização de um produto pelo id', async function () {
    //   const res = {};
    //   const req = { params: { id: 1 }, body: newName };

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   sinon.stub(productsServices, 'updateById').resolves({ id: 1, name: 'Machado do Thor Stormbreaker' });
    //   sinon.stub(productsServices, 'findById').resolves([{ id: 1, name: 'Martelo de Thor' }]);

    //   await productsCotroller.updateById(req, res);

    //   expect(res.status).to.have.been.calledWith(200);
    //   expect(res.json).to.have.been.calledWith({ id: 1, name: 'Machado do Thor Stormbreaker' });
    // });

    // it('Testa fazer a atualização de uma pessoa pelo id sem sucesso', async function () {
    //   const res = {};
    //   const req = { params: { id: 999 }, body: newName };

    // res.status = sinon.stub().returns(res);
    // res.json = sinon.stub().returns();

    //   sinon.stub(productsServices, 'updateById').resolves({ id: 1, name: 'Martelo de Thor' });
    //   sinon.stub(productsServices, 'findById').resolves({ type: 404, message: 'Product not found' });

    // await productsCotroller.updateById(req, res);

    // expect(res.status).to.have.been.calledWith(404);
    // expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    // });
  });

    describe('Testa a camada controller para a função "deleteProduct"', function () {
    // it('Faz a remoção de uma pessoa através do id', async function () {
    //   const req = { params: { id: 2 } };
    //   const res = {};

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   sinon.stub(productsServices, 'delleteById').resolves({ type: null, message: '' });

    //   await productsCotroller.deleteProduct(req, res);

    //   expect(res.status).to.have.been.calledWith(204);
    //   expect(res.json).to.have.been.calledWith({ message: '' });
    // });

    it('Recebe erro com o id a ser removido não existe', async function () {
      const req = { params: { id: 999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'delleteById').resolves({ type: 404, message: 'Product not found' });

      await productsCotroller.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});
