import { isValidObjectId, Schema } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import HttpException from '../Utils/HttpError';
import AbstractODM from './AbstractODM';

class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    super(schema, 'Motorcycle');
  }

  public async findAll(): Promise<IMotorcycle[]> {
    return this.model.find();
  }

  public async findById(_id: string): Promise<IMotorcycle | null> {
    if (!isValidObjectId(_id)) throw new HttpException(422, 'Invalid mongo id');
    return this.model.findOne({ _id });
  }
}

export default MotorcycleODM;