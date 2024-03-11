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
exports.accountService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.accountService = {
    creditCustomerAccount: (customerId, values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.customerAccount.update({
                where: { id: parseInt(customerId) },
                data: { credits: { increment: values } },
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    pushDebitsToAccount: (customerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const customer = yield prisma.customer.findUnique({
                where: { id: parseInt(customerId) },
                include: { pets: { select: { debits: true } }, customerAccount: true },
            });
            if (!customer) {
                return;
            }
            let totalDebits = customer === null || customer === void 0 ? void 0 : customer.pets.map((pet) => {
                let totalToPay = pet.debits;
            });
            yield prisma.customer.update({
                where: { id: parseInt(customerId) },
                data: {
                    customerAccount: {
                        update: { debits: { increment: Number(totalDebits) } },
                    },
                },
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    debitCustomerAccount: (customerId, values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.customerAccount.update({
                where: { id: parseInt(customerId) },
                data: {
                    debits: { increment: values },
                },
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    installmentDebit: (accountId, boxId, fatherBoxId, totalDebit, installmentAmount, debitName, paymentType, consultId, admissionId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const actualDate = new Date();
            const amountInstallments = totalDebit / installmentAmount;
            yield prisma.installmentsDebts
                .create({
                data: {
                    paymentDate: actualDate,
                    amountInstallments,
                    totalDebit,
                    installmentAmount,
                    paymentType,
                    debitName,
                    customerAccount: {
                        connect: { customerId: accountId },
                    },
                    boxHistory: { connect: { id: boxId } },
                },
            })
                .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                yield prisma.installmentsDebts.update({
                    where: { id: res.id },
                    data: {
                        consultPetId: consultId ? consultId : null,
                        admissionsPetId: admissionId ? admissionId : null,
                    },
                });
            }));
            yield prisma.hospVetBox
                .findUnique({ where: { id: fatherBoxId } })
                .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                yield prisma.hospVetBox.update({
                    where: { id: res === null || res === void 0 ? void 0 : res.id },
                    data: {
                        movimentedValues: Number(res === null || res === void 0 ? void 0 : res.movimentedValues) + Number(totalDebit),
                    },
                });
            }));
            yield prisma.customer.update({
                where: { id: accountId },
                data: {
                    customerAccount: {
                        update: {
                            debits: { decrement: totalDebit },
                            admissionId: admissionId ? "" : admissionId,
                            consultId: consultId ? "" : consultId,
                        },
                    },
                },
            });
            if (consultId) {
                yield prisma.openedConsultsForPet.update({
                    where: { id: consultId }, data: { totaLDebits: 0 }
                });
            }
            else if (admissionId) {
                yield prisma.openededAdmissionsForPet.update({
                    where: { id: admissionId }, data: { totaLDebits: 0 }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
};
