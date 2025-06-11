import { z } from "zod";
import { MovieFormat } from "../models/movie.model";

export const CreateMovieSchema = z.object({
  title: z.string(),
  year: z.number(),
  format: z.nativeEnum(MovieFormat),
  actors: z.array(z.string()).optional()
})

export type CreateMovie = z.infer<typeof CreateMovieSchema>