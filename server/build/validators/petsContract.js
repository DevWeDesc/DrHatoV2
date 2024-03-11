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
exports.PetsContract = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
class PetsContract {
    constructor() {
        this.errors = [];
    }
    customerAlreadyExists(value, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerExits = yield PrismaInstance_1.prisma.customer.findUnique({
                where: { cpf: value },
            });
            if (customerExits) {
                this.errors.push(message);
            }
        });
    }
    verifyIfIsPossibleEndQueue(id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const petExams = yield PrismaInstance_1.prisma.examsForPet.findMany({
                where: { medicine_id: parseInt(id), doneExame: false }
            });
            if (petExams.length >= 1) {
                this.errors.push(message);
            }
        });
    }
    showErrors() {
        return this.errors;
    }
    hadError() {
        if (this.errors.length >= 1)
            return true;
    }
    clearErrors() {
        this.errors = [];
    }
}
exports.PetsContract = PetsContract;
