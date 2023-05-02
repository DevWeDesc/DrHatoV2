import { ZodDefault, z } from "zod";

export const CustomerSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  adress: z.string(),
  birthday: z.string(),
  cpf: z.string(),
  phone: z.string(),
  balance: z.any(),
  cep: z.string(),
  pets: z.any(),
  transactions: z.any(),
});

export const createCustomer = z.object({
  name: z.string(),
  adress: z.string(),
  phone: z.string(),
  cpf: z.string(),
  email: z.string().email(),
  birthday: z.string(),
  cep: z.string(),
  balance: z.any().optional()
 })

export const UserSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
  userType: z.any()
})
 