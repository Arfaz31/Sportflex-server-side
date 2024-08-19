import { AnyZodObject } from 'zod';

import { NextFunction, Request, Response } from 'express';
import catchAsync from '../Utils/catchAsync';

const validateRequest = (Schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await Schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default validateRequest;
