import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import HttpException from '../Utils/HttpError';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    try {
      const newCar = await carODM.create(car);
      return this.createCarDomain(newCar);
    } catch (error) {
      throw new HttpException(404, 'Not Found');
    }
  }

  public async findAllCars() {
    const carODM = new CarODM();
    const cars = await carODM.findAll();
    const carsArray = cars.map((car) => this.createCarDomain(car));
    return carsArray;
  }

  public async findCarById(id: string) {
    const carODM = new CarODM();
    const car = await carODM.findById(id);
    if (!car) throw new HttpException(404, 'Car not found');
    return this.createCarDomain(car);
  }

  public async update(id: string, obj: ICar) {
    const carODM = new CarODM();
    const carUpdated = await carODM.update(id, obj);
    if (!carUpdated) throw new HttpException(404, 'Car not found');
    return this.createCarDomain(carUpdated);
  }
}

export default CarService;