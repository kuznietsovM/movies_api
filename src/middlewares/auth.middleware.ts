import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../utils/errors";
import authService from "../services/auth.service";

export function auth (req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')
  if(!token)
    throw new AuthenticationError('No token provided.')

  try{
    authService.verifyToken(token)
  } catch (e) {
    throw new AuthenticationError('Invalid token provided.')
  }

  next()
}