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
  weigth: z.number().optional(),
  haveChip: z.boolean().optional(),
  isCastred: z.boolean().optional(),
  corPet: z.string(),
  sizePet: z.string(),
  bornDate: z.string(),
  observations: z.string().optional(),
  rga: z.number().optional(),
});

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
  neighbour: z.string().optional(),
});
export const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  username: z.string(),
  password: z.string(),
  userType: z.any(),
  userIsVet: z.boolean().optional(),
  crmv: z.string().optional(),
  role: z
    .enum([
      "MASTER",
      "ADMIN",
      "MANAGER",
      "VETERINARIAN",
      "LABORATORY",
      "RECEPTIONIST",
      "UNDEFINED",
    ])
    .optional(),
});

export const VaccineSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
});

export const AdmissionSchema = z.object({
  name: z.string(),
  totalBeds: z.number(),
  price: z.number().optional(),
  description: z.string().optional(),
});

export const BedSchema = z.object({
  petId: z.number(),
  isBusy: z.boolean(),
  mustFasting: z.boolean().optional(),
  kennelId: z.number(),
  bedId: z.number(),
  entryOur: z.date().optional(),
  dailyRate: z.number().optional(),
  recordId: z.number(),
});

export const QueueSchema = z.object({
  vetPreference: z.string().optional(),
  queueEntry: z.any().optional(),
  queueExit: z.any().optional(),
  queueOur: z.string().optional(),
  debitOnThisQuery: z.number().optional(),
  responsibleVeterinarian: z.string().optional(),
  moreInfos: z.string().optional(),
  queryType: z.string().optional(),
  petName: z.string().optional(),
  petIsInQueue: z.boolean().optional(),
  petWeight: z.string().optional(),
  observations: z.string().optional(),
  openedBy: z.string().optional(),
});

export const ExamsType = ["lab", "image"];

export const sectorSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export const searchSchema = z.object({
  name: z.string(),
  adress: z.string(),
});

export const ExamSchema = z.object({
  name: z.string(),
  examsType: z.string().array(),
  price: z.number(),
  available: z.boolean(),
  applicableGender: z.string().array().optional(),
  subName: z.string().optional(),
  description: z.string().optional(),
  ageRange: z.string().array().optional(),
  doneExame: z.boolean().optional().default(false),
  characters: z.any().optional(),
});

export const GroupSchema = z.object({
  name: z.string(),
});

export const ProcedureSchema = z.object({
  name: z.string(),
  price: z.any(),
  applicationInterval: z.string(),
  available: z.boolean(),
  observations: z.string(),
  applicableFemale: z.boolean().optional(),
  applicableMale: z.boolean().optional(),
  sector_id: z.any(),
  priceTwo: z.any().optional(),
  priceThree: z.any().optional(),
  priceFour: z.any().optional(),
  minAge: z.any().optional(),
  maxAge: z.any().optional(),
});

export const SearchSchema = z.object({
  initialDate: z.date().optional(),
  finalDate: z.date().optional(),
  customerName: z.string().optional(),
  codPet: z.string().optional(),
  petName: z.string().optional(),
  isHospitalized: z.string().optional(),
  isFinished: z.string().optional(),
  typePaymentClient: z.string().optional(),
});
