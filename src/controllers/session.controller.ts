import { NextFunction, Request, Response } from "express";
import { CreateSession } from "../schemas/create-session.schema";
import sessionService from "../services/session.service";

class SessionController {
  async create (req: Request<{}, {}, CreateSession>, res: Response, next: NextFunction) {
    const sessionData = req.body

    try {
      const token = await sessionService.create(sessionData)
      res.status(200).json({ token, status: 1 })
    } catch(e) {
      next(e)
    }
  }
}

export default new SessionController()