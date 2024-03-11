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
exports.petsDebitsController = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
exports.petsDebitsController = {
    getPetDebits: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const { petId } = request.params;
            const debits = yield PrismaInstance_1.prisma.petConsultsDebits.findMany({
                where: {
                    requestedDate: {
                        gte: today
                    },
                    OpenedConsultsForPet: {
                        MedicineRecord: {
                            petId: parseInt(petId)
                        }
                    }
                }
            });
            reply.send({
                debits
            });
        }
        catch (error) {
            reply.send({
                message: error
            });
            console.log(error);
        }
    }),
    getDebitsInQueue: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { queueId } = request.params;
            const debits = yield PrismaInstance_1.prisma.openedConsultsForPet.findMany({
                where: {
                    id: queueId
                }, include: {
                    consultDebits: true
                }
            });
            const total = (_b = (_a = debits[0]) === null || _a === void 0 ? void 0 : _a.consultDebits) === null || _b === void 0 ? void 0 : _b.reduce((acc, total) => {
                acc.total += Number(total.price);
                return acc;
            }, { total: 0 });
            reply.send({
                debits,
                total
            });
        }
        catch (error) {
            reply.send({
                message: error
            });
            console.log(error);
        }
    }),
    getDebitsInAdmission: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
        try {
            const { queueId } = request.params;
            const debits = yield PrismaInstance_1.prisma.openededAdmissionsForPet.findMany({
                where: {
                    id: queueId
                }, include: {
                    consultDebits: true
                }
            });
            const total = (_d = (_c = debits[0]) === null || _c === void 0 ? void 0 : _c.consultDebits) === null || _d === void 0 ? void 0 : _d.reduce((acc, total) => {
                acc.total += Number(total.price);
                return acc;
            }, { total: 0 });
            reply.send({
                debits,
                total
            });
        }
        catch (error) {
            reply.send({
                message: error
            });
            console.log(error);
        }
    })
};
