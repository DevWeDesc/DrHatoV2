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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.examsPartsController = void 0;
const zod_1 = __importDefault(require("zod"));
const PrismaInstance_1 = require("../interface/PrismaInstance");
exports.examsPartsController = {
    createExamPartSession: (req, rep) => __awaiter(void 0, void 0, void 0, function* () {
        const CreatePartExamParamsSchema = zod_1.default.object({
            codexam: zod_1.default.coerce.number()
        });
        const { codexam } = CreatePartExamParamsSchema.parse(req.params);
        const CreatePartExamBodySchema = zod_1.default.object({
            partName: zod_1.default.string(),
            isMultiPart: zod_1.default.boolean().optional(),
            isByText: zod_1.default.boolean().optional(),
            isFirst: zod_1.default.boolean().optional(),
        });
        const data = __rest(CreatePartExamBodySchema.parse(req.body), []);
        try {
            if (data.isMultiPart) {
            }
            else if (data.isByText) {
            }
            else {
                yield PrismaInstance_1.prisma.partExams.create({
                    data: {
                        isFirst: true,
                        partName: data.partName,
                        OldExams: {
                            connect: { codexam }
                        },
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    createExamPartCharacteristics: (req, rep) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const CreatePartCharacteristicsParamSchema = zod_1.default.object({
                sessionId: zod_1.default.coerce.number()
            });
            const { sessionId } = CreatePartCharacteristicsParamSchema.parse(req.params);
            const CreatePartCharacteristicsBodySchema = zod_1.default.object({
                caracteristic: zod_1.default.string().optional(),
                relativeUnit: zod_1.default.string().optional(),
                absoluteUnit: zod_1.default.string().optional(),
                agesOne: zod_1.default.string().optional(),
                minAgesOne: zod_1.default.string().optional(),
                maxAgesOne: zod_1.default.string().optional(),
                agesTwo: zod_1.default.string().optional(),
                minAgesTwo: zod_1.default.string().optional(),
                maxAgesTwo: zod_1.default.string().optional(),
                agesThree: zod_1.default.string().optional(),
                minAgesThree: zod_1.default.string().optional(),
                maxAgesThree: zod_1.default.string().optional(),
                parts: zod_1.default.number().optional(),
            });
            const data = __rest(CreatePartCharacteristicsBodySchema.parse(req.body), []);
            yield PrismaInstance_1.prisma.partDetails.create({
                data: {
                    caracteristic: data.caracteristic,
                    relativeUnit: data.relativeUnit,
                    absoluteUnit: data.absoluteUnit,
                    agesOne: data.agesOne,
                    minAgesOne: data.minAgesOne,
                    maxAgesOne: data.maxAgesOne,
                    agesTwo: data.agesTwo,
                    minAgesTwo: data.minAgesTwo,
                    maxAgesTwo: data.maxAgesTwo,
                    agesThree: data.agesThree,
                    minAgesThree: data.minAgesThree,
                    maxAgesThree: data.maxAgesThree,
                    parts: data.parts,
                    PartExams: {
                        connect: {
                            id: sessionId
                        }
                    }
                }
            });
            rep.status(201).send({ message: 'Criado com sucesso!' });
        }
        catch (error) {
            console.log(error);
            rep.send(error);
        }
    })
};
