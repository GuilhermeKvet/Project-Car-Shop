import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const { model, year, color, status, buyValue, category, engineCapacity } = this.req.body;
    const motorcycle: IMotorcycle = {
      model,
      year,
      color,
      status,
      buyValue,
      category,
      engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.create(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async findAllMotorcycles() {
    try {
      const motorcycles = await this.service.findAllMotorcycles();
      return this.res.status(200).json(motorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async findMotorcycleById() {
    const { id } = this.req.params;
    try {
      const motorcycle = await this.service.findMotorcycleById(id);
      return this.res.status(200).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;
    try {
      const updatedMotorcycle = await this.service.update(id, this.req.body);
      return this.res.status(200).json(updatedMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;