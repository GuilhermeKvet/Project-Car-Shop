import { isValidObjectId, model, Model, models, Schema, UpdateQuery } from 'mongoose';
import ICar from '../Interfaces/ICar';
import HttpException from '../Utils/HttpError';

class CarODM {
  private schema: Schema;
  private model: Model<ICar>;
  
  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Cars || model('Cars', this.schema);
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async findAll(): Promise<ICar[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<ICar | null> {
    if (!isValidObjectId(id)) throw new HttpException(422, 'Invalid mongo id');
    return this.model.findOne({ _id: id });
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw new HttpException(422, 'Invalid mongo id');
    return this.model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<ICar>,
      { new: true },
    );
  }
}

export default CarODM;