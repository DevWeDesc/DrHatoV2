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
exports.labsController = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
const labsService_1 = require("../services/labsService");
const zod_1 = require("zod");
exports.labsController = {
    getOpenExamsInLab: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exams = yield PrismaInstance_1.prisma.examsForPet.findMany({
                where: {
                    doneExame: false
                },
                orderBy: { requesteData: 'asc' },
                include: {
                    medicine: { select: { pet: { select: { name: true, id: true } } } }
                }
            });
            const examsdefault = yield PrismaInstance_1.prisma.oldExams.findMany({
                select: { codexam: true, name: true }
            });
            const allExams = examsdefault;
            reply.status(200).send({ exams, allExams });
        }
        catch (error) {
            reply.send({ message: { error } }).status(400);
            console.log(error);
        }
    }),
    getEndExamsInlab: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const exams = yield PrismaInstance_1.prisma.examsForPet.findMany({
                where: {
                    doneExame: true
                },
                orderBy: { requesteData: 'asc' },
                include: {
                    medicine: { select: { pet: { select: { name: true, id: true } } } }
                }
            });
            const examsdefault = yield PrismaInstance_1.prisma.oldExams.findMany({
                select: { codexam: true, name: true }
            });
            const allExams = examsdefault;
            reply.status(200).send({ exams, allExams });
        }
        catch (error) {
            reply.send({ message: { error } }).status(400);
            console.log(error);
        }
    }),
    searchExamsBy: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const name = request.query.name;
        const requesteData = request.query.data;
        const petName = request.query.petName;
        try {
            const result = yield PrismaInstance_1.prisma.examsForPet.findMany({
                where: {
                    OR: [
                        { requesteData: { gte: requesteData },
                            name: { startsWith: name },
                            medicine: { pet: { name: { startsWith: petName } } }
                        }
                    ]
                },
                include: { medicine: { select: { pet: { select: { name: true } } } } }
            });
            const completeResult = result.map((exam) => {
                let examData = {
                    id: exam.id,
                    name: exam.name,
                    price: exam.price,
                    data: exam.requesteData,
                    petName: exam.medicine.pet.name,
                    done: exam.doneExame,
                    requested: exam.requestedFor
                };
                return examData;
            });
            reply.send(completeResult).status(200);
        }
        catch (error) {
            reply.send({ message: error }).status(400);
            console.log(error);
        }
    }),
    searchImgExams: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const name = request.query.name;
        const requesteData = request.query.data;
        const petName = request.query.petName;
        try {
            const result = yield PrismaInstance_1.prisma.examsForPet.findMany({
                where: {
                    OR: [
                        { requesteData: { gte: requesteData },
                            name: { startsWith: name },
                            medicine: { pet: { name: { startsWith: petName } } }
                        }
                    ]
                },
                include: { medicine: { select: { pet: { select: { name: true } } } } }
            });
            const validateImgExam = result.map((exam) => {
                let data;
                exam.examsType.includes("image") ? data = {
                    id: exam.id,
                    name: exam.name,
                    price: exam.price,
                    data: exam.requesteData,
                    petName: exam.medicine.pet.name,
                    done: exam.doneExame,
                    requested: exam.requestedFor
                } : null;
                return data;
            });
            reply.status(200).send(validateImgExam);
        }
        catch (error) {
            reply.status(200).send({ message: error });
        }
    }),
    reportAnExam: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { examId } = request.params;
        try {
            const { jsonString, responsible, responsibleCrm } = request.body;
            yield labsService_1.labService.reportExam(examId, jsonString);
            yield PrismaInstance_1.prisma.examsForPet.update({
                where: { id: parseInt(examId) }, data: {
                    doneExame: true,
                    responsibleForExam: responsible,
                    responsibleForCrm: responsibleCrm,
                    byReport: true
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    reportTableExam: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { examId } = request.params;
        const { report, onePart, twoPart, byReport, reportedFor, reportedForCrm } = request.body;
        try {
            yield PrismaInstance_1.prisma.examsForPet.update({
                where: { id: parseInt(examId) }, data: {
                    doneExame: true, onePart, twoPart, responsibleForExam: reportedFor, byReport, responsibleForCrm: reportedForCrm
                }
            });
            yield PrismaInstance_1.prisma.reportForExams.create({
                data: { onePart, twoPart, byReport, report, examsForPet: { connect: { id: parseInt(examId) } } }
            });
            reply.send("Exame laudado");
        }
        catch (error) {
            console.log(error);
            reply.send({ message: error });
        }
    }),
    reportWithPdf: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { examId } = request.params;
            const files = request.files();
            const paths = yield labsService_1.labService.saveExamPdfs(files);
            if (!paths || paths.length <= 0)
                return;
            yield PrismaInstance_1.prisma.examsForPet.update({
                where: { id: parseInt(examId) }, data: {
                    reportExams: { create: {
                            externalReportIds: paths
                        } }
                }
            });
        }
        catch (error) {
            reply.send({ message: error });
            console.log(error);
        }
    }),
    showExamsFiles: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { examId } = request.params;
        try {
            // Definir o tipo de conteúdo como application/pdf
            // reply.type('application/pdf');
            // Ler o arquivo PDF usando fs.createReadStream() 
            reply.header('Content-Disposition', `attachment; filename="${examId}"`);
            const data = yield labsService_1.labService.returnExamFile(examId);
            reply.send(data);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getOnePartExamResultById: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { examId } = request.params;
            const examDetails = yield PrismaInstance_1.prisma.examsForPet.findUnique({
                where: { id: parseInt(examId) }, include: { reportExams: true, medicine: { include: { pet: { include: { customer: { select: { name: true } } } } } } }
            });
            if (!examDetails) {
                return;
            }
            const examRefs = yield PrismaInstance_1.prisma.oldExams.findFirst({
                where: { name: { equals: examDetails.name } }, include: { partExams: { include: { examsDetails: true } } }
            });
            const petExamResult = {
                solicitedBy: examDetails.requestedFor,
                solicitedDate: examDetails.requesteData,
                solicitedCrm: examDetails.requestedCrm,
                reportedBy: examDetails.responsibleForExam,
                reportedByCrm: examDetails.responsibleForCrm,
                examName: examDetails.name,
                petName: examDetails.medicine.pet.name,
                petEspecie: examDetails.medicine.pet.especie,
                petAge: examDetails.medicine.pet.bornDate,
                petRace: examDetails.medicine.pet.race,
                petSex: examDetails.medicine.pet.sexo,
                petCod: examDetails.medicine.pet.CodAnimal,
                petCustomer: examDetails.medicine.pet.customer.name,
                result: examDetails.reportExams[0].report
            };
            const petExamRefs = examRefs === null || examRefs === void 0 ? void 0 : examRefs.partExams;
            const refByEspecie = examRefs === null || examRefs === void 0 ? void 0 : examRefs.partExams[0].examsDetails.filter((item) => { var _a; (_a = item.agesTwo) === null || _a === void 0 ? void 0 : _a.includes(`${petExamResult.petEspecie}`); });
            reply.send({ petExamResult, petExamRefs, refByEspecie }).status(200);
        }
        catch (error) {
            console.log(error);
            reply.send(error);
        }
    }),
    getMultiPartExamResultById: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { examId } = request.params;
            const examDetails = yield PrismaInstance_1.prisma.examsForPet.findUnique({
                where: { id: parseInt(examId) }, include: { reportExams: true, medicine: { include: { pet: { include: { customer: { select: { name: true } } } } } } }
            });
            if (!examDetails) {
                return;
            }
            const examRefs = yield PrismaInstance_1.prisma.oldExams.findFirst({
                where: { name: { contains: examDetails.name } }, include: { partExams: { include: { examsDetails: true } } }
            });
            const petExamResult = {
                solicitedBy: examDetails.requestedFor,
                solicitedDate: examDetails.requesteData,
                solicitedCrm: examDetails.requestedCrm,
                reportedBy: examDetails.responsibleForExam,
                reportedByCrm: examDetails.responsibleForCrm,
                examName: examDetails.name,
                petName: examDetails.medicine.pet.name,
                petEspecie: examDetails.medicine.pet.especie,
                petAge: examDetails.medicine.pet.bornDate,
                petRace: examDetails.medicine.pet.race,
                petSex: examDetails.medicine.pet.sexo,
                petCod: examDetails.medicine.pet.CodAnimal,
                petCustomer: examDetails.medicine.pet.customer.name,
                result: examDetails.reportExams[0]
            };
            reply.send({ petExamResult, examRefs }).status(200);
        }
        catch (error) {
            console.log(error);
            reply.send(error);
        }
    }),
    getTextExamResultById: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { examId } = request.params;
            const examDetails = yield PrismaInstance_1.prisma.examsForPet.findUnique({
                where: { id: parseInt(examId) }, include: { reportExams: {}, medicine: { include: { pet: { include: { customer: { select: { name: true } } } } } } }
            });
            if (!examDetails) {
                return;
            }
            const petExamResult = {
                solicitedBy: examDetails.requestedFor,
                solicitedDate: examDetails.requesteData,
                solicitedCrm: examDetails.requestedCrm,
                reportedBy: examDetails.responsibleForExam,
                reportedByCrm: examDetails.responsibleForCrm,
                examName: examDetails.name,
                petName: examDetails.medicine.pet.name,
                petEspecie: examDetails.medicine.pet.especie,
                petAge: examDetails.medicine.pet.bornDate,
                petRace: examDetails.medicine.pet.race,
                petSex: examDetails.medicine.pet.sexo,
                petCod: examDetails.medicine.pet.CodAnimal,
                petCustomer: examDetails.medicine.pet.customer.name,
                result: examDetails.reportExams[0].textReport
            };
            reply.send({ petExamResult }).status(200);
        }
        catch (error) {
            console.log(error);
            reply.send(error);
        }
    }),
    getPetOpenedExamDetails: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const GetDetailsSchema = zod_1.z.object({
                petId: zod_1.z.coerce.number()
            });
            const { petId } = GetDetailsSchema.parse(request.params);
            const petDetails = yield PrismaInstance_1.prisma.pets.findUnique({
                where: {
                    id: petId
                }, include: {
                    customer: {
                        select: {
                            name: true
                        }
                    },
                    medicineRecords: {
                        include: { petExams: {
                                where: { doneExame: false }
                            } }
                    }
                }
            });
            reply.send(petDetails);
        }
        catch (error) {
            console.error(error);
        }
    })
};
