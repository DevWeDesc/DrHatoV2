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


export const petSchema = z.object({
  name: z.string(),
  especie: z.string(),
  sexo: z.string(),
  race: z.string(),
  weigth: z.string().optional(),
  haveChip: z.boolean().optional(),
  isCastred: z.boolean().optional(),
  corPet: z.string(),
  sizePet: z.string(),
  bornDate: z.string(),
  observations: z.string().optional(),
  rga: z.number().optional(),
})

export const createCustomer = z.object({
  name: z.string(),
  adress: z.string(),
  district: z.string().optional(),
  phone: z.string(),
  tell: z.string().optional(),
  cpf: z.string(),
  rg: z.string().optional(),
  email: z.string().email(),
  birthday: z.string(),
  cep: z.string(),
  balance: z.number().optional(),
  vetPreference: z.string().optional(),
  howKnowUs: z.string().optional(),
  kindPerson: z.string().optional(),
  state: z.string().optional(),
  neighbour: z.string().optional()

 })

export const UserSchema = z.object({
  name: z.string(),
  username: z.string(),
  password: z.string(),
  userType: z.any(),
  userIsVet: z.boolean().optional(),
  crmv: z.number().optional()
})
 
export const AdmissionSchema = z.object({
  name: z.string(),
  totalBeds: z.number(),
})

export const BedSchema = z.object({
  petId: z.number(),
  isBusy: z.boolean(),
  mustFasting: z.boolean().optional(),
  kennelId: z.number(),
  bedId: z.number(),
})

export const QueueSchema = z.object({
  vetPreference: z.string().optional(),
  queueEntry:  z.string().optional(),
  queueOur: z.string().optional(),
  moreInfos: z.string().optional(),
  queryType: z.string().optional(),
  petIsInQueue: z.boolean().optional()
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
  doneExame: z.boolean().optional().default(false)
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