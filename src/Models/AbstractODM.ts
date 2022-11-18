import { 
  isValidObjectId,
  Model,
  models,
  model,
  Schema,
  UpdateQuery,
} from 'mongoose';
import HttpException from '../Utils/HttpError';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new HttpException(422, 'Invalid mongo id');

    return this.model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new HttpException(422, 'Invalid mongo id');

    return this.model.findOneAndDelete({ _id });
  }
}

export default AbstractODM;
