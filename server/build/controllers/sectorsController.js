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
exports.sectorsController = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
const zod_1 = require("zod");
const SectorSchema = zod_1.z.object({
    name: zod_1.z.string(),
});
exports.sectorsController = {
    createSector: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = SectorSchema.parse(request.body);
        try {
            yield PrismaInstance_1.prisma.sectors.create({ data: { name: name } });
            reply.status(201);
        }
        catch (error) {
            console.log(error);
            reply.status(400);
        }
    }),
    getSectors: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const sectors = yield PrismaInstance_1.prisma.sectors.findMany();
            reply.send(sectors).status(200);
        }
        catch (error) {
            console.log(error);
            reply.status(400);
        }
    }),
    editSector: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = request.params;
        const { name } = SectorSchema.parse(request.body);
        try {
            yield PrismaInstance_1.prisma.sectors.update({ where: { id: parseInt(id) }, data: { name: name } });
            reply.send("Editado com Sucesso").status(202);
        }
        catch (error) {
            console.log(error);
            reply.status(400);
        }
    }),
    deleteSector: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            yield PrismaInstance_1.prisma.sectors.delete({ where: { id: parseInt(id) } });
            reply.send("Excluido com Sucesso").status(204);
        }
        catch (error) {
            console.log(error);
            reply.status(400);
        }
    })
};
