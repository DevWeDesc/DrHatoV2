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
exports.LabsAdmissionsAndConsultsReportSector = void 0;
const PrismaInstance_1 = require("../../interface/PrismaInstance");
function LabsAdmissionsAndConsultsReportSector(initialDate, finalDate) {
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
            return consults.consultDebits.filter((c) => c.sectorId === 2);
        });
        const proceduresByAdmissions = admission.flatMap((admission) => {
            return admission.consultDebits.filter((a) => a.sectorId === 2);
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
exports.LabsAdmissionsAndConsultsReportSector = LabsAdmissionsAndConsultsReportSector;
