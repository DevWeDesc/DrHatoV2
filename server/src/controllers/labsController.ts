import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";



export const labsController = {
  getOpenExamsInLab: async (request:FastifyRequest, reply: FastifyReply) => {
    try {
      const exams = await prisma.examsForPet.findMany({
        where: {
          doneExame: false
        },
        orderBy: {requesteData: 'asc'},
        include: {
          medicine: {select: {pet: { select: {name: true}}}}
        }

      })
      reply.status(200).send(exams)
    } catch (error) {
      reply.send({message: {error}}).status(400)
      console.log(error)
    }
  },
  searchExamsBy: async (request:FastifyRequest<{
    Querystring: { name?: string; data?: string; petName?: string };
  }>, reply: FastifyReply) => {
      const name = request.query.name;
      const requesteData = request.query.data;
      const petName = request.query.petName;
        try {
          
          const result = await prisma.examsForPet.findMany({
            where: {
                  OR: [
                    {requesteData: { startsWith: requesteData},
                        name: {startsWith: name},
                        medicine: {pet: {name: { startsWith: petName }}}
                  }
                  ]
              },
              include : {medicine: {select: {pet: {select: {name: true}}}}}
              })

              const completeResult = result.map((exam) => {
                let examData = {
                  id: exam.id,
                  name: exam.name,
                  price: exam.price,
                  data: exam.requesteData,
                  petName: exam.medicine.pet.name,
                  done: exam.doneExame,
                  requested: exam.requestedFor
                }
                return examData
              })
               

              reply.send(completeResult).status(200)
        } catch (error) {
          reply.send({message: error}).status(400)
          console.log(error)
        }
            



  },
  searchImgExams: async (request:FastifyRequest<{
    Querystring: { name?: string; data?: string; petName?: string };
  }>, reply: FastifyReply) => {


     const name = request.query.name;
      const requesteData = request.query.data;
      const petName = request.query.petName;
    try {
      const result = await prisma.examsForPet.findMany({
        where: {
              OR: [
                {requesteData: { startsWith: requesteData},
                    name: {startsWith: name},
                    medicine: {pet: {name: { startsWith: petName }}}
              }
              ]
          },
          include : {medicine: {select: {pet: {select: {name: true}}}}}
          })

         const validateImgExam = result.map((exam) => {
            let data
             exam.examsType.includes("image") ? data = {
                   id: exam.id,
                  name: exam.name,
                  price: exam.price,
                  data: exam.requesteData,
                  petName: exam.medicine.pet.name,
                  done: exam.doneExame,
                  requested: exam.requestedFor
             } : null

             return data
         })

         reply.status(200).send(validateImgExam)
    } catch (error) {
      reply.status(200).send({message: error})
    }
  }
}