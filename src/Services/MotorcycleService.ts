import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcyclesODM';
import HttpException from '../Utils/HttpError';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    try {
      const newMotorcycle = await motorcycleODM.create(motorcycle);
      return this.createMotorcycleDomain(newMotorcycle);
    } catch (error) {
      throw new HttpException(404, 'Not Found');
    }
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
    if (!motorcycle) throw new HttpException(404, 'Motorcycle not found');
    return this.createMotorcycleDomain(motorcycle);
  }

  public async update(id: string, obj: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycleUpdated = await motorcycleODM.update(id, obj);
    if (!motorcycleUpdated) throw new HttpException(404, 'Motorcycle not found');
    return this.createMotorcycleDomain(motorcycleUpdated);
  }
}

export default MotorcycleService;