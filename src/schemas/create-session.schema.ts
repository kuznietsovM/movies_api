import { z } from "zod";

export const CreateSessionSchema = z.object({
  email: z.string().trim().email().max(64),
  password: z.string().trim().min(8)
});

export type CreateSession = z.infer<typeof CreateSessionSchema>