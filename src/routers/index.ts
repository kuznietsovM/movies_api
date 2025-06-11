import { Router } from "express";
import userRouter from './user.router'
import movieRouter from './movie.router';

export const api = Router()
api.use('/v1/users', userRouter)
api.use('/v1/movies', movieRouter)