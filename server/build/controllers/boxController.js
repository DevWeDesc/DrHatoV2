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
exports.boxController = void 0;
const zod_1 = require("zod");
const PrismaInstance_1 = require("../interface/PrismaInstance");
const boxSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    entryValues: zod_1.z.number().optional(),
    exitValues: zod_1.z.number().optional(),
    movimentedValues: zod_1.z.number().optional(),
    boxIsOpen: zod_1.z.boolean().optional(),
    openBy: zod_1.z.string().optional(),
    closedBy: zod_1.z.string().optional(),
});
exports.boxController = {
    createReturnsBoxByUser: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const paramsSchema = zod_1.z.object({
            boxId: zod_1.z.string(),
            customerId: zod_1.z.string(),
            installmentId: zod_1.z.string(),
        });
        const { boxId, customerId, installmentId } = paramsSchema.parse(request.params);
        const bodySchema = zod_1.z.object({
            reasonForReturn: zod_1.z.string(),
            userName: zod_1.z.string(),
            password: zod_1.z.string(),
            value: zod_1.z.string(),
        });
        const { reasonForReturn, userName, value } = bodySchema.parse(request.body);
        try {
            yield PrismaInstance_1.prisma.returnsClientBox
                .findUnique({
                where: { id: Number(installmentId) },
            })
                .then((res) => {
                if (res != null) {
                    return reply
                        .status(400)
                        .send("Já foi efetuada a devolução nessa compra!");
                }
            });
            yield PrismaInstance_1.prisma.user
                .findUnique({ where: { username: userName } })
                .then((res) => {
                if (res == null) {
                    return reply.status(400).send("Usuário não encontrado!");
                }
            });
            var returnCreated = yield PrismaInstance_1.prisma.returnsClientBox.create({
                data: {
                    reasonForReturn: reasonForReturn,
                    value: value,
                    idInstallment: Number(installmentId),
                    idHospVetBox: Number(boxId),
                    idCustomer: Number(customerId),
                },
            });
            yield PrismaInstance_1.prisma.hospVetBox
                .findUnique({
                where: { id: parseInt(boxId) },
            })
                .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                yield PrismaInstance_1.prisma.hospVetBox.update({
                    where: { id: res === null || res === void 0 ? void 0 : res.id },
                    data: {
                        movimentedValues: Number(res === null || res === void 0 ? void 0 : res.movimentedValues) - Number(value),
                    },
                });
            }));
            reply.status(201).send(returnCreated);
        }
        catch (err) {
            reply.status(400).send(err);
        }
    }),
    getAllReturns: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const allReturns = yield PrismaInstance_1.prisma.returnsClientBox.findMany({
            include: {
                customerAccount: { include: { customer: true } },
                hospVetBox: true,
                installment: true,
            },
        });
        reply.status(200).send(allReturns);
    }),
    getAllDebits: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var installments = yield PrismaInstance_1.prisma.installmentsDebts.findMany({
            include: { customerAccount: true },
        });
        try {
            reply.status(200).send(installments);
        }
        catch (err) {
            reply.status(400).send(err);
        }
    }),
    getDebitsByBox: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const DebitsByBoxSchema = zod_1.z.object({
            boxId: zod_1.z.string(),
        });
        const { boxId } = DebitsByBoxSchema.parse(request.params);
        var installments = yield PrismaInstance_1.prisma.installmentsDebts.findMany({
            where: { boxHistoryId: Number(boxId) },
            include: { customerAccount: { include: { customer: true } } },
        });
        var usersInInstallments = yield PrismaInstance_1.prisma.customer.findMany({
            where: {
                customerAccount: {
                    installments: { some: { boxHistoryId: Number(boxId) } },
                },
            },
            include: { customerAccount: { include: { installments: true } } },
        });
        try {
            reply
                .status(200)
                .send({ Installments: installments, customers: usersInInstallments });
        }
        catch (err) {
            reply.status(400).send(err);
        }
    }),
    createVetBox: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, boxIsOpen } = boxSchema.parse(request.body);
        try {
            if (!name)
                return;
            yield PrismaInstance_1.prisma.hospVetBox.create({
                data: {
                    name,
                    boxIsOpen: boxIsOpen,
                    entryValues: 0,
                    exitValues: 0,
                    movimentedValues: 0,
                },
            });
            reply.send("Caixa criado com sucesso");
        }
        catch (error) {
            console.log(error);
            reply.send(error);
        }
    }),
    showVetBox: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const boxs = yield PrismaInstance_1.prisma.hospVetBox.findMany({
                include: { historyBox: true },
            });
            reply.send(boxs[0]);
        }
        catch (error) {
            console.log(error);
            reply.send(error);
        }
    }),
    showDailyBox: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const dailyBox = yield PrismaInstance_1.prisma.hospBoxHistory.findFirst({
                where: { boxIsOpen: true },
            });
            reply.send(dailyBox);
        }
        catch (error) {
            console.log(error);
        }
    }),
    showlastBoxClosed: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const boxs = yield PrismaInstance_1.prisma.hospBoxHistory.findMany({
                where: { boxIsOpen: false },
            });
            const lastBox = boxs[boxs.length - 1];
            reply.send(lastBox);
        }
        catch (error) {
            console.log(error);
        }
    }),
    openBoxDaily: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { entryValues, exitValues, openBy } = boxSchema.parse(request.body);
        const { boxId } = request.params;
        try {
            const actualDate = new Date();
            if (!entryValues || !exitValues) {
                return;
            }
            const dailyBox = yield PrismaInstance_1.prisma.hospBoxHistory.create({
                data: {
                    openBox: actualDate,
                    entryValues,
                    exitValues,
                    boxIsOpen: true,
                    openBy,
                    totalValues: entryValues - exitValues,
                    HospVetBox: { connect: { id: parseInt(boxId) } },
                },
            });
            yield PrismaInstance_1.prisma.hospVetBox.update({
                where: { id: parseInt(boxId) },
                data: { boxIsOpen: true },
            });
            reply.send(dailyBox);
        }
        catch (error) {
            console.log(error);
        }
    }),
    closeBoxDaily: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const ParamsSchema = zod_1.z.object({
            vetBox: zod_1.z.coerce.number(),
            boxId: zod_1.z.coerce.number(),
        });
        const { boxId, vetBox } = ParamsSchema.parse(request.params);
        const { entryValues, exitValues, closedBy } = boxSchema.parse(request.body);
        try {
            const customers = yield PrismaInstance_1.prisma.customer.findMany({
                where: {
                    customerAccount: { debits: { gte: 1 }, clientIsVip: false },
                },
                include: {
                    customerAccount: true,
                },
            });
            const accounts = customers.map((customer) => {
                return customer.customerAccount;
            });
            if (accounts) {
                const debits = accounts.reduce((acc, account) => {
                    return acc += Number(account === null || account === void 0 ? void 0 : account.debits);
                }, 0);
                if (debits >= 1) {
                    return reply
                        .status(400)
                        .send("Não é possivel fechar o caixa, pois tem débitos em aberto!");
                }
            }
            const dailyBox = yield PrismaInstance_1.prisma.hospBoxHistory.findUnique({
                where: { id: boxId },
            });
            const fatherBox = yield PrismaInstance_1.prisma.hospVetBox.findUnique({ where: { id: vetBox } });
            if (!dailyBox) {
                return;
            }
            let totalMovimentendValues = Number(fatherBox === null || fatherBox === void 0 ? void 0 : fatherBox.entryValues) +
                Number(fatherBox === null || fatherBox === void 0 ? void 0 : fatherBox.exitValues);
            let totalValues = Number(dailyBox.entryValues) -
                Number(dailyBox.exitValues);
            const dailyVetBox = yield PrismaInstance_1.prisma.hospVetBox
                .update({
                where: { id: vetBox },
                data: {
                    entryValues: { increment: Number(dailyBox.entryValues) },
                    exitValues: {
                        increment: Number(dailyBox.exitValues),
                    },
                    movimentedValues: totalMovimentendValues,
                    historyBox: {
                        update: {
                            where: { id: boxId },
                            data: {
                                closeBox: new Date(),
                                entryValues: { increment: entryValues },
                                exitValues: { increment: exitValues },
                                totalValues,
                                closedBy,
                                boxIsOpen: false,
                            },
                        },
                    },
                },
            });
            reply.send({
                dailyVetBox
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    showCustomerDebitsOpen: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const accounts = yield PrismaInstance_1.prisma.customer.findMany({
                where: { customerAccount: { debits: { gte: 1 } } },
                include: {
                    customerAccount: true,
                },
            });
            reply.send(accounts);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getDailyBoxInstallments: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const DailyBoxInstallmentSchema = zod_1.z.object({
                dailyBoxId: zod_1.z.coerce.number()
            });
            const { dailyBoxId } = DailyBoxInstallmentSchema.parse(request.params);
            const box = yield PrismaInstance_1.prisma.hospBoxHistory.findMany({
                where: {
                    id: dailyBoxId
                },
                include: {
                    installments: true
                }
            });
            return {
                box
            };
        }
        catch (error) {
            console.log(error);
        }
    })
};
