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
Object.defineProperty(exports, "__esModule", { value: true });
exports.admissionsController = void 0;
const schemasValidator_1 = require("../schemas/schemasValidator");
const userContract_1 = require("../validators/userContract");
const zod_1 = require("zod");
const PrismaInstance_1 = require("../interface/PrismaInstance");
const GetDebitsInConsultsService_1 = require("../services/GetDebitsInConsultsService");
const { getDiferrenceBetweenOurs } = require("../utils/countOurs");
exports.admissionsController = {
    createKennel: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, totalBeds, price, description } = schemasValidator_1.AdmissionSchema.parse(request.body);
        try {
            const allBeds = [];
            for (let index = 0; index < totalBeds; index++) {
                allBeds.push({});
            }
            yield PrismaInstance_1.prisma.kennel.create({
                data: {
                    name,
                    totalBeds,
                    description,
                    price,
                    beds: {
                        createMany: {
                            data: allBeds,
                        },
                    },
                },
            });
            reply.status(201);
        }
        catch (error) {
            reply.status(400).send({ message: error });
        }
    }),
    getKennels: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const kennels = yield PrismaInstance_1.prisma.kennel.findMany({
            include: {
                beds: {
                    select: {
                        id: true,
                        isBusy: true,
                        mustFasting: true,
                        pet: { select: { name: true } },
                    },
                },
            },
        });
        try {
            reply.send(kennels).status(200);
        }
        catch (error) {
            reply.status(400).send({ message: error });
        }
    }),
    getBeds: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const beds = yield PrismaInstance_1.prisma.bed.findMany();
            const allBeds = beds.map((bed) => {
                let data = {
                    id: bed.id,
                    isBusy: bed.isBusy,
                    mustFasting: bed.mustFasting,
                };
                return data;
            });
            reply.send(allBeds).status(200);
        }
        catch (error) {
            reply.status(400).send({ message: error });
        }
    }),
    admitPet: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { petId, isBusy, dailyRate, mustFasting, kennelId, bedId, recordId } = schemasValidator_1.BedSchema.parse(request.body);
        const contract = new userContract_1.ValidationContract();
        const actualDate = new Date();
        try {
            yield contract.validateBedIsBusy(bedId, "Leito já ocupado");
            if (contract.hadError()) {
                reply.status(400).send(contract.showErrors());
                contract.clearErrors();
                return;
            }
            const { id: openedSurgerieId } = yield PrismaInstance_1.prisma.openededAdmissionsForPet.create({
                data: {
                    openedDate: new Date(),
                }
            });
            yield PrismaInstance_1.prisma.kennel.update({
                where: { id: kennelId },
                data: {
                    beds: {
                        update: {
                            where: { id: bedId },
                            data: {
                                isBusy: isBusy,
                                mustFasting,
                                dailyRate,
                                entryOur: actualDate,
                                pet: { connect: { id: petId } },
                            },
                        },
                    },
                },
            });
            yield PrismaInstance_1.prisma.bedsForPet.create({
                data: {
                    entryOur: actualDate,
                    mustFasting,
                    isCompleted: false,
                    openedAdmissionId: openedSurgerieId,
                    medicine: { connect: { id: recordId } },
                },
            });
            reply.send("Animal internado com sucesso");
        }
        catch (error) {
            reply.status(400).send(error);
            console.log(error);
        }
    }),
    finishPetAdmission: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const FinishAdmissionSchema = zod_1.z.object({
            petId: zod_1.z.number().optional(),
            bedId: zod_1.z.number().optional(),
            queueId: zod_1.z.string().uuid(),
            admissionId: zod_1.z.number().optional(),
            totalInAdmission: zod_1.z.number().optional(),
            responsibleVeterinarianId: zod_1.z.coerce.number(),
            responsibleVeterinarian: zod_1.z.string().optional(),
        });
        const { petId, bedId, admissionId, totalInAdmission, queueId, responsibleVeterinarianId, responsibleVeterinarian } = FinishAdmissionSchema.parse(request.body);
        const actualDate = new Date();
        const bedDetails = yield PrismaInstance_1.prisma.bed.findUnique({
            where: { id: bedId },
        });
        if (!bedDetails) {
            return;
        }
        const totalToPay = yield getDiferrenceBetweenOurs(bedDetails.entryOur, actualDate, bedDetails.dailyRate);
        const totalFinal = Number(totalToPay) + Number(totalInAdmission);
        try {
            yield PrismaInstance_1.prisma.bed.update({
                where: { id: bedId }, data: {
                    exitOur: actualDate,
                    totalDebt: Number(totalToPay),
                    isBusy: false,
                },
            });
            yield PrismaInstance_1.prisma.pets.update({
                where: { id: petId },
                data: {
                    customer: { update: {
                            customerAccount: { update: {
                                    debits: { increment: totalFinal }
                                } }
                        } }
                },
            }),
                yield PrismaInstance_1.prisma.bedsForPet.update({
                    where: { id: admissionId },
                    data: {
                        exitOur: actualDate,
                        totalDebt: Number(totalToPay),
                        isCompleted: true,
                    },
                });
            yield PrismaInstance_1.prisma.bed.update({
                where: { id: bedId },
                data: {
                    petId: null,
                    dailyRate: null,
                    entryOur: null,
                    exitOur: null,
                    totalDebt: null,
                    hospitalizedDays: null,
                },
            });
            const pet = yield PrismaInstance_1.prisma.pets.update({
                where: { id: petId }, data: { priceAccumulator: { update: { accumulator: 0 } } },
                include: {
                    customer: { include: { customerAccount: true } }
                }
            });
            const getDebitsInConsultService = new GetDebitsInConsultsService_1.GetDebitsInConsultsService();
            const { total } = yield getDebitsInConsultService.execute({
                queueId,
                isAdmission: true
            });
            yield PrismaInstance_1.prisma.openededAdmissionsForPet.update({
                where: { id: queueId }, data: {
                    closedDate: new Date(),
                    petWeight: (_a = pet.weigth) === null || _a === void 0 ? void 0 : _a.toString(),
                    totaLDebits: total,
                    isClosed: true,
                    closedByVetId: responsibleVeterinarianId,
                    clodedByVetName: responsibleVeterinarian,
                    customerAccountId: (_c = (_b = pet.customer) === null || _b === void 0 ? void 0 : _b.customerAccount) === null || _c === void 0 ? void 0 : _c.id
                }
            });
            reply.send("Internação Encerrada com sucesso").status(202);
        }
        catch (error) {
            console.log(error);
            reply.send(error);
        }
    }),
    getBusyAndAdmittedPets: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield PrismaInstance_1.prisma.kennel.findMany({
                include: {
                    beds: {
                        select: {
                            id: true,
                            isBusy: true,
                            mustFasting: true,
                            pet: { select: { name: true } },
                        },
                    },
                },
            });
            const data = response.map((kennel) => {
                let data = {
                    name: kennel.name,
                    totalOcupedBeds: kennel.beds.filter((bed) => bed.isBusy === true)
                        .length,
                    beds: kennel.beds.map((bed) => {
                        var _a;
                        const data = {
                            petName: (_a = bed.pet) === null || _a === void 0 ? void 0 : _a.name,
                            id: bed.id,
                            busy: bed.isBusy,
                            fasting: bed.mustFasting,
                        };
                        return data;
                    }),
                };
                return data;
            });
            reply.send(data).status(200);
        }
        catch (error) {
            reply.status(400).send({ message: error });
        }
    }),
    showAdmitedPets: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const admmitepet = yield PrismaInstance_1.prisma.pets.findMany({
                where: { bed: { isBusy: true } }, include: { bed: { include: { kennel: true } }, customer: { select: { name: true } }, medicineRecords: { include: { petBeds: { where: { isCompleted: false } } } } }
            });
            reply.send(admmitepet);
        }
        catch (error) {
            console.log(error);
        }
    }),
    recordHospDiary: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bedId } = request.params;
            const { observations } = request.body;
            yield PrismaInstance_1.prisma.hospitalizationDiary.create({
                data: { observations, BedsForPet: { connect: { id: parseInt(bedId) } } }
            });
            reply.send("Gravação concluida com sucesso!");
        }
        catch (error) {
            reply.send(error);
            console.log(error);
        }
    }),
};
