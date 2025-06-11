import { z } from "zod";

export const IdParamSchema = z.object({
  id: z.preprocess((val) => {
  if (typeof val === "string") {
    return Number.parseInt(val);
  }
  return val;
}, z.number())})