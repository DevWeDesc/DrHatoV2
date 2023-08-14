import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();

const boxSchema = z.object({
  name: z.string().optional(),
  entryValues: z.number().optional(),
  exitValues: z.number().optional(),   
  movimentedValues: z.number().optional(),
  boxIsOpen: z.boolean().optional(),
  openBy: z.string().optional(),
  closedBy: z.string().optional(),
})

type params = {
  boxId: string
  vetBox: string
}

export const boxController = {
createVetBox: async(request: FastifyRequest, reply: FastifyReply) => {
  const {
    name, boxIsOpen
    } = boxSchema.parse(request.body)
    try {

      if(!name) return
      await prisma.hospVetBox.create({
        data: {name, boxIsOpen: boxIsOpen, entryValues: 0,  exitValues: 0, movimentedValues:0}
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
      reply.send(boxs[0])
  } catch (error) {
    console.log(error)
    reply.send(error)
  }
},

showDailyBox: async(request: FastifyRequest, reply: FastifyReply) => {
  try {
    const dailyBox = await prisma.hospBoxHistory.findFirst({
      where: {boxIsOpen: true}
    })
    reply.send(dailyBox)
  } catch (error) {
    console.log(error)
  }
},

showlastBoxClosed: async(request: FastifyRequest, reply: FastifyReply) => {
  try {
    const boxs = await prisma.hospBoxHistory.findMany({
      where: {boxIsOpen: false}
    })
    const lastBox = boxs[boxs.length - 1]
    reply.send(lastBox)

  } catch (error) {
    console.log(error)
  }
},


openBoxDaily: async(request: FastifyRequest<{Params: params}>, reply: FastifyReply) => {
  const {entryValues, exitValues, openBy} = boxSchema.parse(request.body)
    const {boxId} = request.params
    try {
      const actualDate = new Date();
      if(!entryValues || !exitValues) {
        return
      }

     const dailyBox = await prisma.hospBoxHistory.create({
        data: {openBox: actualDate, entryValues, exitValues,  boxIsOpen: true, openBy, totalValues: (entryValues - exitValues), HospVetBox: {connect: {id: parseInt(boxId)}}   }
      })

      await prisma.hospVetBox.update({
        where: {id: parseInt(boxId)},data: {boxIsOpen: true}
      })

      
      reply.send(dailyBox)

    } catch (error) {
      console.log(error)

    }
},

closeBoxDaily: async(request: FastifyRequest<{Params: params}>, reply: FastifyReply) => {
  const {boxId, vetBox} = request.params
  const {entryValues, exitValues, closedBy} = boxSchema.parse(request.body)
  try {
    const actualDate = new Date();

    await prisma.hospVetBox.update({
      where: {id: parseInt(vetBox)},data:{historyBox: {update: {where: {id: parseInt(boxId)}, data: {
        closeBox: actualDate, entryValues: {increment: entryValues }, exitValues: {increment: exitValues}, closedBy, boxIsOpen: false
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
},

showCustomerDebitsOpen: async(request: FastifyRequest<{Params: params}>, reply: FastifyReply) => {
        try {
        const accounts =  await prisma.customer.findMany({
            where: { customerAccount: {debits: {gte: 1}}},include: {
              customerAccount: true
            }
          })
          reply.send(accounts)
        } catch (error) {
          console.log(error)
        }
}


}