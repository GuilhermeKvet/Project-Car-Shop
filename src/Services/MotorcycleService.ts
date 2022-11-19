import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcyclesODM';
import HttpException from '../Utils/HttpError';

const notFound = 'Motorcycle not found';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle): Motorcycle {
    return new Motorcycle(motorcycle);
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async findAllMotorcycles() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.findAll();
    const motorcycleArray = motorcycles.map(
      (motorcycle) => this.createMotorcycleDomain(motorcycle),
    );
    return motorcycleArray;
  }

  public async findMotorcycleById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findById(id);
    if (!motorcycle) throw new HttpException(404, notFound);
    return this.createMotorcycleDomain(motorcycle);
  }

  public async update(id: string, obj: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycleUpdated = await motorcycleODM.update(id, obj);
    if (!motorcycleUpdated) throw new HttpException(404, notFound);
    return this.createMotorcycleDomain(motorcycleUpdated);
  }

  public async delete(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycleDeleted = await motorcycleODM.delete(id);
    if (!motorcycleDeleted) throw new HttpException(404, notFound);
    return motorcycleDeleted;
  }
}

export default MotorcycleService;