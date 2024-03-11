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
exports.UserIsAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_TOKEN;
const UserIsAuth = (request, reply, done) => __awaiter(void 0, void 0, void 0, function* () {
    const token = request.headers.token || request.body.token;
    if (!token) {
        reply.status(401).send({ message: "ACESSO RESTRITO" });
        return;
    }
    else if (!secret) {
        return;
    }
    else {
        jsonwebtoken_1.default.verify(token, secret, function (error, decoded) {
            if (error) {
                reply.status(401).send({ message: "Token Inválido" });
            }
            else {
                done();
            }
        });
    }
});
exports.UserIsAuth = UserIsAuth;
