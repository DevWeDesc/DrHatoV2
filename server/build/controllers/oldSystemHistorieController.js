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
exports.oldSystemHistorieController = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
const ResouceNotFoundError_1 = require("../errors/ResouceNotFoundError");
exports.oldSystemHistorieController = {
    getPetOldExams: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { petId } = request.params;
            const examsHistorie = yield PrismaInstance_1.prisma.oldExamsHistory.findMany({
                where: {
                    Pets: {
                        id: parseInt(petId)
                    }
                },
                include: { Pets: { select: { CodAnimal: true } } }
            });
            if (!examsHistorie) {
                throw new ResouceNotFoundError_1.ResourceNotFoundError();
            }
            reply.send({
                examsHistorie
            });
        }
        catch (error) {
            if (error instanceof ResouceNotFoundError_1.ResourceNotFoundError) {
                reply.status(404).send({
                    message: error.message,
                });
                console.log(error);
            }
        }
    })
};
