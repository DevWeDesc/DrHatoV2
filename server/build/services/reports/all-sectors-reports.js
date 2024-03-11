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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSectorsReport = void 0;
const PrismaInstance_1 = require("../../interface/PrismaInstance");
function GetSectorsReportsData(initialDate, finalDate, sectorId) {
    return __awaiter(this, void 0, void 0, function* () {
        const consult = yield PrismaInstance_1.prisma.openedConsultsForPet.findMany({
            where: {
                AND: [
                    { openedDate: { gte: new Date(initialDate) } },
                    { closedDate: { lt: new Date(finalDate) } },
                ],
            },
            include: {
                consultDebits: true,
            },
        });
        const admission = yield PrismaInstance_1.prisma.openededAdmissionsForPet.findMany({
            where: {
                AND: [
                    { openedDate: { gte: new Date(initialDate) } },
                    { closedDate: { lt: new Date(finalDate) } },
                ],
            },
            include: {
                consultDebits: true,
            },
        });
        const proceduresByConsults = consult.flatMap((consults) => {
            return consults.consultDebits.filter((c) => c.sectorId === sectorId);
        });
        const proceduresByAdmissions = admission.flatMap((admission) => {
            return admission.consultDebits.filter((a) => a.sectorId === sectorId);
        });
        const proceduresCount = proceduresByConsults.reduce((acc, curr) => {
            if (acc[curr.name]) {
                acc[curr.name]++;
            }
            else {
                acc[curr.name] = 1;
            }
            return acc;
        }, {});
        const proceduresAdmissionCount = proceduresByAdmissions.reduce((acc, curr) => {
            if (acc[curr.name]) {
                acc[curr.name]++;
            }
            else {
                acc[curr.name] = 1;
            }
            return acc;
        }, {});
        const data = {
            consults: {
                procedures: Object.entries(proceduresCount).map(([name, quantity]) => ({
                    name,
                    //@ts-ignore
                    value: proceduresByConsults.find(procedure => procedure.name === name).price,
                    quantity
                })),
                consultsQuantity: proceduresByConsults.length,
                consultsInvoicing: proceduresByConsults.reduce((accumulator, currentValue) => accumulator + Number(currentValue.price), 0),
            },
            admissions: {
                procedures: Object.entries(proceduresAdmissionCount).map(([name, quantity]) => ({
                    name,
                    //@ts-ignore
                    value: proceduresByAdmissions.find(procedure => procedure.name === name).price,
                    quantity
                })),
                consultsQuantity: proceduresByAdmissions.length,
                consultsInvoicing: proceduresByAdmissions.reduce((accumulator, currentValue) => accumulator + Number(currentValue.price), 0),
            }
        };
        return data;
    });
}
function GetSectorsReport(initialDate, finalDate) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const sectors = yield PrismaInstance_1.prisma.sectors.findMany();
        const results = [];
        try {
            for (var _d = true, sectors_1 = __asyncValues(sectors), sectors_1_1; sectors_1_1 = yield sectors_1.next(), _a = sectors_1_1.done, !_a;) {
                _c = sectors_1_1.value;
                _d = false;
                try {
                    const sector = _c;
                    const data = yield GetSectorsReportsData(initialDate, finalDate, sector.id);
                    const report = {
                        name: sector.name,
                        report: data
                    };
                    if (report.report.consults.consultsInvoicing >= 1 || report.report.admissions.consultsInvoicing >= 1) {
                        results.push(report);
                    }
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = sectors_1.return)) yield _b.call(sectors_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return results;
    });
}
exports.GetSectorsReport = GetSectorsReport;
