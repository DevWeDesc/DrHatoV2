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
exports.ValidationContract = void 0;
const schemasValidator_1 = require("../schemas/schemasValidator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const PrismaInstance_1 = require("../interface/PrismaInstance");
const ResouceNotFoundError_1 = require("../errors/ResouceNotFoundError");
const InvalidPasswordError_1 = require("../errors/InvalidPasswordError");
class ValidationContract {
    constructor() {
        this.errors = [];
    }
    customerAlreadyExists(value, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerExits = yield PrismaInstance_1.prisma.customer.findUnique({
                where: { cpf: value },
            });
            if (customerExits) {
                this.errors.push(message);
            }
        });
    }
    checkPassword(value, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield PrismaInstance_1.prisma.user.findUnique({ where: { username: value.username, } });
            if (!user) {
                throw new ResouceNotFoundError_1.ResourceNotFoundError();
            }
            const correctPassword = yield bcrypt_1.default.compare(value.password, user.password);
            if (!correctPassword) {
                throw new InvalidPasswordError_1.InvalidPasswordError();
            }
            if (correctPassword) {
                return true;
            }
        });
    }
    userAlreadyExists(value, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield PrismaInstance_1.prisma.user.findUnique({
                where: { email: value }
            });
            if (!userExist) {
                this.errors.push(message);
            }
        });
    }
    userHasAllToBeCreated(value, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (value.email == "" || value.username == "" || value.password == "") {
                this.errors.push(message);
            }
        });
    }
    examAlreadyExist(value, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const examExist = yield PrismaInstance_1.prisma.oldExams.findFirst({
                where: { name: value }
            });
            if (examExist) {
                this.errors.push(message);
            }
        });
    }
    validateExamsType(value, message) {
        return __awaiter(this, void 0, void 0, function* () {
            schemasValidator_1.ExamsType.some(e => value.includes(e)) ? true : this.errors.push(message);
        });
    }
    validateBedIsBusy(value, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const bedIsBusy = yield PrismaInstance_1.prisma.bed.findUnique({ where: { id: value }, select: { isBusy: true } });
            if ((bedIsBusy === null || bedIsBusy === void 0 ? void 0 : bedIsBusy.isBusy) === true) {
                this.errors.push(message);
            }
        });
    }
    showErrors() {
        return this.errors;
    }
    hadError() {
        if (this.errors.length >= 1)
            return true;
    }
    clearErrors() {
        this.errors = [];
    }
}
exports.ValidationContract = ValidationContract;
