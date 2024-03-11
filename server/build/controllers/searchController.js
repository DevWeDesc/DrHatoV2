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
exports.searchController = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
const schemasValidator_1 = require("../schemas/schemasValidator");
const searchEngine_1 = require("../engines/searchEngine");
const vets_menu_search_1 = require("../engines/vets.menu.search");
const labs_menu_search_1 = require("../engines/labs.menu.search");
exports.searchController = {
    getAll: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cpf = request.query.cpf;
            const name = request.query.name;
            const adress = request.query.adress;
            const result = yield PrismaInstance_1.prisma.customer.findMany({
                where: {
                    OR: [
                        { name: { startsWith: name } },
                        { adress: { startsWith: adress } },
                        { cpf: { startsWith: cpf } },
                    ],
                },
                include: {
                    pets: { include: { queue: true } },
                },
            });
            reply.status(200).send(result);
        }
        catch (error) {
            reply.status(400).send({ message: error });
            console.log(error);
        }
    }),
    vetsBigSearchs: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { initialDate, finalDate, codPet, customerName, petName, isHospitalized, isFinished, typePaymentClient, } = schemasValidator_1.SearchSchema.parse(request.query);
            const response = yield (0, searchEngine_1.searchEngine)({
                customerName,
                petName,
                codPet,
                finalDate,
                initialDate,
                isFinished,
                isHospitalized,
                typePaymentClient,
            });
            if (!response || response == null || response == undefined) {
                reply.status(404);
            }
            else {
                reply.send(response).status(200);
            }
        }
        catch (error) {
            reply.status(400).send({ message: error });
            console.log();
            console.log(error);
        }
    }),
    searchVetMenu: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { petName, customerName, petCode, isAddmited, isFinished, finalDate, initialDate, } = request.query;
            const currentPage = Number(request.params.page) || 1;
            const vetsMenuSearch = new vets_menu_search_1.VetsMenuSearch();
            vetsMenuSearch.currentPage = currentPage;
            const { data, totalUsers, totalPages } = yield vetsMenuSearch.getParams({
                petName,
                customerName,
                petCode,
                isAddmited,
                isFinished,
                finalDate,
                initialDate,
            });
            if (isFinished && (initialDate || finalDate)) {
                const { data } = yield vetsMenuSearch.getParamsWithDate({
                    petName,
                    customerName,
                    petCode,
                    isAddmited,
                    isFinished,
                    finalDate,
                    initialDate,
                });
                reply.send(data);
            }
            if (isAddmited && (initialDate || finalDate)) {
                const { data } = yield vetsMenuSearch.getParamsWithDate({
                    petName,
                    customerName,
                    petCode,
                    isAddmited,
                    isFinished,
                    finalDate,
                    initialDate,
                });
                reply.send(data);
            }
            reply.send({ totalUsers, totalPages, currentPage, data });
        }
        catch (error) {
            console.log(error);
        }
    }),
    getByCodPet: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { codPet } = request.params;
        try {
            const data = yield PrismaInstance_1.prisma.pets.findFirst({
                where: { CodAnimal: Number(codPet) },
                include: { customer: true },
            });
            reply.send([data]);
        }
        catch (error) {
            reply.send({ error });
            console.log(error);
        }
    }),
    searchLabMenu: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { petCode, petName, solicitedBy } = request.query;
            const labSearchMenu = new labs_menu_search_1.LabsMenuSearch();
            const { data } = yield labSearchMenu.getWithParams({
                petCode,
                petName,
                solicitedBy,
            });
            reply.send({
                data,
            });
        }
        catch (error) {
            console.log(error);
            reply.send({ error });
        }
    }),
};
