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
exports.reportsController = void 0;
const zod_1 = require("zod");
const client_1 = __importDefault(require("../client"));
const all_sectors_reports_1 = require("../services/reports/all-sectors-reports");
exports.reportsController = {
    reportBySector: function (request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ReportBySectorSchema = zod_1.z.object({
                    initialDate: zod_1.z.string(),
                    finalDate: zod_1.z.string(),
                });
                const { initialDate, finalDate } = ReportBySectorSchema.parse(request.body);
                const openedDay = new Date(initialDate).setHours(0, 0, 0, 0);
                const endDay = new Date(finalDate).setHours(0, 0, 0, 0);
                // const outpatient = await OutpatientAdmissionsAndConsultsReportSector(openedDay, endDay)
                // const labs =  await LabsAdmissionsAndConsultsReportSector(openedDay, endDay)
                // const labsImage = await LabsImageAdmissionsAndConsultsReportSector(openedDay, endDay)
                // const surgeries = await SurgeriesAdmissionsAndConsultsReportSector(openedDay, endDay)
                // const cardiology = await CardiologyAdmissionsAndConsultsReportSector(openedDay,endDay)
                // const anesthesia = await AnesthesiaAdmissionsAndConsultsReportSector(openedDay, endDay)
                const reports = yield (0, all_sectors_reports_1.GetSectorsReport)(openedDay, endDay);
                const data = {
                    reports
                    // outpatient,
                    // labs,
                    // labsImage,
                    // surgeries,
                    // cardiology,
                    // anesthesia
                };
                return reply.status(200).send(data);
            }
            catch (error) { }
        });
    },
    reportExamsConclused: function (request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ReportBySectorSchema = zod_1.z.object({
                    initialDate: zod_1.z.string(),
                    finalDate: zod_1.z.string(),
                });
                const { initialDate, finalDate } = ReportBySectorSchema.parse(request.body);
                const examsAllFiltered = yield client_1.default.examsForPet.findMany({
                    where: {
                        AND: [
                            // Quando uma consulta for concluida dar um update na tabela examsForPet no campo doneExame para true
                            { doneExame: true },
                            { requesteData: { gte: new Date(initialDate) } },
                            { updatedAt: { lt: new Date(finalDate) } },
                        ],
                    },
                    include: {
                        medicine: {
                            select: { pet: { select: { name: true, CodAnimal: true, especie: true, customer: {
                                            select: { name: true, email: true, tell: true, phone: true }
                                        } } }, }
                        }
                    }
                });
                const exams = yield client_1.default.oldExams.findMany();
                const sectors = yield client_1.default.sectors.findMany();
                const data = examsAllFiltered.map((data) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                    const filtered = {
                        // data do último update (onde deixa o doneExam True)
                        date: data.updatedAt,
                        customerName: (_b = (_a = data === null || data === void 0 ? void 0 : data.medicine.pet) === null || _a === void 0 ? void 0 : _a.customer) === null || _b === void 0 ? void 0 : _b.name,
                        customerEmail: (_d = (_c = data === null || data === void 0 ? void 0 : data.medicine.pet) === null || _c === void 0 ? void 0 : _c.customer) === null || _d === void 0 ? void 0 : _d.email,
                        customerTell: (_f = (_e = data === null || data === void 0 ? void 0 : data.medicine.pet) === null || _e === void 0 ? void 0 : _e.customer) === null || _f === void 0 ? void 0 : _f.tell,
                        customerPhone: (_h = (_g = data === null || data === void 0 ? void 0 : data.medicine.pet) === null || _g === void 0 ? void 0 : _g.customer) === null || _h === void 0 ? void 0 : _h.phone,
                        examName: data.name,
                        examPrice: Number(data.price),
                        petName: `${(_k = (_j = data.medicine) === null || _j === void 0 ? void 0 : _j.pet) === null || _k === void 0 ? void 0 : _k.name} - ${(_m = (_l = data.medicine) === null || _l === void 0 ? void 0 : _l.pet) === null || _m === void 0 ? void 0 : _m.CodAnimal}`,
                        petEsp: (_o = data === null || data === void 0 ? void 0 : data.medicine.pet) === null || _o === void 0 ? void 0 : _o.especie,
                        responsibleVet: data === null || data === void 0 ? void 0 : data.responsibleForExam,
                        sector: (_p = sectors.find((sector) => { var _a; return sector.id === ((_a = exams.find(exam => exam.name === data.name)) === null || _a === void 0 ? void 0 : _a.sector); })) === null || _p === void 0 ? void 0 : _p.name
                    };
                    return filtered;
                });
                return reply.send(data);
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    reportProceduresDoneForVets: function (request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ReportBySectorSchema = zod_1.z.object({
                    initialDate: zod_1.z.string(),
                    finalDate: zod_1.z.string(),
                });
                const { initialDate, finalDate } = ReportBySectorSchema.parse(request.body);
                const sectors = yield client_1.default.sectors.findMany();
                const proceduresFiltered = yield client_1.default.proceduresForPet.findMany({
                    where: {
                        AND: [
                            // Quando uma consulta for concluida dar um update na tabela examsForPet no campo doneExame para true
                            { isDone: true },
                            { requestedDate: { gte: new Date(initialDate) } },
                            { finishedDate: { lt: new Date(finalDate) } },
                        ],
                    },
                    include: {
                        medicine: {
                            select: { pet: { select: { name: true, CodAnimal: true, especie: true, customer: {
                                            select: { name: true, email: true, tell: true, phone: true }
                                        } } }, }
                        }
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    },
};
