import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { CreateMovieSchema } from "../schemas/create-movie.schema";
import movieController from "../controllers/movie.controller";
import { IdParamSchema } from "../schemas/movie-param.schema";
import { UpdateMovieSchema } from "../schemas/update-movie.schema";
import { FindMovieParamsSchema } from "../schemas/find-movie-params.schema";
import { auth } from "../middlewares/auth.middleware";
import { upload } from "../utils/upload";

const router = Router();

router.use(auth)

router.post('/import', 
  upload.single('movies'),
  movieController.import
)

router.post('/', 
  validate(CreateMovieSchema, 'body'),
  movieController.create
)

router.delete('/:id',
  validate(IdParamSchema, 'params'),
  movieController.delete
)

router.get('/:id',
  validate(IdParamSchema, 'params'),
  movieController.get
)

router.patch('/:id',
  validate(IdParamSchema, 'params'),
  validate(UpdateMovieSchema, 'body'),
  movieController.update
)

router.get('/', 
  validate(FindMovieParamsSchema, 'query'),
  movieController.find
)

export default router;