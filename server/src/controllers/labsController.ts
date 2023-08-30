import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { labService } from "../services/labsService";

export const labsController = {
  getOpenExamsInLab: async (request:FastifyRequest, reply: FastifyReply) => {
    try {
      const exams = await prisma.examsForPet.findMany({
        where: {
          doneExame: false
        },
        orderBy: {requesteData: 'asc'},
        include: {
          medicine: {select: {pet: { select: {name: true, id: true}}}}
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
                    {requesteData: { gte: requesteData},
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
                {requesteData: { gte: requesteData},
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
  },  

  reportAnExam: async (request:FastifyRequest, reply: FastifyReply) => {
    try {
      const {
       jsonString
      }: any = request.body

      let data = {
        jsonString
      }

    await labService.reportExam(2, data)

    } catch (error) {
      console.log(error)
    }
  },

  reportWithPdf: async (request: FastifyRequest<{Params:{ examId: string}}>, reply: FastifyReply) => {
  try {
    const {examId} = request.params
   const files  = request.files()

   const paths = await labService.saveExamPdfs(files)


   if(!paths || paths.length <= 0) return

   await prisma.examsForPet.update({
    where: {id: parseInt(examId)},data: {
      reportExams: {create: {
        internalReport: paths
      }}
    }
  })

    
  } catch (error) {
    reply.send({message: error})
    console.log(error)
  }
  },

  showExamsFiles: async (request: FastifyRequest<{Params:{ examId: string}}>, reply: FastifyReply) => {
    const {examId} = request.params
    try {
        // Definir o tipo de conteúdo como application/pdf
       // reply.type('application/pdf');
        // Ler o arquivo PDF usando fs.createReadStream() 
        reply.header('Content-Disposition', `attachment; filename="${examId}"`);

        const data  = await labService.returnExamFile(examId)

        reply.send(data)
    } catch (error) {
      console.log(error)
    } 
         
  },

  getReportExamById:async (request: FastifyRequest<{Params:{ examId: string}}>, reply: FastifyReply) => {
    try {
      const {examId} = request.params
    const examDetails =  await prisma.examsForPet.findUnique({
          where: {id: parseInt(examId)}, include: {reportExams: true, medicine:{include: {pet: true}}}
        })

      reply.send(examDetails).status(200)

    } catch (error) {
        console.log(error)
        reply.send(error)
    }
  }

}