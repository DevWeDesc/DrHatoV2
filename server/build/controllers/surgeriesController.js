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
exports.surgeriesController = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
const zod_1 = require("zod");
const accumulatorService_1 = require("../services/accumulatorService");
exports.surgeriesController = {
    createSurgerie: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const SurgerieSchema = zod_1.z.object({
            name: zod_1.z.string(),
            price: zod_1.z.number(),
        });
        const { name, price } = SurgerieSchema.parse(request.body);
        try {
            yield PrismaInstance_1.prisma.surgeries.create({
                data: {
                    name,
                    price,
                },
            });
            reply.send("Nova cirurgia criada com sucesso!").status(200);
        }
        catch (error) {
            reply.send({ message: error });
            console.log(error);
        }
    }),
    getSurgeries: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Obtenha o número da página atual a partir da solicitação.
            const currentPage = Number(request.query.page) || 1;
            // Obtenha o número total de usuários.
            const totalSurgeries = yield PrismaInstance_1.prisma.surgeries.count();
            // Calcule o número de páginas.
            const totalPages = Math.ceil(totalSurgeries / 35);
            const animalSex = request.query.sex || null;
            if (animalSex != null && animalSex == "Macho") {
                const surgeries = yield PrismaInstance_1.prisma.surgeries.findMany({
                    skip: (currentPage - 1) * 35,
                    take: 35,
                    where: { applicableToMale: true },
                });
                reply
                    .send({
                    currentPage,
                    totalPages,
                    totalSurgeries,
                    surgeries,
                })
                    .status(200);
            }
            else if (animalSex != null && animalSex == "Femea") {
                const surgeries = yield PrismaInstance_1.prisma.surgeries.findMany({
                    skip: (currentPage - 1) * 35,
                    take: 35,
                    where: { applicableToFemale: true },
                });
                reply
                    .send({
                    currentPage,
                    totalPages,
                    totalSurgeries,
                    surgeries,
                })
                    .status(200);
            }
            else {
                const surgeries = yield PrismaInstance_1.prisma.surgeries.findMany({
                    skip: (currentPage - 1) * 35,
                    take: 35,
                });
                reply
                    .send({
                    currentPage,
                    totalPages,
                    totalSurgeries,
                    surgeries,
                })
                    .status(200);
            }
        }
        catch (error) {
            reply.send(error);
            console.log(error);
        }
    }),
    setSurgerieInPet: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, petId, accId, queueId } = request.params;
        const { RequestedByVetId, RequestedByVetName, isAdmission } = request.body;
        try {
            const surgerie = yield PrismaInstance_1.prisma.surgeries.findUnique({
                where: { id: parseInt(id) },
            });
            if (!surgerie) {
                reply
                    .status(400)
                    .send("Falha ao buscar cirurgia/Falha ao criar Cirurgia");
                return;
            }
            if (isAdmission === true) {
                yield PrismaInstance_1.prisma.petConsultsDebits
                    .create({
                    data: {
                        OpenedAdmissionsForPet: { connect: { id: queueId } },
                        isSurgerie: true,
                        name: surgerie.name,
                        price: surgerie.price,
                        itemId: surgerie.id,
                        RequestedByVetId,
                        RequestedByVetName,
                        sectorId: surgerie.sector_id,
                    },
                })
                    .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    yield PrismaInstance_1.prisma.surgeriesForPet.create({
                        data: {
                            name: surgerie.name,
                            status: "STARTED",
                            price: surgerie.price,
                            medicine: { connect: { petId: parseInt(petId) } },
                            linkedConsultDebitId: res.id,
                        },
                    });
                }));
            }
            else {
                yield PrismaInstance_1.prisma.petConsultsDebits
                    .create({
                    data: {
                        OpenedConsultsForPet: { connect: { id: queueId } },
                        isSurgerie: true,
                        name: surgerie.name,
                        price: surgerie.price,
                        itemId: surgerie.id,
                        RequestedByVetId,
                        RequestedByVetName,
                        sectorId: surgerie.sector_id,
                    },
                })
                    .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    yield PrismaInstance_1.prisma.surgeriesForPet.create({
                        data: {
                            name: surgerie.name,
                            status: "STARTED",
                            price: surgerie.price,
                            medicine: { connect: { petId: parseInt(petId) } },
                            linkedConsultDebitId: res.id,
                        },
                    });
                }));
            }
            yield accumulatorService_1.accumulatorService.addPriceToAccum(Number(surgerie.price), accId);
            reply.send("Cirurgia adiciona ao pet com sucesso").status(200);
        }
        catch (error) {
            reply.send({ message: error });
            console.log(error);
        }
    }),
    excludePetSugerie: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const DeleteSurgeryForPetSchema = zod_1.z.object({
            id: zod_1.z.coerce.number(),
            accId: zod_1.z.coerce.number(),
            sugPrice: zod_1.z.any(),
            linkedDebitId: zod_1.z.coerce.number(),
        });
        try {
            const { id, accId, sugPrice, linkedDebitId } = DeleteSurgeryForPetSchema.parse(request.params);
            yield accumulatorService_1.accumulatorService.removePriceToAccum(Number(sugPrice), accId);
            yield PrismaInstance_1.prisma.petConsultsDebits
                .delete({
                where: {
                    id: linkedDebitId,
                },
            })
                .then(() => __awaiter(void 0, void 0, void 0, function* () {
                yield PrismaInstance_1.prisma.surgeriesForPet.delete({
                    where: { linkedConsultDebitId: linkedDebitId },
                });
            }));
            reply.status(203).send({
                message: "Deletado com sucesso!",
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    reportPetSurgerie: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { surgerieId } = request.params;
            const { reportedText, reportedBy, finishReport } = request.body;
            const today = new Date(Date.now());
            if (finishReport === true) {
                yield PrismaInstance_1.prisma.surgeriesForPet.update({
                    where: { id: parseInt(surgerieId) },
                    data: {
                        completedDate: today,
                        status: "FINISHED",
                        surgeriesReport: { update: { reportedBy, reportedText } },
                    },
                });
                return reply.status(200).send("laudado editado com sucesso!");
            }
            yield PrismaInstance_1.prisma.surgeriesReports.create({
                data: {
                    reportedText,
                    reportedBy,
                    SurgeriesForPet: { connect: { id: parseInt(surgerieId) } },
                },
            });
            reply.status(201).send("laudado com sucesso!");
        }
        catch (error) {
            console.log(error);
            reply.status(404).send(error);
        }
    }),
    getPetSurgeriesHistory: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { petId } = request.params;
            const response = yield PrismaInstance_1.prisma.pets.findUnique({
                where: { id: parseInt(petId) },
                include: {
                    medicineRecords: {
                        include: { petSurgeries: { include: { surgeriesReport: true } } },
                    },
                },
            });
            reply.send(response);
        }
        catch (error) {
            console.log(error);
            reply.send(error);
        }
    }),
    getPetSurgeriesOpened: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const sugeriesOpened = yield PrismaInstance_1.prisma.surgeriesForPet.findMany({
                where: {
                    status: { equals: "STARTED" },
                },
                include: {
                    medicine: { select: { pet: { include: { customer: true } } } },
                },
            });
            reply.send(sugeriesOpened);
        }
        catch (error) {
            reply.send(error);
            console.log(error);
        }
    }),
    getPetOpenedSugerie: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        try {
            const { petId } = request.params;
            const response = yield PrismaInstance_1.prisma.pets.findUnique({
                where: { id: parseInt(petId) },
                include: {
                    medicineRecords: {
                        include: {
                            petSurgeries: {
                                where: {
                                    status: "STARTED",
                                },
                                include: { surgeriesReport: true },
                            },
                        },
                    },
                    customer: { select: { name: true, cpf: true } },
                },
            });
            if (!response) {
                return reply.status(404);
            }
            const data = {
                petId: response.id,
                petName: response.name,
                petWeight: response.weigth,
                petEspecie: response.especie,
                petRace: response.race,
                petAge: response.bornDate,
                customerName: response.customer.name,
                customerCpf: response.customer.cpf,
                sugerieId: (_a = response.medicineRecords) === null || _a === void 0 ? void 0 : _a.petSurgeries[0].id,
                sugerieName: (_b = response.medicineRecords) === null || _b === void 0 ? void 0 : _b.petSurgeries[0].name,
                sugerieReportId: (_d = (_c = response.medicineRecords) === null || _c === void 0 ? void 0 : _c.petSurgeries[0].surgeriesReport) === null || _d === void 0 ? void 0 : _d.id,
                sugerieReport: (_f = (_e = response.medicineRecords) === null || _e === void 0 ? void 0 : _e.petSurgeries[0].surgeriesReport) === null || _f === void 0 ? void 0 : _f.reportedText,
                sugerieReportBy: (_h = (_g = response.medicineRecords) === null || _g === void 0 ? void 0 : _g.petSurgeries[0].surgeriesReport) === null || _h === void 0 ? void 0 : _h.reportedBy,
            };
            reply.send(data);
        }
        catch (error) {
            reply.send(error);
            console.log(error);
        }
    }),
    getSurgeriePetDetails: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const GetSurgeriePetDetailSchema = zod_1.z.object({
                surgerieId: zod_1.z.coerce.number()
            });
            const { surgerieId } = GetSurgeriePetDetailSchema.parse(request.params);
            const surgerie = yield PrismaInstance_1.prisma.surgeriesForPet.findUnique({
                where: {
                    id: surgerieId
                },
                include: { surgeriesReport: true }
            });
            reply.send({
                surgerie
            });
        }
        catch (error) {
            reply.status(404).send({
                message: error
            });
        }
    })
};
