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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsTypeController = void 0;
const client_1 = __importDefault(require("../client"));
const zod_1 = require("zod");
const PaymentsTypeSchema = zod_1.z.object({
    id: zod_1.z.number(),
    type: zod_1.z.string(),
});
exports.paymentsTypeController = {
    getAllPaymentsType: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            reply.send(yield client_1.default.paymentsType.findMany());
        }
        catch (error) {
            console.log(error);
        }
    }),
    getPaymentTypeById: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const payment = yield client_1.default.paymentsType.findUnique({ where: id });
            reply.send({ payment });
        }
        catch (error) {
            console.log(error);
        }
    }),
    createPaymentType: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const PaymentsTypechema = zod_1.z.object({
            typePayment: zod_1.z.string(),
        });
        const { typePayment } = PaymentsTypechema.parse(request.body);
        yield client_1.default.paymentsType.create({ data: { typePayment } });
        reply.send("Tipo de pagamento criado com sucesso!");
    }),
    editPaymentType: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const Schema = zod_1.z.object({
            typePayment: zod_1.z.string(),
        });
        const { id } = request.params;
        const { typePayment } = Schema.parse(request.body);
        const payment = yield client_1.default.paymentsType.update({
            where: { id: parseInt(id) },
            data: { typePayment },
        });
        reply.status(201).send(payment);
    }),
    deletePaymentType: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = request.params;
        yield client_1.default.paymentsType.delete({
            where: { id: parseInt(id) },
        });
        reply.status(201).send("Tipo de pagamento deletado com sucesso!");
    }),
};
