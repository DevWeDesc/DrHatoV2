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
exports.proceduresController = void 0;
const schemasValidator_1 = require("../schemas/schemasValidator");
const getCurrentDate_1 = require("../utils/getCurrentDate");
const accumulatorService_1 = require("../services/accumulatorService");
const PrismaInstance_1 = require("../interface/PrismaInstance");
const zod_1 = require("zod");
exports.proceduresController = {
    createProcedure: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, price, available, observations, applicationInterval, applicableFemale, applicableMale, priceTwo, priceThree, priceFour, minAge, maxAge, sector_id, } = schemasValidator_1.ProcedureSchema.parse(request.body);
        try {
            yield PrismaInstance_1.prisma.procedures.create({
                data: {
                    name,
                    price,
                    priceTwo,
                    priceThree,
                    priceFour,
                    available,
                    observations,
                    applicationInterval,
                    applicableFemale,
                    applicableMale,
                    maxAge,
                    minAge,
                    sector: { connect: { id: parseInt(sector_id) } },
                },
            });
            reply.status(201).send("Procedimento criado!");
        }
        catch (error) {
            console.log(error);
            reply.status(400).send({ message: error });
        }
    }),
    getProcedures: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Obtenha o número da página atual a partir da solicitação.
            const currentPage = Number(request.query.page) || 1;
            const animalSex = request.query.sex || null;
            // Obtenha o número total de usuários.
            const totalProceds = yield PrismaInstance_1.prisma.procedures.count();
            // Calcule o número de páginas.
            const totalPages = Math.ceil(totalProceds / 35);
            if (animalSex === "Macho") {
                const procedures = yield PrismaInstance_1.prisma.procedures.findMany({
                    skip: (currentPage - 1) * 35,
                    take: 35,
                    where: {
                        applicableMale: true,
                    },
                    include: {
                        groups: { select: { name: true } },
                        sector: { select: { name: true } },
                        appicableEspecies: true,
                    },
                });
                reply.send({ totalPages, totalProceds, currentPage, procedures });
            }
            else if (animalSex === "Femea") {
                const procedures = yield PrismaInstance_1.prisma.procedures.findMany({
                    skip: (currentPage - 1) * 35,
                    take: 35,
                    where: {
                        applicableFemale: true,
                    },
                    include: {
                        groups: { select: { name: true } },
                        sector: { select: { name: true } },
                        appicableEspecies: true,
                    },
                });
                reply.send({ totalPages, totalProceds, currentPage, procedures });
            }
            else {
                const procedures = yield PrismaInstance_1.prisma.procedures.findMany({
                    skip: (currentPage - 1) * 35,
                    take: 35,
                    include: {
                        groups: { select: { name: true } },
                        sector: { select: { name: true } },
                        appicableEspecies: true,
                    },
                });
                reply.send({ totalPages, totalProceds, currentPage, procedures });
            }
        }
        catch (error) {
            console.log(error);
            reply.status(400).send({ message: error });
        }
    }),
    queryProcedureByName: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currentPage = Number(request.query.page) || 1;
            const animalSex = request.query.sex || null;
            const { q } = request.query;
            if (animalSex === "Macho") {
                const totalProceds = yield PrismaInstance_1.prisma.procedures.count({
                    where: {
                        name: { startsWith: q },
                        applicableMale: true,
                    },
                });
                const totalPages = Math.ceil(totalProceds / 35);
                const procedures = yield PrismaInstance_1.prisma.procedures.findMany({
                    skip: (currentPage - 1) * 35,
                    take: 35,
                    where: {
                        name: { startsWith: q },
                        applicableMale: true,
                    },
                    include: {
                        groups: { select: { name: true } },
                        sector: { select: { name: true } },
                        appicableEspecies: true,
                    },
                });
                reply.send({ totalPages, totalProceds, currentPage, procedures });
            }
            else if (animalSex != null && animalSex === "Femea") {
                const totalProceds = yield PrismaInstance_1.prisma.procedures.count({
                    where: {
                        name: { startsWith: q },
                        applicableFemale: true,
                    },
                });
                const totalPages = Math.ceil(totalProceds / 35);
                const procedures = yield PrismaInstance_1.prisma.procedures.findMany({
                    skip: (currentPage - 1) * 35,
                    take: 35,
                    where: {
                        name: { startsWith: q },
                        applicableFemale: true,
                    },
                    include: {
                        groups: { select: { name: true } },
                        sector: { select: { name: true } },
                        appicableEspecies: true,
                    },
                });
                reply.send({ totalPages, totalProceds, currentPage, procedures });
            }
            else {
                const totalProceds = yield PrismaInstance_1.prisma.procedures.count({
                    where: { name: { startsWith: q } },
                });
                const totalPages = Math.ceil(totalProceds / 35);
                const procedures = yield PrismaInstance_1.prisma.procedures.findMany({
                    skip: (currentPage - 1) * 35,
                    take: 35,
                    where: { name: { startsWith: q } },
                });
                reply.send({
                    totalProceds,
                    totalPages,
                    currentPage,
                    procedures,
                });
            }
        }
        catch (error) { }
    }),
    getWithId: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const procedure = yield PrismaInstance_1.prisma.procedures.findUnique({
                where: { id: parseInt(id) },
                include: {
                    groups: { select: { name: true } },
                    sector: { select: { name: true } },
                    appicableEspecies: true,
                },
            });
            reply.send(procedure);
        }
        catch (error) {
            console.log(error);
            reply.status(400).send({ message: error });
        }
    }),
    editProcedure: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = request.params;
        const { name, price, available, observations, applicationInterval, sector_id, } = schemasValidator_1.ProcedureSchema.parse(request.body);
        try {
            yield PrismaInstance_1.prisma.procedures.update({
                where: { id: parseInt(id) },
                data: {
                    name,
                    price,
                    available,
                    observations,
                    applicationInterval,
                },
            });
        }
        catch (error) { }
    }),
    deleteProcedure: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            yield PrismaInstance_1.prisma.procedures.delete({ where: { id: parseInt(id) } });
            reply.status(204).send("Procedimento deletado!");
        }
        catch (error) {
            reply.status(400).send("Falha ao deletar procedimento!");
            console.log(error);
        }
    }),
    setProcedureInPet: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const actualDate = (0, getCurrentDate_1.getFormattedDateTime)();
        const { procedureId, petId, accId, queueId } = request.params;
        const { RequestedByVetId, RequestedByVetName, InAdmission } = request.body;
        try {
            const procedure = yield PrismaInstance_1.prisma.procedures.findUnique({
                where: { id: parseInt(procedureId) },
            });
            if (!procedure)
                return;
            if (InAdmission === true) {
                yield PrismaInstance_1.prisma.petConsultsDebits.create({
                    data: {
                        OpenedAdmissionsForPet: { connect: { id: queueId } },
                        isProcedure: true,
                        name: procedure.name,
                        price: procedure.price,
                        itemId: procedure.id,
                        sectorId: procedure.sector_id,
                        RequestedByVetId,
                        RequestedByVetName,
                    },
                })
                    .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    yield PrismaInstance_1.prisma.proceduresForPet.create({
                        data: {
                            name: procedure.name,
                            available: procedure.available,
                            observations: procedure.observations,
                            price: procedure.price,
                            applicationInterval: procedure.applicationInterval,
                            requestedDate: actualDate,
                            linkedConsultDebitId: res.id,
                            medicine: { connect: { petId: parseInt(petId) } },
                        },
                    });
                }));
            }
            else if (InAdmission === false) {
                yield PrismaInstance_1.prisma.petConsultsDebits
                    .create({
                    data: {
                        OpenedConsultsForPet: { connect: { id: queueId } },
                        isProcedure: true,
                        name: procedure.name,
                        price: procedure.price,
                        sectorId: procedure.sector_id,
                        itemId: procedure.id,
                        RequestedByVetId,
                        RequestedByVetName,
                    },
                })
                    .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    yield PrismaInstance_1.prisma.proceduresForPet.create({
                        data: {
                            name: procedure.name,
                            available: procedure.available,
                            observations: procedure.observations,
                            price: procedure.price,
                            applicationInterval: procedure.applicationInterval,
                            requestedDate: actualDate,
                            linkedConsultDebitId: res.id,
                            medicine: { connect: { petId: parseInt(petId) } },
                        },
                    });
                }));
            }
            // await prisma.proceduresForPet.create({
            //   data: {
            //     name: procedure.name,
            //     available: procedure.available,
            //     observations: procedure.observations,
            //     price: procedure.price,
            //     applicationInterval: procedure.applicationInterval,
            //     requestedDate: actualDate,
            //     linkedConsultDebitId: res.is,
            //     medicine: { connect: { petId: parseInt(petId) } },
            //   },
            // });
            yield accumulatorService_1.accumulatorService.addPriceToAccum(procedure === null || procedure === void 0 ? void 0 : procedure.price, accId);
            reply.status(200).send("Procedimento adicionado com sucesso!");
        }
        catch (error) {
            reply.status(400).send({ message: error });
            console.log(error);
        }
    }),
    // deleteProcedureOfPet: async (
    //   request: FastifyRequest<{
    //     Params: { id: string; procedPrice: string; accId: string };
    //   }>,
    //   reply: FastifyReply
    // ) => {
    //   try {
    //     const { id, procedPrice, accId } = request.params;
    //     await accumulatorService.removePriceToAccum(Number(procedPrice), accId);
    //     await prisma.proceduresForPet.delete({
    //       where: { id: parseInt(id) },
    //     });
    //     reply.send("Procedimento deletado com sucesso!").status(203);
    //     reply.status(200);
    //   } catch (error) {
    //     console.log(error);
    //     reply.send({ message: error });
    //   }
    // },
    removePetProcedure: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const DeleteProcedureForPetSchema = zod_1.z.object({
            id: zod_1.z.coerce.number(),
            accId: zod_1.z.coerce.number(),
            procedurePrice: zod_1.z.any(),
            linkedDebitId: zod_1.z.coerce.number(),
        });
        try {
            const { id, accId, procedurePrice, linkedDebitId } = DeleteProcedureForPetSchema.parse(request.params);
            yield accumulatorService_1.accumulatorService.removePriceToAccum(Number(procedurePrice), accId);
            yield PrismaInstance_1.prisma.petConsultsDebits.delete({
                where: {
                    id: linkedDebitId,
                },
            });
            yield PrismaInstance_1.prisma.proceduresForPet.delete({
                where: { id: id },
            });
            reply.status(203).send({
                message: "Deletado com sucesso!",
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    setEspecieInProcedure: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { procedureId, especieId } = request.params;
            yield PrismaInstance_1.prisma.procedures.update({
                where: { id: parseInt(procedureId) },
                data: {
                    appicableEspecies: {
                        connect: { id: parseInt(especieId) },
                    },
                },
            });
            reply.status(201);
        }
        catch (error) {
            reply.send(error).status(400);
        }
    }),
    setAllEspeciesInProcedure: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { procedureId } = request.params;
            const especies = yield PrismaInstance_1.prisma.especies.findMany();
            for (const especie of especies) {
                yield PrismaInstance_1.prisma.procedures.update({
                    where: { id: parseInt(procedureId) },
                    data: { appicableEspecies: { connect: { id: especie.id } } },
                });
            }
            reply.status(201).send("Todas especies setadas!");
        }
        catch (error) {
            reply.send(error).status(400);
        }
    }),
    removeAllEspeciesInProcedure: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { procedureId } = request.params;
            const especies = yield PrismaInstance_1.prisma.especies.findMany();
            for (const especie of especies) {
                yield PrismaInstance_1.prisma.procedures.update({
                    where: { id: parseInt(procedureId) },
                    data: { appicableEspecies: { disconnect: { id: especie.id } } },
                });
            }
            reply.status(201).send("Todas especies Removidas!");
        }
        catch (error) {
            reply.send(error).status(400);
        }
    }),
};
