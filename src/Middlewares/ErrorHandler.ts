import { NextFunction, Request, Response } from 'express';
import HttpException from '../Utils/HttpError';

class ErrorHandler {
  public static handle(
    error: HttpException,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    res.status(error.statusCode).json({ message: error.message });
    next();
  }
}

export default ErrorHandler;