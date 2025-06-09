import { Router } from "express";
import userController from "../controllers/user.controller";
import { validate } from "../middlewares/validation.middleware";
import { CreateUserSchema } from "../schemas/create-user.schema";

const router = Router();

router.post('/', 
  validate(CreateUserSchema, 'body'), 
  userController.create)

export default router;