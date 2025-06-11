import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
  confirmPassword: z.string()
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