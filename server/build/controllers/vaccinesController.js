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
exports.vaccinesController = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
const schemasValidator_1 = require("../schemas/schemasValidator");
const accumulatorService_1 = require("../services/accumulatorService");
const zod_1 = require("zod");
exports.vaccinesController = {
    createVaccine: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, description, price } = schemasValidator_1.VaccineSchema.parse(request.body);
            yield PrismaInstance_1.prisma.vaccines.create({
                data: { name, description, price },
            });
            reply.send("Sucesso ao criar nova Vacina").status(200);
        }
        catch (error) {
            reply.send({ message: error });
            console.log(error);
        }
    }),
    getAllVaccines: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const animalSex = request.query.sex || null;
            const vaccines = yield PrismaInstance_1.prisma.vaccines.findMany({
                where: {
                    disponible: true,
                },
            });
            reply.send(vaccines).status(200);
        }
        catch (error) {
            reply.send({ message: error });
            console.log(error);
        }
    }),
    setVaccineInPet: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, petId, accId, queueId } = request.params;
        const { RequestedByVetId, RequestedByVetName, isAdmission } = request.body;
        const vaccine = yield PrismaInstance_1.prisma.vaccines.findUnique({
            where: { id: parseInt(id) },
        });
        if (!vaccine) {
            reply.status(400).send("Falha ao buscar vacina/Falha ao criar vacina");
            return;
        }
        try {
            if (isAdmission === true) {
                yield PrismaInstance_1.prisma.petConsultsDebits
                    .create({
                    data: {
                        OpenedAdmissionsForPet: { connect: { id: queueId } },
                        isVaccine: true,
                        name: vaccine.name,
                        price: vaccine.price,
                        itemId: vaccine.id,
                        RequestedByVetId,
                        RequestedByVetName,
                        sectorId: vaccine.sector_id,
                    },
                })
                    .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    yield PrismaInstance_1.prisma.vaccinesForPet.create({
                        data: {
                            name: vaccine === null || vaccine === void 0 ? void 0 : vaccine.name,
                            price: vaccine === null || vaccine === void 0 ? void 0 : vaccine.price,
                            description: vaccine === null || vaccine === void 0 ? void 0 : vaccine.description,
                            requestedDate: new Date(),
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
                        isVaccine: true,
                        name: vaccine.name,
                        price: vaccine.price,
                        itemId: vaccine.id,
                        RequestedByVetId,
                        RequestedByVetName,
                        sectorId: vaccine.sector_id,
                    },
                })
                    .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    yield PrismaInstance_1.prisma.vaccinesForPet.create({
                        data: {
                            name: vaccine === null || vaccine === void 0 ? void 0 : vaccine.name,
                            price: vaccine === null || vaccine === void 0 ? void 0 : vaccine.price,
                            description: vaccine === null || vaccine === void 0 ? void 0 : vaccine.description,
                            requestedDate: new Date(),
                            medicine: { connect: { petId: parseInt(petId) } },
                            linkedConsultDebitId: res.id,
                        },
                    });
                }));
            }
            yield accumulatorService_1.accumulatorService.addPriceToAccum(vaccine === null || vaccine === void 0 ? void 0 : vaccine.price, accId);
            reply.status(201).send("Vacina adicionada ao PET");
        }
        catch (error) {
            reply.send({ message: error });
            console.log(error);
        }
    }),
    removePetVaccine: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const DeleteVaccineForPetSchema = zod_1.z.object({
            id: zod_1.z.coerce.number(),
            accId: zod_1.z.coerce.number(),
            vaccinePrice: zod_1.z.any(),
            linkedDebitId: zod_1.z.coerce.number(),
        });
        try {
            const { id, accId, vaccinePrice, linkedDebitId } = DeleteVaccineForPetSchema.parse(request.params);
            yield accumulatorService_1.accumulatorService.removePriceToAccum(Number(vaccinePrice), accId);
            yield PrismaInstance_1.prisma.petConsultsDebits
                .delete({
                where: {
                    id: linkedDebitId,
                },
            })
                .then(() => __awaiter(void 0, void 0, void 0, function* () {
                yield PrismaInstance_1.prisma.vaccinesForPet.delete({
                    where: { id: id },
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
    removeVaccine: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, accId, examPrice } = request.params;
        try {
            yield accumulatorService_1.accumulatorService.removePriceToAccum(Number(examPrice), accId);
            yield PrismaInstance_1.prisma.vaccinesForPet.delete({
                where: { id: parseInt(id) },
            });
            reply.status(200).send("Sucesso ao deletar");
        }
        catch (error) {
            console.log(error);
        }
    }),
};
