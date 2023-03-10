import { isValidObjectId, Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import HttpException from '../Utils/HttpError';
import AbstractODM from './AbstractODM';

class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super(schema, 'Cars');
  }

  public async findAll(): Promise<ICar[]> {
    return this.model.find();
  }

  public async findById(_id: string): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw new HttpException(422, 'Invalid mongo id');
    return this.model.findOne({ _id });
  }
}

export default CarODM;