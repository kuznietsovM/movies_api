import { Router } from "express";
import userRouter from './user.router'

export const api = Router()
api.use('/v1/users', userRouter)