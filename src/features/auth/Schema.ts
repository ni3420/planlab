import {z} from "zod"

export const LoginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})

export const RegisterSchema=z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }).max(100)
})