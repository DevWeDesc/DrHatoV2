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
exports.accountController = void 0;
const accountService_1 = require("../services/accountService");
const zod_1 = require("zod");
exports.accountController = {
    creditAccount: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { customerId } = request.params;
        const { values } = request.body;
        try {
            yield accountService_1.accountService.creditCustomerAccount(customerId, values);
            reply.send("Conta creditada com sucesso!");
        }
        catch (error) {
            console.log(error);
        }
    }),
    debitAccount: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { customerId } = request.params;
        const { values } = request.body;
        try {
            yield accountService_1.accountService.debitCustomerAccount(customerId, values);
            reply.send("Conta debitada com sucesso!");
        }
        catch (error) {
            console.log(error);
        }
    }),
    payInInstallments: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const PayInstallmentSchema = zod_1.z.object({
            customerId: zod_1.z.coerce.number(),
            histBoxId: zod_1.z.coerce.number(),
            fatherBoxId: zod_1.z.coerce.number(),
        });
        const { customerId, histBoxId, fatherBoxId } = PayInstallmentSchema.parse(request.params);
        const { totalDebit, installmentAmount, debitName, paymentType, consultId, admissionId, } = request.body;
        try {
            yield accountService_1.accountService.installmentDebit(customerId, histBoxId, fatherBoxId, totalDebit, installmentAmount, debitName, paymentType, consultId, admissionId);
            reply.send("Parcelado com sucesso!");
        }
        catch (error) {
            console.log(error);
        }
    }),
    getProceduresDebited: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { medicineId } = request.params;
        try {
        }
        catch (error) { }
    }),
};
