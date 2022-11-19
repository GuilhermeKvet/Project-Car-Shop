import { describe } from 'mocha';
import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const motorcycleInput: IMotorcycle = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};
const motorcycleOutput: Motorcycle = new Motorcycle(
  { ...motorcycleInput,
    id: '633ec9fa3df977e30e993492',
  },
);

const notFound = 'Motorcycle not found';
const invalidMongoId = 'Invalid mongo id';

const service = new MotorcycleService();

describe('Testando camada Service da rota /motorcycle', () => {
  it('Testando a função para registrar uma nova moto com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(motorcycleOutput);
    const result = await service.create(motorcycleInput);
    expect(result).to.be.deep.equal(motorcycleOutput);
  });
  it('Testando a função que busca todas as motos com sucesso', async function () {
    sinon.stub(Model, 'find').resolves([motorcycleOutput, motorcycleOutput]);
    const result = await service.findAllMotorcycles();
    expect(result).to.be.deep.equal([motorcycleOutput, motorcycleOutput]);
  });
  it('Testando a função que busca uma moto por id com sucesso', async function () {
    sinon.stub(Model, 'findOne').resolves(motorcycleOutput);
    const result = await service.findMotorcycleById('633ec9fa3df977e30e993492');
    expect(result).to.be.deep.equal(motorcycleOutput);
  });
  it('Testando a função que altera uma moto por id com sucesso', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);
    const result = await service.update('633ec9fa3df977e30e993492', motorcycleInput);
    expect(result).to.be.deep.equal(motorcycleOutput);
  });
  it('Testando a função que deleta uma moto por id com sucesso', async function () {
    sinon.stub(Model, 'findOneAndDelete').resolves(motorcycleOutput);
    const result = await service.delete('633ec9fa3df977e30e993492');
    expect(result).to.be.deep.equal(motorcycleOutput);
  });
  it('Testando se ao buscar uma moto com id inexistente retorna um erro', async function () {
    sinon.stub(Model, 'findOne').resolves(null);
    try {
      await service.findMotorcycleById('6348513f34c397abcad040b5');
    } catch (error) {
      expect((error as Error).message).to.be.equal(notFound);
    }
  });
  it('Testando se ao alterar uma moto com id inexistente retorna um erro', async function () {
    sinon.stub(Model, 'findOneAndUpdate').resolves(null);
    try {
      await service.update('6348513f34c397abcad040b5', motorcycleInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal(notFound);
    }
  });
  it('Testando se ao deletar uma moto com id inexistente retorna um erro', async function () {
    sinon.stub(Model, 'findOneAndDelete').resolves(null);
    try {
      await service.delete('6348513f34c397abcad040b5');
    } catch (error) {
      expect((error as Error).message).to.be.equal(notFound);
    }
  });
  it('Testando se ao buscar uma moto com id invalido retorna um erro', async function () {
    try {
      await service.findMotorcycleById('Id_invalido');
    } catch (error) {
      expect((error as Error).message).to.be.equal(invalidMongoId);
    }
  });
  it('Testando se ao modificar uma moto com id invalido retorna um erro', async function () {
    try {
      await service.update('Id_invalido', motorcycleInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal(invalidMongoId);
    }
  });
  it('Testando se ao deletar uma moto com id invalido retorna um erro', async function () {
    try {
      await service.delete('Id_invalido');
    } catch (error) {
      expect((error as Error).message).to.be.equal(invalidMongoId);
    }
  });
  afterEach(function () { return sinon.restore(); });
});