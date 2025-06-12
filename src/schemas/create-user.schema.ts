import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email().max(64),
  name: z.string().min(2).max(64),
  password: z.string().min(8).max(32),
  confirmPassword: z.string().min(8).max(32)
})
.superRefine((data, ctx) => {
  if(data.password !== data.confirmPassword)
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match",
      path: ['confirmPassword'],
    })
})

export type CreateUser = Omit<z.infer<typeof CreateUserSchema>, 'confirmPassword'>