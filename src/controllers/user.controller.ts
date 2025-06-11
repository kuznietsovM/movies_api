import { Request, Response, NextFunction } from "express";
import { CreateUser } from "../schemas/create-user.schema";
import authService from "../services/auth.service";
import userService from "../services/user.service";

class UserController {
  async create(req: Request<{}, {}, CreateUser>, res: Response, next: NextFunction) {

    const userData = req.body
    
    try{
      const user = await userService.create(userData)
      const token = authService.generateToken(user.id.toString())
      
      res.status(200).json({ token, status: 1 })
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController();