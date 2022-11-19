import { describe } from 'mocha';
import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

const carInput: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.990,
  doorsQty: 4,
  seatsQty: 5,
};
const carOutput: Car = new Car({ ...carInput, id: '633ec9fa3df977e30e993492' });

const notFound = 'Car not found';
const invalidMongoId = 'Invalid mongo id';

const service = new CarService();

describe('Testando camada Service da rota /cars', () => {
  it('Testando a função para registrar um novo carro com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(carOutput);
    const result = await service.create(carInput);
    expect(result).to.be.deep.equal(carOutput);
  });
  it('Testando a função que busca todos os carros com sucesso', async function () {
    sinon.stub(Model, 'find').resolves([carOutput, carOutput]);
    const result = await service.findAllCars();
    expect(result).to.be.deep.equal([carOutput, carOutput]);
  });
  it('Testando a função que busca um carro por id com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(carOutput);
    const result = await service.findCarById('633ec9fa3df977e30e993492');
    expect(result).to.be.deep.equal(carOutput);
  });
  it('Testando a função que altera um carro por id com sucesso', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);
    const result = await service.update('633ec9fa3df977e30e993492', carInput);
    expect(result).to.be.deep.equal(carOutput);
  });
  it('Testando a função que deleta um carro por id com sucesso', async function () {
    sinon.stub(Model, 'findOneAndDelete').resolves(carOutput);
    const result = await service.delete('633ec9fa3df977e30e993492');
    expect(result).to.be.deep.equal(carOutput);
  });
  it('Testando se ao buscar um carro com id inexistente retorna um erro', async function () {
    sinon.stub(Model, 'findOne').resolves(null);
    try {
      await service.findCarById('6348513f34c397abcad040b5');
    } catch (error) {
      expect((error as Error).message).to.be.equal(notFound);
    }
  });
  it('Testando se ao alterar um carro com id inexistente retorna um erro', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves(null);
    try {
      await service.update('6348513f34c397abcad040b5', carInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal(notFound);
    }
  });
  it('Testando se ao deletar um carro com id inexistente retorna um erro', async function () {
    sinon.stub(Model, 'findOneAndDelete').resolves(null);
    try {
      await service.delete('6348513f34c397abcad040b5');
    } catch (error) {
      expect((error as Error).message).to.be.equal(notFound);
    }
  });
  it('Testando se ao buscar um carro com id invalido retorna um erro', async function () {
    try {
      await service.findCarById('Id_invalido');
    } catch (error) {
      expect((error as Error).message).to.be.equal(invalidMongoId);
    }
  });
  it('Testando se ao modificar um carro com id invalido retorna um erro', async function () {
    try {
      await service.update('Id_invalido', carInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal(invalidMongoId);
    }
  });
  it('Testando se ao deletar um carro com id invalido retorna um erro', async function () {
    try {
      await service.delete('Id_invalido');
    } catch (error) {
      expect((error as Error).message).to.be.equal(invalidMongoId);
    }
  });
  afterEach(function () { return sinon.restore(); });
});