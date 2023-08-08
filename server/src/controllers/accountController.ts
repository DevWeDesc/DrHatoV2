import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { AdmissionSchema, BedSchema } from "../schemas/schemasValidator";
import { ValidationContract } from "../validators/validateContract";
import { z } from "zod";
const prisma = new PrismaClient();

type params = {
  id: string;
  recordId: string;
};

export const accountController = {

}