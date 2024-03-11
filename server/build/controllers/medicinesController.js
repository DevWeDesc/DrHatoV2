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
exports.medicinesController = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
const accumulatorService_1 = require("../services/accumulatorService");
exports.medicinesController = {
    createMedicineGroup: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title } = request.body;
            yield PrismaInstance_1.prisma.medicinesGroups.create({
                data: { title }
            });
            reply.send("Grupo de medicamentos criado com sucesso!");
        }
        catch (error) {
            reply.send({ message: error });
            console.log(error);
        }
    }),
    createMedicine: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { medicineGroupId } = request.params;
            const { title, price, dosage, observations, unitMeasurement, stock } = request.body;
            yield PrismaInstance_1.prisma.medicine.create({
                data: { title, dosage, price, unitMeasurement, observations, stock, MedicinesGroups: {
                        connect: { id: parseInt(medicineGroupId) }
                    } }
            });
            reply.send("Medicamento criado com sucesso!").status(201);
        }
        catch (error) {
            reply.send({ message: error });
            console.log(error);
        }
    }),
    setMedicineInPet: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { medicineId, petId, accId, queueId, } = request.params;
            const { RequestedByVetId, RequestedByVetName, InAdmission, dosage } = request.body;
            const medicine = yield PrismaInstance_1.prisma.medicine.findUnique({ where: { id: parseInt(medicineId) } });
            if (!medicine)
                return;
            if (InAdmission === true) {
                yield PrismaInstance_1.prisma.petConsultsDebits.create({
                    data: {
                        OpenedAdmissionsForPet: { connect: { id: queueId } },
                        isProcedure: true,
                        name: medicine.title,
                        price: medicine.price,
                        itemId: medicine.id,
                        RequestedByVetId,
                        RequestedByVetName,
                    }
                });
            }
            else {
                yield PrismaInstance_1.prisma.petConsultsDebits.create({
                    data: {
                        OpenedConsultsForPet: { connect: { id: queueId } },
                        isProcedure: true,
                        name: medicine.title,
                        price: medicine.price,
                        itemId: medicine.id,
                        RequestedByVetId,
                        RequestedByVetName,
                    }
                });
            }
            yield PrismaInstance_1.prisma.medicinesForPets.create({
                data: { title: medicine.title, unitMeasurement: medicine.unitMeasurement, dosageApplication: dosage, isPaid: true,
                    MedicineRecord: { connect: { petId: parseInt(petId) } }
                }
            });
            yield accumulatorService_1.accumulatorService.addPriceToAccum(medicine.price, accId);
            reply.send("Medicado com sucesso!").status(201);
        }
        catch (error) {
            console.log(error);
            reply.send({ message: error });
        }
    }),
    getPetMedicineHistory: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { petId } = request.params;
            const petHistory = yield PrismaInstance_1.prisma.pets.findUnique({ where: { id: parseInt(petId) }, include: {
                    medicineRecords: { select: { petMedicines: true } }
                } });
            reply.send({
                history: (_a = petHistory === null || petHistory === void 0 ? void 0 : petHistory.medicineRecords) === null || _a === void 0 ? void 0 : _a.petMedicines,
            });
        }
        catch (error) {
            reply.send({ message: error });
            console.log(error);
        }
    }),
    getAllMedicinesGroupsAndMedicines: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const medicines = yield PrismaInstance_1.prisma.medicinesGroups.findMany({
                include: { medicines: true }
            });
            const allMedicines = yield PrismaInstance_1.prisma.medicine.findMany();
            const filtredMedicines = allMedicines.map((medicine) => {
                let data = {
                    id: medicine.id,
                    name: medicine.title,
                    stock: medicine.stock
                };
                return data;
            });
            reply.send({ filtredMedicines, medicines });
        }
        catch (error) {
            reply.send({ message: error });
            console.log(error);
        }
    }),
    getMedicineById: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { medicineId } = request.params;
            const medicine = yield PrismaInstance_1.prisma.medicine.findUnique({
                where: { id: parseInt(medicineId) }
            });
            reply.send(medicine);
        }
        catch (error) {
            reply.send({ message: error });
            console.log(error);
        }
    }),
    getMedicineByQuery: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { query } = request.query;
            const medicines = yield PrismaInstance_1.prisma.medicine.findMany({
                where: { title: { contains: query } }
            });
            reply.send({
                medicines
            });
        }
        catch (error) {
            reply.send({ message: error });
            console.log(error);
        }
    }),
    getMedicinesOnPets: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { CodAnimal } = request.params;
        try {
            const medicines = yield PrismaInstance_1.prisma.medicinesForPets.findMany({
                where: { MedicineRecord: {
                        pet: {
                            id: parseInt(CodAnimal)
                        }
                    } }
            });
            reply.send({
                medicines
            });
        }
        catch (error) {
            reply.send({
                message: error
            });
        }
    }),
    removeMedicineOnPet: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { appliedId, queueId } = request.params;
            const { title, itemId, date } = request.body;
            yield PrismaInstance_1.prisma.medicinesForPets.delete({
                where: { id: parseInt(appliedId) }
            });
            yield PrismaInstance_1.prisma.petConsultsDebits.deleteMany({
                where: {
                    name: title,
                    itemId,
                    requestedDate: date,
                    openedConsultsForPetId: queueId
                },
            });
            reply.send("Excluido com sucesso!");
        }
        catch (error) {
            reply.send({
                message: error
            });
        }
    })
};
