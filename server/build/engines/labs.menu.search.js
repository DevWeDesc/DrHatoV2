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
exports.LabsMenuSearch = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
class LabsMenuSearch {
    getWithParams({ petName, petCode, solicitedBy }) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            switch (true) {
                case !!petName:
                    data = yield PrismaInstance_1.prisma.pets.findMany({
                        where: {
                            name: { contains: petName },
                        }, include: {
                            medicineRecords: { select: { petExams: true } }
                        }
                    });
                    break;
                case !!petCode:
                    data = [];
                    const pet = yield PrismaInstance_1.prisma.pets.findFirst({
                        where: {
                            CodAnimal: Number(petCode),
                        }, include: {
                            medicineRecords: { select: { petExams: true } }
                        }
                    });
                    data.push(pet);
                    break;
                case !!solicitedBy:
                    data = yield PrismaInstance_1.prisma.examsForPet.findMany({
                        where: {
                            requestedFor: { contains: solicitedBy }
                        }, include: { medicine: { include: { pet: true } } }
                    });
                    break;
            }
            return {
                data
            };
        });
    }
}
exports.LabsMenuSearch = LabsMenuSearch;
