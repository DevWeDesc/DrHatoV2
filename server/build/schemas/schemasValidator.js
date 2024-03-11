"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchSchema = exports.ProcedureSchema = exports.GroupSchema = exports.ExamSchema = exports.searchSchema = exports.sectorSchema = exports.ExamsType = exports.QueueSchema = exports.BedSchema = exports.AdmissionSchema = exports.VaccineSchema = exports.UserSchema = exports.createCustomer = exports.petSchema = exports.CustomerSchema = void 0;
const zod_1 = require("zod");
exports.CustomerSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    adress: zod_1.z.string(),
    birthday: zod_1.z.string(),
    cpf: zod_1.z.string(),
    phone: zod_1.z.string(),
    balance: zod_1.z.any(),
    cep: zod_1.z.string(),
    pets: zod_1.z.any(),
    transactions: zod_1.z.any(),
});
exports.petSchema = zod_1.z.object({
    name: zod_1.z.string(),
    especie: zod_1.z.string(),
    sexo: zod_1.z.string(),
    race: zod_1.z.string(),
    weigth: zod_1.z.number().optional(),
    haveChip: zod_1.z.boolean().optional(),
    isCastred: zod_1.z.boolean().optional(),
    corPet: zod_1.z.string(),
    sizePet: zod_1.z.string(),
    bornDate: zod_1.z.string(),
    observations: zod_1.z.string().optional(),
    rga: zod_1.z.number().optional(),
});
exports.createCustomer = zod_1.z.object({
    name: zod_1.z.string(),
    adress: zod_1.z.string(),
    district: zod_1.z.string().optional(),
    phone: zod_1.z.string(),
    tell: zod_1.z.string().optional(),
    cpf: zod_1.z.string(),
    rg: zod_1.z.string().optional(),
    email: zod_1.z.string().email(),
    birthday: zod_1.z.string(),
    cep: zod_1.z.string(),
    balance: zod_1.z.number().optional(),
    vetPreference: zod_1.z.string().optional(),
    howKnowUs: zod_1.z.string().optional(),
    kindPerson: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    neighbour: zod_1.z.string().optional(),
});
exports.UserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().optional(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    userType: zod_1.z.any(),
    userIsVet: zod_1.z.boolean().optional(),
    crmv: zod_1.z.string().optional(),
    role: zod_1.z
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
exports.VaccineSchema = zod_1.z.object({
    name: zod_1.z.string(),
    price: zod_1.z.number(),
    description: zod_1.z.string(),
});
exports.AdmissionSchema = zod_1.z.object({
    name: zod_1.z.string(),
    totalBeds: zod_1.z.number(),
    price: zod_1.z.number().optional(),
    description: zod_1.z.string().optional(),
});
exports.BedSchema = zod_1.z.object({
    petId: zod_1.z.number(),
    isBusy: zod_1.z.boolean(),
    mustFasting: zod_1.z.boolean().optional(),
    kennelId: zod_1.z.number(),
    bedId: zod_1.z.number(),
    entryOur: zod_1.z.date().optional(),
    dailyRate: zod_1.z.number().optional(),
    recordId: zod_1.z.number(),
});
exports.QueueSchema = zod_1.z.object({
    vetPreference: zod_1.z.string().optional(),
    queueEntry: zod_1.z.any().optional(),
    queueExit: zod_1.z.any().optional(),
    queueOur: zod_1.z.string().optional(),
    debitOnThisQuery: zod_1.z.number().optional(),
    responsibleVeterinarian: zod_1.z.string().optional(),
    moreInfos: zod_1.z.string().optional(),
    queryType: zod_1.z.string().optional(),
    petName: zod_1.z.string().optional(),
    petIsInQueue: zod_1.z.boolean().optional(),
    petWeight: zod_1.z.string().optional(),
    observations: zod_1.z.string().optional(),
    openedBy: zod_1.z.string().optional(),
});
exports.ExamsType = ["lab", "image"];
exports.sectorSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
});
exports.searchSchema = zod_1.z.object({
    name: zod_1.z.string(),
    adress: zod_1.z.string(),
});
exports.ExamSchema = zod_1.z.object({
    name: zod_1.z.string(),
    examsType: zod_1.z.string().array(),
    price: zod_1.z.number(),
    available: zod_1.z.boolean(),
    applicableGender: zod_1.z.string().array().optional(),
    subName: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    ageRange: zod_1.z.string().array().optional(),
    doneExame: zod_1.z.boolean().optional().default(false),
    characters: zod_1.z.any().optional(),
});
exports.GroupSchema = zod_1.z.object({
    name: zod_1.z.string(),
});
exports.ProcedureSchema = zod_1.z.object({
    name: zod_1.z.string(),
    price: zod_1.z.any(),
    applicationInterval: zod_1.z.string(),
    available: zod_1.z.boolean(),
    observations: zod_1.z.string(),
    applicableFemale: zod_1.z.boolean().optional(),
    applicableMale: zod_1.z.boolean().optional(),
    sector_id: zod_1.z.any(),
    priceTwo: zod_1.z.any().optional(),
    priceThree: zod_1.z.any().optional(),
    priceFour: zod_1.z.any().optional(),
    minAge: zod_1.z.any().optional(),
    maxAge: zod_1.z.any().optional(),
});
exports.SearchSchema = zod_1.z.object({
    initialDate: zod_1.z.date().optional(),
    finalDate: zod_1.z.date().optional(),
    customerName: zod_1.z.string().optional(),
    codPet: zod_1.z.string().optional(),
    petName: zod_1.z.string().optional(),
    isHospitalized: zod_1.z.string().optional(),
    isFinished: zod_1.z.string().optional(),
    typePaymentClient: zod_1.z.string().optional(),
});
