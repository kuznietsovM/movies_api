import { z } from "zod";

export const FindMovieParamsSchema = z.object({
  actor: z.string().optional(),
  title: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(['id', 'title' , 'year']).default('id'),
  order: z.enum(['ASC', 'DESC']).default('ASC'),
  limit: z.preprocess((val) => {
    if (typeof val === "string") {
      return Number.parseInt(val);
    }
    return val;
  }, z.number().int().max(50).min(1).default(10)),
  offset: z.preprocess((val) => {
    if (typeof val === "string") {
      return Number.parseInt(val);
    }
    return val;
  }, z.number().int().min(0).default(0))
})

export type FindMovieParams = z.infer<typeof FindMovieParamsSchema>;