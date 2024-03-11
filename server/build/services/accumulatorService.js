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
exports.accumulatorService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.accumulatorService = {
    addPriceToAccum: (values, id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const actualValue = yield prisma.pricesAccumulator.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            if (!actualValue)
                return;
            const total = Number(actualValue.accumulator) + Number(values);
            yield prisma.pricesAccumulator.update({
                where: { id: parseInt(id) },
                data: { accumulator: total }
            });
            return total;
        }
        catch (error) {
            console.log(error);
        }
    }),
    removePriceToAccum: (values, id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const actualValue = yield prisma.pricesAccumulator.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
            if (!actualValue)
                return;
            let total = Number(actualValue.accumulator) - Number(values);
            if (total < 0) {
                total = 0;
            }
            yield prisma.pricesAccumulator.update({
                where: { id: parseInt(id) },
                data: { accumulator: total }
            });
            return total;
        }
        catch (error) {
            console.log(error);
        }
    }),
};
