import { z } from "zod";
import { MovieFormat } from "../models/movie.model";

export const CreateMovieSchema = z.object({
  title: z.string().min(2).max(128),
  year: z.number().min(1895).max(2030),
  format: z.nativeEnum(MovieFormat),
  actors: z.array(z.string().min(2).max(64)).max(16)
})

export type CreateMovie = z.infer<typeof CreateMovieSchema>