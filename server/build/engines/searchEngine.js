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
exports.searchEngine = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
function searchEngine({ customerName, petName, codPet, finalDate, initialDate, isFinished, isHospitalized, typePaymentClient, }) {
    return __awaiter(this, void 0, void 0, function* () {
        let responseArray = [];
        switch (true) {
            case !!customerName && !!petName:
                const customerAndPetsResults = yield PrismaInstance_1.prisma.customer.findMany({
                    where: {
                        AND: [
                            { name: { startsWith: customerName } },
                            { pets: { some: { name: { startsWith: petName } } } },
                        ],
                    },
                    include: { pets: true },
                });
                responseArray = responseArray.concat(customerAndPetsResults);
                break;
            case !!customerName:
                const customerResults = yield PrismaInstance_1.prisma.pets.findMany({
                    where: { customer: { name: { startsWith: customerName } } },
                    include: { customer: true },
                });
                responseArray = responseArray.concat(customerResults);
                break;
            case !!petName:
                const petResults = yield PrismaInstance_1.prisma.pets.findMany({
                    where: { name: { startsWith: petName } },
                    include: { customer: true },
                });
                responseArray = responseArray.concat(petResults);
                break;
            case !!codPet:
                const codPetResulst = yield PrismaInstance_1.prisma.pets.findFirst({
                    where: { codPet: { startsWith: codPet } },
                    include: { customer: true },
                });
                responseArray = responseArray.concat(codPetResulst);
                break;
            case !!isFinished:
                const isFinishedResults = yield PrismaInstance_1.prisma.queuesForPet.findMany({
                    where: { queueIsDone: true },
                    include: {
                        medicine: {
                            include: {
                                pet: {
                                    select: {
                                        name: true,
                                        id: true,
                                        customer: { select: { name: true, cpf: true } },
                                    },
                                },
                            },
                        },
                    },
                });
                responseArray = responseArray.concat(isFinishedResults);
                break;
            case !!typePaymentClient:
                const IstypePaymentClientResult = yield PrismaInstance_1.prisma.queuesForPet.findMany({
                    where: { queueIsDone: true },
                    include: {
                        medicine: {
                            include: {
                                pet: {
                                    select: {
                                        name: true,
                                        id: true,
                                        customer: { select: { name: true, cpf: true } },
                                    },
                                },
                            },
                        },
                    },
                });
                responseArray = responseArray.concat(IstypePaymentClientResult);
                break;
        }
        if (responseArray.length <= 0)
            return null;
        return responseArray;
    });
}
exports.searchEngine = searchEngine;
