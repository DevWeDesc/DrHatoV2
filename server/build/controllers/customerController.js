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
exports.customerController = void 0;
const userContract_1 = require("../validators/userContract");
const schemasValidator_1 = require("../schemas/schemasValidator");
const randomNumberAccount_1 = require("../utils/randomNumberAccount");
const PrismaInstance_1 = require("../interface/PrismaInstance");
const zod_1 = require("zod");
exports.customerController = {
    showAllUsers: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Obtenha o número da página atual a partir da solicitação.
            const currentPage = Number(request.query.page) || 1;
            // Obtenha o número total de usuários.
            const totalUsers = yield PrismaInstance_1.prisma.customer.count();
            // Calcule o número de páginas.
            const totalPages = Math.ceil(totalUsers / 35);
            const allUser = yield PrismaInstance_1.prisma.customer.findMany({
                skip: (currentPage - 1) * 35,
                take: 35,
                include: {
                    pets: true,
                    transaction: true,
                    customerAccount: { include: { installments: true } },
                },
            });
            return reply.send({
                totalUsers,
                currentPage,
                totalPages,
                users: allUser,
            });
        }
        catch (error) {
            return reply.status(404).send({ message: error });
        }
    }),
    searchUser: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, cpf, rg, codPet } = request.query;
        // Obtenha o número da página atual a partir da solicitação.
        const currentPage = Number(request.params.page) || 1;
        // Obtenha o número total de usuários.
        const totalUsers = yield PrismaInstance_1.prisma.customer.count();
        // Calcule o número de páginas.
        const totalPages = Math.ceil(totalUsers / 35);
        try {
            let customer;
            customer = yield PrismaInstance_1.prisma.customer.findMany({
                skip: (currentPage - 1) * 35,
                take: 35,
                where: {
                    OR: [
                        { name: { contains: name } },
                        { cpf: { contains: cpf } },
                        { rg: { contains: rg } },
                    ],
                },
                include: { pets: true, transaction: true },
            });
            if (!!codPet) {
                customer = [];
                const data = yield PrismaInstance_1.prisma.customer.findFirst({
                    where: { pets: { some: { CodAnimal: Number(codPet) } } },
                });
                customer.push(data);
            }
            reply.send(customer);
        }
        catch (error) {
            reply.status(404).send(error);
            console.log(error);
        }
    }),
    createUser: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const contract = new userContract_1.ValidationContract();
        const { name, adress, district, rg, phone, tell, email, cpf, birthday, balance, cep, howKnowUs, kindPerson, neighbour, state, } = schemasValidator_1.createCustomer.parse(request.body);
        try {
            yield contract.customerAlreadyExists(cpf, "Usuário já existe!");
            if (contract.hadError()) {
                reply.status(400).send(contract.showErrors());
                contract.clearErrors();
                return;
            }
            const customer = yield PrismaInstance_1.prisma.customer.create({
                data: {
                    name,
                    adress,
                    phone,
                    email,
                    cpf,
                    birthday,
                    balance,
                    cep,
                    district,
                    howKnowUs,
                    rg,
                    tell,
                    kindPerson,
                    neighbour,
                    state,
                    customerAccount: {
                        create: {
                            accountNumber: (0, randomNumberAccount_1.randomNumberAccount)(100, 100000),
                            credits: 0,
                            debits: 0,
                            clientIsVip: false,
                        },
                    },
                },
            });
            reply.send(customer.id);
        }
        catch (error) {
            console.error(error);
        }
    }),
    findUserById: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            const { id } = request.params;
            const customer = yield PrismaInstance_1.prisma.customer.findUnique({
                where: { id: parseInt(id) },
                include: {
                    transaction: true,
                    customerAccount: {
                        include: {
                            installments: {
                                include: {
                                    consult: { include: { consultDebits: true } },
                                    admission: true,
                                },
                            },
                            consultsForPet: { include: { consultDebits: true } },
                            Admission: { include: { consultDebits: true } }
                        },
                    },
                    pets: {
                        include: {
                            medicineRecords: {
                                include: {
                                    petConsults: {
                                        where: {
                                            AND: [
                                                { totaLDebits: { gte: 1 } },
                                                { isClosed: true }
                                            ]
                                        }
                                    },
                                    petAdmissions: {
                                        where: {
                                            AND: [
                                                { totaLDebits: { gte: 1 } },
                                                { isClosed: true }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            });
            const consults = (_a = customer === null || customer === void 0 ? void 0 : customer.customerAccount) === null || _a === void 0 ? void 0 : _a.consultsForPet;
            const admissions = (_b = customer === null || customer === void 0 ? void 0 : customer.customerAccount) === null || _b === void 0 ? void 0 : _b.Admission;
            //@ts-ignore
            const installments = (_d = (_c = customer === null || customer === void 0 ? void 0 : customer.customerAccount) === null || _c === void 0 ? void 0 : _c.installments) === null || _d === void 0 ? void 0 : _d.concat(consults).concat(admissions).filter((install) => install === null || install === void 0 ? void 0 : install.id).map((installment) => {
                var _a;
                const data = {
                    id: installment === null || installment === void 0 ? void 0 : installment.id,
                    debitName: installment === null || installment === void 0 ? void 0 : installment.debitName,
                    totalDebit: installment === null || installment === void 0 ? void 0 : installment.totalDebit,
                    paymentType: installment === null || installment === void 0 ? void 0 : installment.paymentType,
                    paymentDate: (_a = installment === null || installment === void 0 ? void 0 : installment.paymentDate) === null || _a === void 0 ? void 0 : _a.toLocaleDateString('pt-BR', { day: '2-digit',
                        month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }),
                    installmentAmount: installment === null || installment === void 0 ? void 0 : installment.installmentAmount,
                    amountInstallments: installment === null || installment === void 0 ? void 0 : installment.amountInstallments,
                    customerId: installment === null || installment === void 0 ? void 0 : installment.customerId,
                    boxHistoryId: installment === null || installment === void 0 ? void 0 : installment.boxHistoryId,
                    consultPetId: installment === null || installment === void 0 ? void 0 : installment.consultPetId,
                    admissionsPetId: installment === null || installment === void 0 ? void 0 : installment.admissionsPetId,
                    consult: installment === null || installment === void 0 ? void 0 : installment.consult
                };
                return data;
            });
            const debits = customer === null || customer === void 0 ? void 0 : customer.pets.flatMap((pet) => {
                var _a;
                //@ts-ignore
                return (_a = pet.medicineRecords) === null || _a === void 0 ? void 0 : _a.petConsults.concat(pet.medicineRecords.petAdmissions);
            });
            reply.send({ customer, installments, debits });
        }
        catch (error) {
            console.log(error);
        }
    }),
    getInstallmentDetails: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            const installment = yield PrismaInstance_1.prisma.installmentsDebts.findUnique({
                where: { id: parseInt(id) },
                include: {
                    consult: {
                        include: { consultDebits: true }
                    }
                }
            });
            if (!installment) {
                const installment = yield PrismaInstance_1.prisma.openedConsultsForPet.findFirst({
                    where: {
                        id: id
                    },
                    include: {
                        consultDebits: true
                    }
                });
                if (!installment) {
                    const installment = yield PrismaInstance_1.prisma.openededAdmissionsForPet.findFirst({
                        where: {
                            id: id
                        },
                        include: {
                            consultDebits: true
                        }
                    });
                    if (!installment) {
                        reply.status(404);
                    }
                    reply.send(installment);
                }
                reply.send(installment);
            }
            reply.send(installment);
        }
        catch (error) {
            console.log(error);
        }
    }),
    incrementCustomerCredits: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const incrementCustomerCreditsBody = zod_1.z.object({
                customerId: zod_1.z.coerce.number(),
                credits: zod_1.z.coerce.number()
            });
            const { credits, customerId } = incrementCustomerCreditsBody.parse(request.body);
            yield PrismaInstance_1.prisma.customerAccount.update({
                where: {
                    customerId
                },
                data: {
                    credits: { increment: credits }
                }
            });
            reply.status(200);
        }
        catch (error) {
            console.log(error);
        }
    })
};
