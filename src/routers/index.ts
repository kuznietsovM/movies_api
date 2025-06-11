import { Router } from "express";
import userRouter from './user.router'
import movieRouter from './movie.router';
import sessionRouter from './session.router';

export const api = Router()
api.use('/v1/users', userRouter)
api. use('/v1/sessions', sessionRouter)
api.use('/v1/movies', movieRouter)