import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ValidationError } from "../utils/errors";

export function validate<T>(schema: z.ZodSchema<T>, dataType: 'body' | 'query' | 'params') {
  return function (req: Request, res: Response, next: NextFunction) {
    const result = schema.safeParse(req[dataType])

    if(!result.success)
      throw new ValidationError(result.error)

    next()
  }
}