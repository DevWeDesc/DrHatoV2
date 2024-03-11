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
exports.GetDebitsInConsultsService = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
class GetDebitsInConsultsService {
    execute({ queueId, isAdmission }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let debits;
            if (isAdmission === true) {
                debits = yield PrismaInstance_1.prisma.openededAdmissionsForPet.findMany({
                    where: {
                        id: queueId
                    },
                    include: {
                        consultDebits: true
                    }
                });
                const total = (_a = debits[0]) === null || _a === void 0 ? void 0 : _a.consultDebits.reduce((acc, total) => {
                    acc.total += Number(total.price);
                    return acc;
                }, { total: 0 });
                return {
                    total: total === null || total === void 0 ? void 0 : total.total,
                    debits: debits
                };
            }
            else {
                debits = yield PrismaInstance_1.prisma.openedConsultsForPet.findMany({
                    where: {
                        id: queueId
                    },
                    include: {
                        consultDebits: true
                    }
                });
                const total = (_b = debits[0]) === null || _b === void 0 ? void 0 : _b.consultDebits.reduce((acc, total) => {
                    acc.total += Number(total.price);
                    return acc;
                }, { total: 0 });
                return {
                    total: total === null || total === void 0 ? void 0 : total.total,
                    debits: debits
                };
            }
        });
    }
}
exports.GetDebitsInConsultsService = GetDebitsInConsultsService;
