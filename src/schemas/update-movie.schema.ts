import { z } from "zod";
import { CreateMovieSchema } from "./create-movie.schema";

export const UpdateMovieSchema = CreateMovieSchema.partial()

export type UpdateMovie = z.infer<typeof UpdateMovieSchema>