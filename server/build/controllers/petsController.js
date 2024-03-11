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
exports.petsController = void 0;
const schemasValidator_1 = require("../schemas/schemasValidator");
const PrismaInstance_1 = require("../interface/PrismaInstance");
const zod_1 = require("zod");
exports.petsController = {
    getAllPets: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const PetsSchema = zod_1.z.object({
            page: zod_1.z.string(),
        });
        const { page = 0 } = request.query;
        const pageTotals = (yield PrismaInstance_1.prisma.pets.count()) / 30;
        const cursorReference = Number(page) === 0 ? 1 : 30 * page;
        try {
            const pets = yield PrismaInstance_1.prisma.pets.findMany({
                skip: Number(page),
                take: 30,
                cursor: {
                    id: cursorReference,
                },
                include: {
                    queue: { select: { id: true, queryType: true, vetPreference: true } },
                    medicineRecords: { include: { petQueues: true } },
                    customer: { select: { name: true } },
                },
                orderBy: {
                    id: "asc",
                },
            });
            return reply.send(pets
            // pageInfos: { pageTotals: pageTotals, paginationActual: page },
            );
        }
        catch (error) {
            reply.status(404).send(error);
        }
    }),
    getWithId: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        const { id } = request.params;
        try {
            const pet = yield PrismaInstance_1.prisma.pets.findUnique({
                where: { id: parseInt(id) },
                include: {
                    customer: {
                        select: { name: true, id: true, balance: true, pets: true },
                    },
                    medicineRecords: {
                        select: {
                            petConsults: true,
                            petExams: true,
                            petQueues: true,
                            observations: true,
                            id: true,
                            petVaccines: true,
                            petSurgeries: true,
                            petProcedures: true,
                            petBeds: {
                                where: { isCompleted: false },
                                include: { hospDiary: true },
                            },
                        },
                    },
                    queue: {
                        select: {
                            id: true,
                            queryType: true,
                            vetPreference: true,
                            moreInfos: true,
                            queueOur: true,
                            queueEntry: true,
                            petIsInQueue: true,
                        },
                    },
                    bed: {
                        select: {
                            isBusy: true,
                            entryOur: true,
                            id: true,
                            kennel: { select: { name: true, price: true } },
                            dailyRate: true,
                            mustFasting: true,
                        },
                    },
                    priceAccumulator: { select: { id: true, accumulator: true } },
                },
            });
            const petData = {
                id: pet === null || pet === void 0 ? void 0 : pet.id,
                name: pet === null || pet === void 0 ? void 0 : pet.name,
                debits: pet === null || pet === void 0 ? void 0 : pet.debits,
                customerName: pet === null || pet === void 0 ? void 0 : pet.customer.name,
                customerId: pet === null || pet === void 0 ? void 0 : pet.customer.id,
                customerPets: (_a = pet === null || pet === void 0 ? void 0 : pet.customer.pets) === null || _a === void 0 ? void 0 : _a.map((pet) => {
                    let petsData = {
                        id: pet.id,
                        name: pet.name,
                    };
                    return petsData;
                }),
                especie: pet === null || pet === void 0 ? void 0 : pet.especie,
                sexo: pet === null || pet === void 0 ? void 0 : pet.sexo,
                race: pet === null || pet === void 0 ? void 0 : pet.race,
                castred: pet === null || pet === void 0 ? void 0 : pet.isCastred,
                chip: pet === null || pet === void 0 ? void 0 : pet.haveChip,
                weigth: pet === null || pet === void 0 ? void 0 : pet.weigth,
                corPet: pet === null || pet === void 0 ? void 0 : pet.corPet,
                sizePet: pet === null || pet === void 0 ? void 0 : pet.sizePet,
                bornDate: pet === null || pet === void 0 ? void 0 : pet.bornDate,
                observations: pet === null || pet === void 0 ? void 0 : pet.observations,
                codPet: pet === null || pet === void 0 ? void 0 : pet.CodAnimal,
                more: (_b = pet === null || pet === void 0 ? void 0 : pet.queue) === null || _b === void 0 ? void 0 : _b.moreInfos,
                ouor: (_c = pet === null || pet === void 0 ? void 0 : pet.queue) === null || _c === void 0 ? void 0 : _c.queueOur,
                recordId: (_d = pet === null || pet === void 0 ? void 0 : pet.medicineRecords) === null || _d === void 0 ? void 0 : _d.id,
                isBusy: (_e = pet === null || pet === void 0 ? void 0 : pet.bed) === null || _e === void 0 ? void 0 : _e.isBusy,
                bedInfos: {
                    id: (_f = pet === null || pet === void 0 ? void 0 : pet.bed) === null || _f === void 0 ? void 0 : _f.id,
                    entry: (_g = pet === null || pet === void 0 ? void 0 : pet.bed) === null || _g === void 0 ? void 0 : _g.entryOur,
                    kennelName: (_h = pet === null || pet === void 0 ? void 0 : pet.bed) === null || _h === void 0 ? void 0 : _h.kennel,
                    fasting: (_j = pet === null || pet === void 0 ? void 0 : pet.bed) === null || _j === void 0 ? void 0 : _j.mustFasting,
                    price: (_l = (_k = pet === null || pet === void 0 ? void 0 : pet.bed) === null || _k === void 0 ? void 0 : _k.kennel) === null || _l === void 0 ? void 0 : _l.price,
                },
                exams: (_m = pet === null || pet === void 0 ? void 0 : pet.medicineRecords) === null || _m === void 0 ? void 0 : _m.petExams.map((exams) => {
                    let examData = {
                        id: exams.id,
                        requestedData: exams.requesteData,
                        name: exams.name,
                        price: exams.price,
                        doneExam: exams.doneExame,
                        linkedConsultId: exams.linkedConsultDebitId,
                        linkedAdmissionId: exams.LinkedAdmissionDebitId,
                        onePart: exams.onePart,
                        twoPart: exams.twoPart,
                        byText: exams.byReport,
                    };
                    return examData;
                }),
                vaccines: (_o = pet === null || pet === void 0 ? void 0 : pet.medicineRecords) === null || _o === void 0 ? void 0 : _o.petVaccines.map((vaccine) => {
                    let vacineData = {
                        id: vaccine.id,
                        name: vaccine.name,
                        price: vaccine.price,
                        requestedDate: vaccine.requestedDate,
                        applicableDate: vaccine.applicationDate,
                        linkedConsultId: vaccine.linkedConsultDebitId,
                        linkedAdmissionId: vaccine.LinkedAdmissionDebitId,
                    };
                    return vacineData;
                }),
                surgeries: (_p = pet === null || pet === void 0 ? void 0 : pet.medicineRecords) === null || _p === void 0 ? void 0 : _p.petSurgeries.map((surgerie) => {
                    let surgeriesData = {
                        id: surgerie.id,
                        name: surgerie.name,
                        price: surgerie.price,
                        requestedDate: surgerie.requestedDate,
                        completedDate: surgerie.completedDate,
                        surgerieStatus: surgerie.status,
                        linkedConsultId: surgerie.linkedConsultDebitId,
                        linkedAdmissionId: surgerie.LinkedAdmissionDebitId,
                    };
                    return surgeriesData;
                }),
                procedures: (_q = pet === null || pet === void 0 ? void 0 : pet.medicineRecords) === null || _q === void 0 ? void 0 : _q.petProcedures.map((procedure) => {
                    let procedureData = {
                        id: procedure.id,
                        name: procedure.name,
                        price: procedure.price,
                        available: procedure.available,
                        requested: procedure.requestedDate,
                        linkedConsultId: procedure.linkedConsultDebitId,
                        linkedAdmissionId: procedure.LinkedAdmissionDebitId,
                    };
                    return procedureData;
                }),
                admissions: (_r = pet === null || pet === void 0 ? void 0 : pet.medicineRecords) === null || _r === void 0 ? void 0 : _r.petBeds.map((bed) => {
                    let bedData = {
                        id: bed.id,
                        entry: bed.entryOur,
                        exit: bed.exitOur,
                        totalDebit: bed.totalDebt,
                        fasting: bed.mustFasting,
                        observations: bed.hospDiary,
                    };
                    return bedData;
                }),
                consultsPet: (_s = pet === null || pet === void 0 ? void 0 : pet.medicineRecords) === null || _s === void 0 ? void 0 : _s.petConsults.map((consult) => {
                    let consultPet = {
                        id: consult.id,
                        openedDate: consult.openedDate,
                        openedBy: consult.openedBy,
                        vetPreference: consult.vetPreference,
                        consultType: consult.consultType,
                        medicineRecordId: consult.medicineRecordId,
                        clientIsVip: consult.clientIsVip,
                    };
                    return consultPet;
                }),
                queue: pet === null || pet === void 0 ? void 0 : pet.queue,
                queueHistory: (_t = pet === null || pet === void 0 ? void 0 : pet.medicineRecords) === null || _t === void 0 ? void 0 : _t.petQueues,
                totalAcc: {
                    id: (_u = pet === null || pet === void 0 ? void 0 : pet.priceAccumulator) === null || _u === void 0 ? void 0 : _u.id,
                    price: (_v = pet === null || pet === void 0 ? void 0 : pet.priceAccumulator) === null || _v === void 0 ? void 0 : _v.accumulator,
                },
            };
            return reply.send(petData);
        }
        catch (error) {
            console.log(error);
        }
    }),
    createPet: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, especie, sexo, race, weigth, haveChip, isCastred, corPet, bornDate, observations, } = schemasValidator_1.petSchema.parse(request.body);
        const { id } = request.params;
        try {
            const petAlreadyExists = yield PrismaInstance_1.prisma.pets.findFirst({
                where: { name: name },
            });
            if (petAlreadyExists) {
                reply.status(404).send("Pet already exists");
                return;
            }
            yield PrismaInstance_1.prisma.pets.create({
                data: {
                    name,
                    especie,
                    sexo,
                    race,
                    weigth,
                    haveChip,
                    isCastred,
                    corPet,
                    bornDate,
                    observations,
                    customer: {
                        connect: {
                            id: parseInt(id),
                        },
                    },
                    queue: {
                        create: {
                            vetPreference: "",
                            queryType: "",
                            queueEntry: null,
                        },
                    },
                    medicineRecords: {
                        create: {
                            observations: [""],
                        },
                    },
                    priceAccumulator: {
                        create: {
                            accumulator: 0,
                        },
                    },
                },
            });
            reply.status(201).send("Sucesso");
        }
        catch (error) {
            reply.send("FALHA");
        }
    }),
    petsInQueue: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pets = yield PrismaInstance_1.prisma.pets.findMany({
                where: {
                    medicineRecords: {
                        petConsults: {
                            some: {
                                isClosed: false,
                            },
                        },
                    },
                },
                include: {
                    medicineRecords: {
                        include: { petConsults: true },
                    },
                    customer: { select: { name: true, vetPreference: true, cpf: true } },
                },
            });
            const totalInQueue = yield PrismaInstance_1.prisma.openedConsultsForPet.count({
                where: { isClosed: false },
            });
            const response = pets.map((pet) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                let data = {
                    name: pet.name,
                    id: pet.id,
                    customerName: pet.customer.name,
                    vetPreference: (_c = (_b = (_a = pet.medicineRecords) === null || _a === void 0 ? void 0 : _a.petConsults[0]) === null || _b === void 0 ? void 0 : _b.vetPreference) !== null && _c !== void 0 ? _c : "Sem preferência",
                    queueId: (_e = (_d = pet.medicineRecords) === null || _d === void 0 ? void 0 : _d.petConsults[0]) === null || _e === void 0 ? void 0 : _e.id,
                    openedBy: (_g = (_f = pet.medicineRecords) === null || _f === void 0 ? void 0 : _f.petConsults[0]) === null || _g === void 0 ? void 0 : _g.openedBy,
                    codPet: pet.CodAnimal,
                    queueEntry: (_j = (_h = pet.medicineRecords) === null || _h === void 0 ? void 0 : _h.petConsults[0]) === null || _j === void 0 ? void 0 : _j.openedDate,
                    especie: pet.especie,
                    more: (_l = (_k = pet.medicineRecords) === null || _k === void 0 ? void 0 : _k.petConsults[0]) === null || _l === void 0 ? void 0 : _l.observations,
                    race: pet.race,
                    customerCpf: pet.customer.cpf,
                    queryType: (_o = (_m = pet.medicineRecords) === null || _m === void 0 ? void 0 : _m.petConsults[0]) === null || _o === void 0 ? void 0 : _o.consultType,
                    totalInQueue,
                };
                return data;
            });
            return reply.send({ response, totalInQueue });
        }
        catch (error) {
            console.error(error);
            reply.status(404).send(error);
        }
    }),
    petsByVetQueue: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { vetName } = request.params;
            const pets = yield PrismaInstance_1.prisma.pets.findMany({
                where: {
                    medicineRecords: {
                        petConsults: {
                            some: {
                                isClosed: false,
                            },
                        },
                    },
                    AND: {
                        medicineRecords: {
                            petConsults: {
                                some: {
                                    vetPreference: { contains: vetName },
                                },
                            },
                        },
                    },
                },
                include: {
                    medicineRecords: {
                        include: { petConsults: true },
                    },
                    customer: { select: { name: true, vetPreference: true, cpf: true } },
                },
            });
            const totalInQueue = yield PrismaInstance_1.prisma.queues.count({
                where: { petIsInQueue: true },
            });
            const response = pets.map((pet) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                let data = {
                    name: pet.name,
                    id: pet.id,
                    customerName: pet.customer.name,
                    vetPreference: (_c = (_b = (_a = pet.medicineRecords) === null || _a === void 0 ? void 0 : _a.petConsults[0]) === null || _b === void 0 ? void 0 : _b.vetPreference) !== null && _c !== void 0 ? _c : "Sem preferência",
                    queueId: (_e = (_d = pet.medicineRecords) === null || _d === void 0 ? void 0 : _d.petConsults[0]) === null || _e === void 0 ? void 0 : _e.id,
                    openedBy: (_g = (_f = pet.medicineRecords) === null || _f === void 0 ? void 0 : _f.petConsults[0]) === null || _g === void 0 ? void 0 : _g.openedBy,
                    codPet: pet.CodAnimal,
                    queueEntry: (_j = (_h = pet.medicineRecords) === null || _h === void 0 ? void 0 : _h.petConsults[0]) === null || _j === void 0 ? void 0 : _j.openedDate,
                    especie: pet.especie,
                    more: (_l = (_k = pet.medicineRecords) === null || _k === void 0 ? void 0 : _k.petConsults[0]) === null || _l === void 0 ? void 0 : _l.observations,
                    race: pet.race,
                    customerCpf: pet.customer.cpf,
                    queryType: (_o = (_m = pet.medicineRecords) === null || _m === void 0 ? void 0 : _m.petConsults[0]) === null || _o === void 0 ? void 0 : _o.consultType,
                    totalInQueue,
                };
                return data;
            });
            return reply.send({ response, totalInQueue });
        }
        catch (error) {
            reply.status(404).send(error);
        }
    }),
    changePetWeight: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { petId, weight } = request.params;
            yield PrismaInstance_1.prisma.pets.update({
                where: { id: parseInt(petId) },
                data: {
                    weigth: parseFloat(weight),
                },
            });
        }
        catch (error) {
            reply.send(error);
            console.log(error);
        }
    }),
    getPetBedHistory: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { petId } = request.params;
        try {
            const pet = yield PrismaInstance_1.prisma.pets.findUnique({
                where: { id: parseInt(petId) },
                include: {
                    medicineRecords: {
                        include: {
                            petBeds: true,
                        },
                    },
                },
            });
            reply.send(pet);
        }
        catch (error) {
            console.log(error);
            reply.send(error);
        }
    }),
    createEspecie: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name } = request.body;
            yield PrismaInstance_1.prisma.especies.create({
                data: { name },
            });
            reply.status(201).send("Created successfully");
        }
        catch (error) {
            console.error(error);
            reply.send(error);
        }
    }),
    getEspecies: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const especies = yield PrismaInstance_1.prisma.especies.findMany({
                include: { race: true },
            });
            reply.send(especies);
        }
        catch (error) {
            console.log(error);
            reply.send(error);
        }
    }),
    createRaces: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, espId } = request.body;
            yield PrismaInstance_1.prisma.races.create({
                data: {
                    name,
                    Especies: {
                        connect: { id: espId },
                    },
                },
            });
            reply.status(201).send("Race created successfully");
        }
        catch (error) {
            console.log(error);
            reply.send(error);
        }
    }),
    getEspeciesById: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { espId } = request.params;
            const esp = yield PrismaInstance_1.prisma.especies.findUnique({
                where: { id: parseInt(espId) },
                include: { race: true },
            });
            reply.send({
                esp,
            });
        }
        catch (error) {
            console.log(error);
            reply.send({ message: error });
        }
    }),
    getAllPetHistory: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { petId } = request.params;
            const response = yield PrismaInstance_1.prisma.pets.findUnique({
                where: { id: parseInt(petId) },
                include: {
                    medicineRecords: {
                        select: {
                            petBeds: { include: { hospDiary: true } },
                            petExams: true,
                            petConsults: true,
                            petSurgeries: true,
                            petVaccines: true,
                        },
                    },
                    customer: {
                        include: { pets: true },
                    },
                },
            });
            reply.send(response);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getPetOldHistoryConsults: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { petId } = request.params;
            const oldConsults = yield PrismaInstance_1.prisma.pets.findUnique({
                where: { CodAnimal: parseInt(petId) },
                include: {
                    petOldConsults: true,
                    customer: true,
                },
            });
            if (!oldConsults) {
                reply.status(404).send("sem histórico para esse animal!");
            }
            reply.send({
                oldConsults,
            });
        }
        catch (error) {
            reply.send({
                message: error,
            });
        }
    }),
};
