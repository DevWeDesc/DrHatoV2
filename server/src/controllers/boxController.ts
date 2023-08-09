import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { AdmissionSchema, BedSchema } from "../schemas/schemasValidator";
import { ValidationContract } from "../validators/validateContract";
import { z } from "zod";
const { getDiferrenceBetweenOurs } = require("../utils/countOurs");
const prisma = new PrismaClient();

const boxSchema = z.object({
  name: z.string().optional(),
  entryValues: z.number().optional(),
  exitValues: z.number().optional(),   
  movimentedValues: z.number().optional(),
  boxIsOpen: z.boolean().optional(),
  responsbileBox: z.string().optional(),
})

type params = {
  boxId: string
  vetBox: string
}

export const boxController = {
createVetBox: async(request: FastifyRequest, reply: FastifyReply) => {
  const {
    name, boxIsOpen, entryValues, exitValues, movimentedValues
    } = boxSchema.parse(request.body)
    try {

      if(!name) return
      await prisma.hospVetBox.create({
        data: {name, boxIsOpen: boxIsOpen, entryValues: entryValues, exitValues, movimentedValues}
      })
      reply.send("Caixa criado com sucesso")
    } catch (error) {
      console.log(error)
      reply.send(error)
    }
},

showVetBox:  async(request: FastifyRequest, reply: FastifyReply) => {
  try {
    const boxs = await prisma.hospVetBox.findMany({include: {historyBox: true}})
      reply.send(boxs)
  } catch (error) {
    console.log(error)
    reply.send(error)
  }
},


openBoxDaily: async(request: FastifyRequest<{Params: params}>, reply: FastifyReply) => {
  const {entryValues, exitValues, responsbileBox} = boxSchema.parse(request.body)
    const {boxId} = request.params
    try {
      const actualDate = new Date();
      if(!entryValues || !exitValues) {
        return
      }
      await prisma.hospBoxHistory.create({
        data: {openBox: actualDate, entryValues, exitValues, responsbileBox, totalValues: (entryValues - exitValues), HospVetBox: {connect: {id: parseInt(boxId)}}   }
      })

      reply.send("Criado com sucesso")

    } catch (error) {
      console.log(error)

    }
},

closeBoxDaily: async(request: FastifyRequest<{Params: params}>, reply: FastifyReply) => {
  const {boxId, vetBox} = request.params
  const {entryValues, exitValues} = boxSchema.parse(request.body)
  try {
    const actualDate = new Date();

    await prisma.hospVetBox.update({
      where: {id: parseInt(vetBox)},data:{historyBox: {update: {where: {id: parseInt(boxId)}, data: {
        closeBox: actualDate, entryValues: {increment: entryValues }, exitValues: {increment: exitValues}
      }}}}
    })

    const dailyBox = await prisma.hospBoxHistory.findUnique({where: {id: parseInt(boxId)}})
    if(!dailyBox) {
      return
    } 

    await prisma.hospVetBox.update({
      where: {id: parseInt(vetBox)}, data: {entryValues: {increment: Number(dailyBox.entryValues)}, exitValues: {
        increment: Number(dailyBox.exitValues)
      }}
    })

    const dailyVetBox = await prisma.hospVetBox.findUnique({where: {id: parseInt(vetBox)}})

    let totalMovimentendValues = Number(dailyVetBox?.entryValues) + Number(dailyVetBox?.exitValues)

    await prisma.hospVetBox.update({where: {id: parseInt(vetBox)}, data: {movimentedValues: totalMovimentendValues,
      historyBox: {update: {where: {id: parseInt(boxId)}, data: {
          totalValues: Number(dailyBox.entryValues) - Number(dailyBox.exitValues)
      }}}
    }})


    reply.send("Caixa fechado com sucesso")
  } catch (error) {
    console.log(error)
  }
}
}