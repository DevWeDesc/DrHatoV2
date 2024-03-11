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
exports.autorizationsController = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const AutorizationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    text: zod_1.z.string()
});
exports.autorizationsController = {
    createAutorization: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, text } = AutorizationSchema.parse(request.body);
        yield prisma.autorizations.create({
            data: { name, text }
        });
    }),
    showAutorization: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const autorizations = yield prisma.autorizations.findMany();
        reply.send(autorizations);
    }),
    searchAutorizaton: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = request.params;
        const autorization = yield prisma.autorizations.findFirst({
            where: { id: parseInt(id) }
        });
        reply.send(autorization);
    }),
    editAutorizaton: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const Schema = zod_1.z.object({
            name: zod_1.z.string().optional(),
            text: zod_1.z.string()
        });
        const { id } = request.params;
        const { name, text } = Schema.parse(request.body);
        const autorization = yield prisma.autorizations.update({ where: { id: parseInt(id) }, data: { name, text } });
        reply.status(201).send(autorization);
    })
};
