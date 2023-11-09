import { PrismaClient } from "@prisma/client";
import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import jwt from 'jsonwebtoken'

const secret = process.env.JWT_TOKEN;

export const UserIsAuth = async (request: FastifyRequest<{ Body: { username: string, token: string}, Querystring: {token: string}, Headers: {token: string}} >, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    const token = request.headers.token || request.body.token

    if(!token){
        reply.status(401).send({message: "ACESSO RESTRITO"})
        return
    } else if(!secret) {
        return
    } else {
        jwt.verify(token, secret, function(error, decoded) {
            if(error) {
                reply.status(401).send({message: "Token Inválido"})
            } else {
                done()
            }
        })
    }
}