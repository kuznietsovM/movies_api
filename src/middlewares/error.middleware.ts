import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    if(err instanceof ApiError) {
        res.status(err.statusCode).json(err.toResponse())
        return
    }

    console.error(err);
    res.status(500).json({status: 0, message: "Internal server error"})
}