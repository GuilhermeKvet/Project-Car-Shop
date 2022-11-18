import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(obj: ICar) {
    super(obj);
    this.doorsQty = obj.doorsQty;
    this.seatsQty = obj.seatsQty;
  }

  public setSeatsQty(value: number) {
    this.seatsQty = value;
  }

  public getSeatsQty() {
    return this.seatsQty;
  }

  public setDoorsQty(value: number) {
    this.doorsQty = value;
  }

  public getDoorsQty() {
    return this.doorsQty;
  }
}

export default Car;