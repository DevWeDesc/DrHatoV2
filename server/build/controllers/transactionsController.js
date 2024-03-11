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
exports.transactionController = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
const zod_1 = require("zod");
exports.transactionController = {
    getAllTransactions: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield PrismaInstance_1.prisma.transaction.findMany();
        return reply.send(data);
    }),
    getCustomerTransactions: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const IdSchema = zod_1.z.object({
            id: zod_1.z.string(),
        });
        const { id } = IdSchema.parse(request.params);
        try {
            const userTransactions = yield PrismaInstance_1.prisma.transaction.findMany({
                where: { transaction_id: parseInt(id) }
            });
            reply.send(userTransactions);
        }
        catch (error) {
            reply.status(404).send(error);
            console.error(error);
        }
    }),
    createTransaction: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, amount, type, category, createdAt, customerId } = request.body;
        try {
            yield PrismaInstance_1.prisma.transaction.create({
                data: { title, amount, type, category, createdAt, customer: { connect: { id: parseInt(customerId) } } }
            });
        }
        catch (error) {
            console.log(error);
            reply.send(error);
        }
    }),
    deleteUser: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            yield PrismaInstance_1.prisma.transaction.delete({ where: { id: parseInt(id) } });
        }
        catch (error) {
            console.log(error);
        }
    })
};
