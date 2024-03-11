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
exports.examsController = void 0;
const accumulatorService_1 = require("../services/accumulatorService");
const PrismaInstance_1 = require("../interface/PrismaInstance");
const zod_1 = require("zod");
exports.examsController = {
    getById: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const exam = yield PrismaInstance_1.prisma.oldExams.findUnique({
                where: { codexam: parseInt(id) },
                include: {
                    appicableEspecies: true,
                    partExams: {
                        include: { examsDetails: true },
                    },
                },
            });
            reply.status(200).send(exam);
        }
        catch (error) {
            console.log(error);
            reply.status(400).send({ message: error });
        }
    }),
    removePetExam: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const DeleteExamForPetSchema = zod_1.z.object({
            id: zod_1.z.coerce.number(),
            accId: zod_1.z.coerce.number(),
            examPrice: zod_1.z.any(),
            linkedDebitId: zod_1.z.coerce.number(),
        });
        try {
            const { id, accId, examPrice, linkedDebitId } = DeleteExamForPetSchema.parse(request.params);
            yield accumulatorService_1.accumulatorService.removePriceToAccum(Number(examPrice), accId);
            yield PrismaInstance_1.prisma.petConsultsDebits.delete({
                where: {
                    id: linkedDebitId,
                },
            });
            yield PrismaInstance_1.prisma.examsForPet.delete({
                where: { id: id },
            });
            reply.status(203).send({
                message: "Deletado com sucesso!",
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    finishPetExam: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            yield PrismaInstance_1.prisma.examsForPet.update({
                where: { id: parseInt(id) },
                data: { doneExame: true },
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    getAllExams: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currentPage = Number(request.query.page) || 1;
            const totalExams = yield PrismaInstance_1.prisma.oldExams.count();
            const totalPages = Math.ceil(totalExams / 35);
            const exams = yield PrismaInstance_1.prisma.oldExams.findMany({
                skip: (currentPage - 1) * 35,
                take: 35,
                where: {
                    disponible: true,
                },
                include: {
                    appicableEspecies: true
                }
            });
            reply.send({ totalPages, totalExams, exams });
        }
        catch (error) {
            reply.send({
                message: error,
            });
        }
    }),
    getExamDetailById: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { examId } = request.params;
            const exam = yield PrismaInstance_1.prisma.oldExams.findUnique({
                where: {
                    codexam: parseInt(examId),
                },
                include: {
                    partExams: {
                        include: { examsDetails: true },
                    },
                    appicableEspecies: true
                },
            });
            reply.send({
                exam,
            });
        }
        catch (error) {
            reply.send({
                error,
            });
        }
    }),
    getByName: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { examName } = request.params;
            const response = yield PrismaInstance_1.prisma.oldExams.findMany({
                where: {
                    name: { contains: examName },
                },
                include: {
                    appicableEspecies: true
                }
            });
            reply.send(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getByLetter: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { firstLetter } = request.params;
            const response = yield PrismaInstance_1.prisma.oldExams.findMany({
                where: {
                    name: { startsWith: firstLetter.toUpperCase() },
                },
                include: {
                    appicableEspecies: true
                }
            });
            reply.send(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    setExamInPet: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { examId, petId, accId, queueId } = request.params;
            const { RequestedByVetId, RequestedByVetName, RequestedCrm, isAdmission, } = request.body;
            const exam = yield PrismaInstance_1.prisma.oldExams.findUnique({
                where: { codexam: parseInt(examId) },
            });
            if (!exam)
                return;
            if (isAdmission === true) {
                yield PrismaInstance_1.prisma.petConsultsDebits
                    .create({
                    data: {
                        OpenedAdmissionsForPet: { connect: { id: queueId } },
                        isExam: true,
                        name: exam.name,
                        price: exam.price,
                        itemId: exam.codexam,
                        RequestedByVetId,
                        RequestedByVetName,
                        sectorId: exam.sector,
                    },
                })
                    .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    yield PrismaInstance_1.prisma.examsForPet.create({
                        data: {
                            name: exam.name,
                            price: exam.price,
                            doneExame: false,
                            twoPart: exam.twoPart,
                            onePart: exam.onePart,
                            byReport: exam.byReport,
                            requesteData: new Date(),
                            requestedFor: RequestedByVetName,
                            requestedCrm: RequestedCrm,
                            examsType: exam.defaultLab ? ["lab"] : ["image"],
                            medicine: { connect: { petId: parseInt(petId) } },
                            LinkedAdmissionDebitId: res.id,
                        },
                    });
                }));
            }
            else {
                yield PrismaInstance_1.prisma.petConsultsDebits
                    .create({
                    data: {
                        OpenedConsultsForPet: { connect: { id: queueId } },
                        isExam: true,
                        name: exam.name,
                        price: exam.price,
                        itemId: exam.codexam,
                        RequestedByVetId,
                        RequestedByVetName,
                        sectorId: exam.sector,
                    },
                })
                    .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    yield PrismaInstance_1.prisma.examsForPet.create({
                        data: {
                            name: exam.name,
                            price: exam.price,
                            doneExame: false,
                            twoPart: exam.twoPart,
                            onePart: exam.onePart,
                            byReport: exam.byReport,
                            requesteData: new Date(),
                            requestedFor: RequestedByVetName,
                            requestedCrm: RequestedCrm,
                            examsType: exam.defaultLab ? ["lab"] : ["image"],
                            medicine: { connect: { petId: parseInt(petId) } },
                            linkedConsultDebitId: res.id,
                        },
                    });
                }));
            }
            yield accumulatorService_1.accumulatorService.addPriceToAccum(exam.price, accId);
            reply.status(201).send({
                message: "Exame adicionado com sucesso!",
            });
        }
        catch (error) {
            reply.send({
                error,
            });
        }
    }),
    createExam: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const CreateExamSchema = zod_1.z.object({
                name: zod_1.z.string(),
                price: zod_1.z.number(),
                disponible: zod_1.z.boolean(),
                onePart: zod_1.z.boolean(),
                twoPart: zod_1.z.boolean(),
                report: zod_1.z.boolean(),
                sector: zod_1.z.coerce.number()
            });
            const { disponible, name, onePart, price, report, twoPart, sector } = CreateExamSchema.parse(request.body);
            yield PrismaInstance_1.prisma.oldExams.create({
                data: {
                    name,
                    price,
                    onePart,
                    twoPart,
                    byReport: report,
                    disponible,
                    sector
                }
            });
            reply.status(201);
        }
        catch (error) {
            console.error(error);
        }
    }),
    deleteExam: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const DeletExamParams = zod_1.z.object({
                examId: zod_1.z.coerce.number()
            });
            const { examId } = DeletExamParams.parse(request.params);
            yield PrismaInstance_1.prisma.oldExams.delete({
                where: {
                    codexam: examId
                }
            });
            reply.status(204);
        }
        catch (error) {
            console.log(error);
        }
    }),
    setEspecieInExam: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { examId, especieId } = request.params;
            yield PrismaInstance_1.prisma.oldExams.update({
                where: { codexam: parseInt(examId) },
                data: {
                    appicableEspecies: {
                        connect: { id: parseInt(especieId) },
                    },
                },
            });
            reply.status(201);
        }
        catch (error) {
            reply.send(error).status(400);
        }
    }),
    removeEspecieInExam: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { examId, especieId } = request.params;
            yield PrismaInstance_1.prisma.oldExams.update({
                where: { codexam: parseInt(examId) },
                data: {
                    appicableEspecies: {
                        disconnect: {
                            id: parseInt(especieId)
                        }
                    }
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    })
};
