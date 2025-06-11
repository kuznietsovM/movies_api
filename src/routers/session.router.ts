import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { CreateSessionSchema } from "../schemas/create-session.schema";
import sessionController from "../controllers/session.controller";

const router = Router();

router.post('/', 
  validate(CreateSessionSchema, 'body'),
  sessionController.create
)

export default router;