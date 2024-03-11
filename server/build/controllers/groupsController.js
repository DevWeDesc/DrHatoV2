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
exports.groupsController = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
const schemasValidator_1 = require("../schemas/schemasValidator");
exports.groupsController = {
    createGroup: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = schemasValidator_1.GroupSchema.parse(request.body);
        try {
            yield PrismaInstance_1.prisma.groups.create({ data: { name: name } });
            reply.status(200).send("Grupo criado com Sucesso!");
        }
        catch (error) {
            console.log(error);
            reply.status(400).send({ error });
        }
    }),
    getGroups: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const groups = yield PrismaInstance_1.prisma.groups.findMany();
            reply.send(groups);
        }
        catch (error) {
            console.log(error);
            reply.status(400).send({ error });
        }
    })
};
