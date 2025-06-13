import { z } from "zod";
import { MovieFormat } from "../models/movie.model";

export const CreateMovieSchema = z.object({
  title: z.string().trim().min(2).max(128),
  year: z.number().min(1850).max(2025),
  format: z.nativeEnum(MovieFormat),
  actors: z.array(
    z.string().trim().min(2).max(64).regex(/^[a-zA-Z\s,.\-]+$/, "Can contain only letters and special characters like - , .")
  ).max(16)
})

export type CreateMovie = z.infer<typeof CreateMovieSchema>