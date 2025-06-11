import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";
import { FormatError } from "../utils/errors";

export function auth (req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')
  if(!token)
    throw new FormatError('token')

  try{
    authService.verifyToken(token)
  } catch (e) {
    throw new FormatError('token')
  }

  next()
}