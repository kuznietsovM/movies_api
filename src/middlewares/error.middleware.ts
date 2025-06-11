import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/errors";

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    if(err instanceof HttpError) {
        res.status(err.statusCode).json(err.responseBody())
        return
    }

    console.error(err);
    res.status(500).json({status: 0, message: "Internal server error"})
}