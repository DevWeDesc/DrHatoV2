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
exports.VetsMenuSearch = void 0;
const crypto_1 = require("crypto");
const client_1 = __importDefault(require("../client"));
class VetsMenuSearch {
    constructor() {
        this.currentPage = 1;
    }
    getParams({ customerName, petName, petCode, isAddmited, isFinished, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            let totalUsers;
            switch (true) {
                case !!customerName:
                    data = yield client_1.default.pets.findMany({
                        skip: (this.currentPage - 1) * 10,
                        take: 10,
                        where: {
                            customer: { name: { contains: customerName } },
                        },
                        include: { customer: true },
                    });
                    totalUsers = yield client_1.default.pets.count({
                        where: {
                            customer: { name: { contains: customerName } },
                        },
                    });
                    break;
                case !!petName:
                    data = yield client_1.default.pets.findMany({
                        where: {
                            name: { contains: petName },
                        },
                        include: { customer: true },
                    });
                    totalUsers = yield client_1.default.pets.count({
                        where: {
                            name: { contains: petName },
                        },
                    });
                    break;
                case !!petCode:
                    data = yield client_1.default.pets.findMany({
                        where: {
                            CodAnimal: Number(petCode),
                        },
                        include: { customer: true },
                    });
                    break;
                case !!isFinished:
                    const res = yield client_1.default.openedConsultsForPet.findMany({
                        where: {
                            isClosed: true,
                            MedicineRecord: {
                                pet: {
                                    OR: [
                                        { name: { contains: petName } },
                                        { customer: { name: { contains: customerName } } },
                                        { codPet: { contains: petCode } },
                                    ],
                                },
                            },
                        },
                        include: {
                            MedicineRecord: {
                                include: {
                                    pet: {
                                        select: {
                                            name: true,
                                            id: true,
                                            weigth: true,
                                            CodAnimal: true,
                                            customer: { select: { name: true, cpf: true } },
                                        },
                                    },
                                },
                            },
                        },
                    });
                    data = res.map((res) => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                        let data = {
                            id: (_a = res.MedicineRecord) === null || _a === void 0 ? void 0 : _a.pet.id,
                            name: (_c = (_b = res.MedicineRecord) === null || _b === void 0 ? void 0 : _b.pet) === null || _c === void 0 ? void 0 : _c.name,
                            codPet: (_e = (_d = res.MedicineRecord) === null || _d === void 0 ? void 0 : _d.pet) === null || _e === void 0 ? void 0 : _e.CodAnimal,
                            randomUUID: (0, crypto_1.randomUUID)(),
                            finished: res.closedDate,
                            customer: {
                                name: (_h = (_g = (_f = res.MedicineRecord) === null || _f === void 0 ? void 0 : _f.pet) === null || _g === void 0 ? void 0 : _g.customer) === null || _h === void 0 ? void 0 : _h.name,
                                cpf: (_l = (_k = (_j = res.MedicineRecord) === null || _j === void 0 ? void 0 : _j.pet) === null || _k === void 0 ? void 0 : _k.customer) === null || _l === void 0 ? void 0 : _l.cpf,
                            },
                            responsible: res.clodedByVetName,
                        };
                        return data;
                    });
                    break;
                case !!isAddmited:
                    const beds = yield client_1.default.bed.findMany({
                        where: {
                            isBusy: true,
                            pet: {
                                OR: [
                                    { name: { contains: petName } },
                                    { customer: { name: { contains: customerName } } },
                                    { codPet: { contains: petCode } },
                                ],
                            },
                        },
                        include: { pet: { include: { customer: true } } },
                    });
                    data = beds.map((data) => {
                        var _a, _b, _c, _d, _e, _f;
                        let res = {
                            isBusy: data.isBusy,
                            id: data.petId,
                            name: (_a = data.pet) === null || _a === void 0 ? void 0 : _a.name,
                            codPet: (_b = data.pet) === null || _b === void 0 ? void 0 : _b.codPet,
                            weigth: (_c = data.pet) === null || _c === void 0 ? void 0 : _c.weigth,
                            customer: {
                                name: (_d = data.pet) === null || _d === void 0 ? void 0 : _d.customer.name,
                                cpf: (_e = data.pet) === null || _e === void 0 ? void 0 : _e.customer.cpf,
                                vetPreference: (_f = data.pet) === null || _f === void 0 ? void 0 : _f.customer.vetPreference,
                            },
                        };
                        return res;
                    });
                    break;
                default:
                    data = yield client_1.default.pets.findMany({
                        where: {
                            OR: [
                                { name: { contains: petName } },
                                { customer: { name: { contains: customerName } } },
                                { codPet: { contains: petCode } },
                            ],
                        },
                    });
            }
            //@ts-ignore
            let totalPages = Math.ceil(totalUsers / 10);
            return {
                data,
                totalUsers,
                totalPages,
            };
        });
    }
    getParamsWithDate({ customerName, petName, petCode, initialDate, finalDate, isAddmited, isFinished, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date(initialDate ? initialDate : new Date());
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const endDay = new Date(finalDate ? finalDate : tomorrow);
            endDay.setHours(0, 0, 0, 0);
            let data;
            if (isFinished && (initialDate || finalDate)) {
                const res = yield client_1.default.queuesForPet.findMany({
                    where: {
                        queueIsDone: true,
                        queueEntry: { gte: today },
                        queueExit: { lte: endDay },
                    },
                    include: {
                        medicine: {
                            include: {
                                pet: {
                                    select: {
                                        name: true,
                                        id: true,
                                        codPet: true,
                                        customer: { select: { name: true, cpf: true } },
                                    },
                                },
                            },
                        },
                    },
                });
                data = res.map((res) => {
                    // const UUIDGenerate = await randomUUID();
                    let data = {
                        id: res.medicine.pet.id,
                        name: res.petName,
                        codPet: res.medicine.pet.codPet,
                        finished: res.queueExit,
                        customer: {
                            name: res.medicine.pet.customer.name,
                            cpf: res.medicine.pet.customer.cpf,
                        },
                        responsible: res.responsibleVeterinarian,
                    };
                    return data;
                });
            }
            if (isAddmited && (initialDate || finalDate)) {
                const beds = yield client_1.default.bed.findMany({
                    where: { isBusy: true, entryOur: { gte: today } },
                    include: { pet: { include: { customer: true } } },
                });
                data = beds.map((data) => {
                    var _a, _b, _c, _d, _e, _f;
                    let res = {
                        isBusy: data.isBusy,
                        id: data.petId,
                        name: (_a = data.pet) === null || _a === void 0 ? void 0 : _a.name,
                        codPet: (_b = data.pet) === null || _b === void 0 ? void 0 : _b.codPet,
                        weigth: (_c = data.pet) === null || _c === void 0 ? void 0 : _c.weigth,
                        customer: {
                            name: (_d = data.pet) === null || _d === void 0 ? void 0 : _d.customer.name,
                            cpf: (_e = data.pet) === null || _e === void 0 ? void 0 : _e.customer.cpf,
                            vetPreference: (_f = data.pet) === null || _f === void 0 ? void 0 : _f.customer.vetPreference,
                        },
                    };
                    return res;
                });
            }
            return {
                data,
            };
        });
    }
}
exports.VetsMenuSearch = VetsMenuSearch;
