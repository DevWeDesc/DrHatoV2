"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueController = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
const schemasValidator_1 = require("../schemas/schemasValidator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const GetDebitsInConsultsService_1 = require("../services/GetDebitsInConsultsService");
const ResouceNotFoundError_1 = require("../errors/ResouceNotFoundError");
exports.queueController = {
    setPetInQueue: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { queryType, vetPreference, moreInfos, openedBy } = schemasValidator_1.QueueSchema.parse(request.body);
        const { id } = request.params;
        try {
            const pet = yield PrismaInstance_1.prisma.pets.findUnique({ where: { id: parseInt(id) } });
            if (!pet) {
                return;
            }
            yield PrismaInstance_1.prisma.openedConsultsForPet.create({
                data: {
                    petName: pet.name,
                    openedDate: new Date(),
                    consultType: queryType,
                    vetPreference,
                    isClosed: false,
                    observations: moreInfos,
                    openedBy,
                    MedicineRecord: {
                        connect: { petId: parseInt(id) },
                    },
                },
            });
            reply.status(200).send({
                message: "Fila iniciada com sucesso!",
            });
        }
        catch (error) {
            console.error(error);
            reply.status(400).send({ message: { error } });
        }
    }),
    getQueueByID: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const ParamsSchema = zod_1.z.object({
            queueId: zod_1.z.string().uuid(),
        });
        const { queueId } = ParamsSchema.parse(request.params);
        try {
            var consultbyId = yield PrismaInstance_1.prisma.openedConsultsForPet.findUnique({
                where: { id: queueId },
            });
            return reply.status(200).send(consultbyId);
        }
        catch (err) {
            return reply.status(400).send(err);
        }
    }),
    finishQueueOfPet: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const ParamsSchema = zod_1.z.object({
            petId: zod_1.z.coerce.number(),
            queueUUID: zod_1.z.string().uuid(),
            customerId: zod_1.z.coerce.number(),
        });
        const QueueSchema = zod_1.z.object({
            vetPreference: zod_1.z.string().optional(),
            responsibleVeterinarianId: zod_1.z.number().optional(),
            debitOnThisQuery: zod_1.z.number().optional(),
            responsibleVeterinarian: zod_1.z.string().optional(),
            petWeight: zod_1.z.number().optional(),
            consultId: zod_1.z.string().optional(),
            admissionId: zod_1.z.string().optional(),
            accountId: zod_1.z.number().optional(),
        });
        const { petId, queueUUID, customerId } = ParamsSchema.parse(request.params);
        const { responsibleVeterinarianId, responsibleVeterinarian, petWeight, consultId, admissionId, accountId, } = QueueSchema.parse(request.body);
        try {
            const getDebitsInConsultService = new GetDebitsInConsultsService_1.GetDebitsInConsultsService();
            const { debits, total } = yield getDebitsInConsultService.execute({
                queueId: queueUUID,
            });
            const pet = yield PrismaInstance_1.prisma.pets.update({
                where: { id: petId },
                data: { priceAccumulator: { update: { accumulator: 0 } } },
            });
            yield PrismaInstance_1.prisma.openedConsultsForPet.update({
                where: {
                    id: queueUUID,
                },
                data: {
                    petName: pet.name,
                    clodedByVetName: responsibleVeterinarian,
                    closedByVetId: responsibleVeterinarianId,
                    closedDate: new Date(),
                    isClosed: true,
                    petWeight: petWeight === null || petWeight === void 0 ? void 0 : petWeight.toString(),
                    totaLDebits: total,
                    symptoms: debits[0].symptoms,
                    request: debits[0].request,
                    diagnostic: debits[0].diagnostic,
                    observations: debits[0].observations,
                    customerAccountId: accountId,
                },
            });
            yield PrismaInstance_1.prisma.customer.update({
                where: { id: customerId },
                data: {
                    customerAccount: {
                        update: {
                            debits: { increment: Number(total) },
                            admissionId: admissionId,
                            consultId: consultId,
                        },
                    },
                },
            });
            reply.status(201).send({
                message: "Fila encerrada com sucesso!",
            });
        }
        catch (error) {
            console.log(error);
            if (error instanceof ResouceNotFoundError_1.ResourceNotFoundError) {
                reply.status(404).send({ message: error.message });
            }
            console.log(error);
            //reply.status(400).send({message: { error}})
        }
    }),
    updatedClientIsVipInConsultForPet: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const consultSchema = zod_1.z.object({
            queueId: zod_1.z.string(),
            clientIsVip: zod_1.z.string(),
            idCustomer: zod_1.z.string(),
        });
        const { queueId, idCustomer, clientIsVip } = consultSchema.parse(request.params);
        let valueIsVip = clientIsVip === "false" ? false : true;
        try {
            yield PrismaInstance_1.prisma.openedConsultsForPet
                .update({
                where: { id: queueId },
                data: { clientIsVip: valueIsVip },
            })
                .then(() => __awaiter(void 0, void 0, void 0, function* () {
                yield PrismaInstance_1.prisma.customer.update({
                    where: { id: Number(idCustomer) },
                    data: { customerAccount: { update: { clientIsVip: valueIsVip } } },
                });
            }));
            reply.status(200).send("O Campo Cliente Vip Foi atualizado!");
        }
        catch (error) {
            reply.status(400).send(error);
        }
    }),
    getQueuePetHistory: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const { date, petId } = request.params;
        const today = new Date(date);
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        try {
            const petsProcedures = yield PrismaInstance_1.prisma.pets.findUnique({
                where: { id: parseInt(petId) },
                include: {
                    customer: { select: { name: true } },
                    medicineRecords: {
                        include: {
                            petVaccines: {
                                where: { requestedDate: { gte: date, lt: tomorrow } },
                            },
                            petBeds: { where: { entryOur: { gte: date, lt: tomorrow } } },
                            petExams: {
                                where: { requesteData: { gte: today, lt: tomorrow } },
                            },
                            petSurgeries: {
                                where: { requestedDate: { gte: date, lt: tomorrow } },
                            },
                        },
                    },
                },
            });
            let procedures = [];
            procedures = procedures.concat((_a = petsProcedures === null || petsProcedures === void 0 ? void 0 : petsProcedures.medicineRecords) === null || _a === void 0 ? void 0 : _a.petVaccines.flatMap((vaccine) => vaccine), (_b = petsProcedures === null || petsProcedures === void 0 ? void 0 : petsProcedures.medicineRecords) === null || _b === void 0 ? void 0 : _b.petExams.flatMap((exams) => exams), (_c = petsProcedures === null || petsProcedures === void 0 ? void 0 : petsProcedures.medicineRecords) === null || _c === void 0 ? void 0 : _c.petSurgeries.flatMap((surgeries) => surgeries), (_d = petsProcedures === null || petsProcedures === void 0 ? void 0 : petsProcedures.medicineRecords) === null || _d === void 0 ? void 0 : _d.petBeds.flatMap((beds) => beds));
            const data = {
                petName: petsProcedures === null || petsProcedures === void 0 ? void 0 : petsProcedures.name,
                customerName: petsProcedures === null || petsProcedures === void 0 ? void 0 : petsProcedures.customer.name,
                procedures,
            };
            reply.send(data);
        }
        catch (error) {
            console.log(error);
        }
    }),
    unconcludeQueue: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const unconcludeSchema = zod_1.z.object({
                masterPassword: zod_1.z.string(),
                unconcludeObs: zod_1.z.string(),
                userId: zod_1.z.number(),
                queueId: zod_1.z.number(),
            });
            const { masterPassword, unconcludeObs, userId, queueId } = unconcludeSchema.parse(request.body);
            const user = yield PrismaInstance_1.prisma.user.findUnique({ where: { id: userId } });
            if (!user)
                return;
            const authorizedUser = yield bcrypt_1.default.compare(masterPassword, user.password);
            if (authorizedUser) {
                yield PrismaInstance_1.prisma.queuesForPet.update({
                    where: { id: queueId },
                    data: {
                        queueIsDone: false,
                        unconcludeObs,
                        medicine: {
                            update: {
                                pet: { update: { queue: { update: { petIsInQueue: true } } } },
                            },
                        },
                    },
                });
                reply.send("Consulta desconcluida!!");
            }
            else {
                reply.send("Falha ao desconcluir consulta!").status(401);
            }
        }
        catch (error) {
            console.log(error);
            reply.send(error);
        }
    }),
    updateQueueDiagnostics: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const GetParams = zod_1.z.object({
                queueId: zod_1.z.string().uuid(),
            });
            const BodyParams = zod_1.z.object({
                symptoms: zod_1.z.string().optional(),
                request: zod_1.z.string().optional(),
                diagnostic: zod_1.z.string().optional(),
            });
            const { queueId } = GetParams.parse(request.params);
            const { diagnostic, request: DiagnosticRequest, symptoms, } = BodyParams.parse(request.body);
            yield PrismaInstance_1.prisma.openedConsultsForPet.update({
                where: { id: queueId },
                data: {
                    symptoms,
                    diagnostic,
                    request: DiagnosticRequest,
                },
            });
            reply.status(200).send({
                message: "Consulta atualizada",
            });
        }
        catch (error) {
            reply.status(404).send({
                message: error,
            });
        }
    }),
    updatePetWeightInQueue: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const UpdatePetWeightInQueueParams = zod_1.z.object({
                queueId: zod_1.z.string().uuid(),
                petWeigth: zod_1.z.coerce.string()
            });
            const { petWeigth, queueId } = UpdatePetWeightInQueueParams.parse(request.params);
            yield PrismaInstance_1.prisma.openedConsultsForPet.update({
                where: { id: queueId },
                data: {
                    petWeight: petWeigth
                }
            });
        }
        catch (error) {
        }
    }),
    getQueueDiagnostics: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const GetParams = zod_1.z.object({
                queueId: zod_1.z.string().uuid(),
            });
            const { queueId } = GetParams.parse(request.params);
            const diagnostic = yield PrismaInstance_1.prisma.openedConsultsForPet.findUnique({
                where: { id: queueId },
                select: {
                    diagnostic: true,
                    symptoms: true,
                    request: true,
                },
            });
            reply.send({
                diagnostic,
            });
        }
        catch (error) {
            reply.status(404).send({
                message: error,
            });
            console.error(error);
        }
    }),
};
