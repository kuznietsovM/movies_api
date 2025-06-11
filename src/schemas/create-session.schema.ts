import { z } from "zod";

export const CreateSessionSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export type CreateSession = z.infer<typeof CreateSessionSchema>