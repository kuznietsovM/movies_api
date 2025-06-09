import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { CreateUser } from "../schemas/create-user.schema";

class UserController {
  async create(req: Request<{}, {}, CreateUser>, res: Response, next: NextFunction) {

    const userData = req.body
    
    try{
      const user = await User.create(userData)

      res.status(200).json(user)
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController();