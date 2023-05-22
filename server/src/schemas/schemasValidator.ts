import { z } from "zod";

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
  balance: z.any().optional(),
  vetPreference: z.string().optional(),
 })

export const UserSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
  userType: z.any()
})
 

export const QueueSchema = z.object({
  serviceQueue: z.boolean().optional().default(false),
  returnQueue: z.boolean().optional().default(false),
  queueEntry:  z.any().optional(),
  queryType: z.string().optional(),
  vetPreference: z.string().optional(),
})

export const ExamsType = ["lab", "image"]

export const sectorSchema = z.object({
  id: z.number(),
  name: z.string()
})
export const searchSchema = z.object({
  name: z.string(),
  adress: z.string(),
})

export const ExamSchema = z.object({
  name: z.string(),
  examsType: z.string().array(),
  price: z.number(),
  available: z.boolean(),
  applicableGender: z.string().array().optional(),
  subName: z.string().optional(),
  description: z.string().optional(),
  ageRange: z.string().array().optional(),
})



export const GroupSchema = z.object({
  name: z.string()
})

export const ProcedureSchema = z.object({
  name: z.string(),
  price: z.number(),
  applicationInterval: z.string(),
  applicableGender:  z.string().array().optional(), 
  ageRange:  z.string().array().optional(),
  available: z.boolean(),
  observations:  z.string(),
  group_id: z.number(),
  sector_id: z.number()
})