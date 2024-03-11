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
exports.userController = void 0;
const PrismaInstance_1 = require("../interface/PrismaInstance");
const userContract_1 = require("../validators/userContract");
const schemasValidator_1 = require("../schemas/schemasValidator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const ResouceNotFoundError_1 = require("../errors/ResouceNotFoundError");
const InvalidPasswordError_1 = require("../errors/InvalidPasswordError");
const secret = process.env.JWT_TOKEN;
exports.userController = {
    createUser: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, username, password, userType, userIsVet, crmv, role, name } = schemasValidator_1.UserSchema.parse(request.body);
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        let contract = new userContract_1.ValidationContract();
        //await contract.userAlreadyExists(email, 'Usuário já existe!')
        yield contract.userHasAllToBeCreated({ email, password, username }, "Usuário não tem todos campos obrigatórios");
        if (contract.hadError()) {
            reply.status(400).send(contract.showErrors());
            contract.clearErrors();
            return;
        }
        yield PrismaInstance_1.prisma.user.create({
            data: { email, username, name, password: hashedPassword, userType, userIsVet, crmv, role }
        });
    }),
    getUsers: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { page } = request.query;
        const perPage = 10;
        const users = yield PrismaInstance_1.prisma.user.findMany();
        const total = Math.ceil(users.length / perPage);
        //@ts-ignore
        const pag = page ? page : 1;
        const init = (Number(pag) - 1) * perPage;
        const end = Math.min(init + perPage, users.length);
        const paginatedUser = users.slice(init, end);
        reply.send({
            pag,
            total,
            users: paginatedUser
        });
    }),
    loginUser: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const loginSchema = zod_1.z.object({
            username: zod_1.z.string(),
            password: zod_1.z.string(),
        });
        try {
            let contract = new userContract_1.ValidationContract();
            const { username, password } = loginSchema.parse(request.body);
            const user = yield PrismaInstance_1.prisma.user.findUnique({ where: {
                    username
                } });
            if (!user) {
                return reply.send("Usuário não encontrado");
            }
            const userData = {
                id: user.id,
                crm: user === null || user === void 0 ? void 0 : user.crmv,
                username: user === null || user === void 0 ? void 0 : user.username,
                name: user.name,
                consultName: user.consultName,
                role: user.role
            };
            const checkedPassword = yield contract.checkPassword({ username, password }, "Senha incorreta");
            if (!checkedPassword || checkedPassword === undefined) {
                throw new Error('Something wrong with this credentials');
            }
            if (!secret) {
                return;
            }
            const token = jsonwebtoken_1.default.sign({ userData }, secret, { expiresIn: "01h" });
            reply.send({ token: token, userData }).status(200);
        }
        catch (error) {
            if (error instanceof ResouceNotFoundError_1.ResourceNotFoundError || error instanceof InvalidPasswordError_1.InvalidPasswordError) {
                reply.status(404).send({ error: error.message });
            }
            reply.send({ error: error }).status(500);
        }
    }),
    getWithId: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = request.params;
        const users = yield PrismaInstance_1.prisma.user.findUnique({ where: { id: parseInt(id) } });
        reply.send(users);
    }),
    editUser: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = request.params;
        const { email, username, password, userIsVet, crmv, role } = schemasValidator_1.UserSchema.parse(request.body);
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        try {
            yield PrismaInstance_1.prisma.user.update({
                where: { id: parseInt(id) },
                data: {
                    email: email,
                    username: username,
                    password: hashedPassword,
                    userIsVet: userIsVet,
                    crmv,
                    role
                }
            });
            reply.status(201);
        }
        catch (error) {
            console.log(error);
            reply.status(400);
        }
    }),
    deleteUser: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = request.params;
        try {
            yield PrismaInstance_1.prisma.user.delete({
                where: { id: parseInt(id) }
            });
            reply.status(202);
        }
        catch (error) {
            reply.status(400);
            console.log(error);
        }
    }),
    findVetUsers: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const vetUsers = yield PrismaInstance_1.prisma.user.findMany({
            where: {
                userIsVet: true
            }
        });
        try {
            reply.send(vetUsers).status(200);
        }
        catch (error) {
            console.error(error);
            reply.status(400).send({ message: error });
        }
    }),
    getVetUsers: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const totalVets = yield PrismaInstance_1.prisma.user.count({
            where: { role: 'VETERINARIAN' }
        });
        const vets = yield PrismaInstance_1.prisma.user.findMany({
            where: {
                role: 'VETERINARIAN',
            }, select: {
                username: true,
                id: true,
                crmv: true,
                name: true,
                consultName: true
            }
        });
        try {
            reply.send({ totalVets, vets }).status(200);
        }
        catch (error) {
            console.error(error);
            reply.status(400).send({ message: error });
        }
    }),
    searchVetByName: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { consultName } = request.params;
            const vets = yield PrismaInstance_1.prisma.user.findMany({
                where: {
                    consultName: { contains: consultName },
                    role: 'VETERINARIAN'
                }
            });
            reply.send(vets);
        }
        catch (error) {
            reply.send(error);
        }
    })
};
