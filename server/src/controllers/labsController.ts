import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { labService } from "../services/labsService";
import { Prisma } from "@prisma/client";

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

      const examsdefault = await prisma.exams.findMany({
        select: {id: true, name: true}
      })



      const allExams = examsdefault

 

      reply.status(200).send({exams, allExams})
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

  reportAnExam: async (request:FastifyRequest<{Params: {examId: string}}>, reply: FastifyReply) => {
    const { examId } = request.params
    try {
      const {
       jsonString,
       responsible,
      }: any = request.body
      
    await labService.reportExam(examId, jsonString)

    await prisma.examsForPet.update({
      where:{id: parseInt(examId)}, data: {
        doneExame: true,
        responsibleForExam: responsible,
        isReportByText: true
      }
    })

    } catch (error) {
      console.log(error)
    }
  },

  reportTableExam: async (request:FastifyRequest<{Params: {examId: string}, Body: {requestedFor: string} & Prisma.ReportForExamsCreateInput }>, reply: FastifyReply) => {
    const {examId} = request.params
    const {report, isOnePart , isMultiPart, isReportByText, requestedFor } = request.body
    try {
     
      await prisma.examsForPet.update({
        where:{id: parseInt(examId)}, data: {
          doneExame: true,isMultiPart,isOnePart,requestedFor,isReportByText
        }
      })

      await prisma.reportForExams.create({
        data: { isOnePart, isMultiPart, isReportByText, report, examsForPet: {connect: {id: parseInt(examId)}}}
      })


      reply.send("Exame laudado")
    } catch (error) {
      console.log(error)
      reply.send({message: error})
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
          where: {id: parseInt(examId)}, include: {reportExams: true, medicine:{include: {pet: {include: {customer: {select: {name: true}}}}}}}
        })


      if(!examDetails){
        return
      }

     const examRefs =  await prisma.exams.findFirst({
      where: {name: {contains: examDetails.name}},include: {multiparts: {select: {characteristics: true}}, characteristics: true}
     }) 
  
      reply.send({examDetails, examRefs}).status(200)

    } catch (error) {
        console.log(error)
        reply.send(error)
    }
  },


  getOnePartExamResultById:async (request: FastifyRequest<{Params:{ examId: string}}>, reply: FastifyReply) =>  {
    try {
      const {examId} = request.params
    const examDetails =  await prisma.examsForPet.findUnique({
          where: {id: parseInt(examId)}, include: {reportExams: true, medicine:{include: {pet: {include: {customer: {select: {name: true}}}}}}}
        })


      if(!examDetails){
        return
      }



     const examRefs =  await prisma.exams.findFirst({
      where: {name: {contains: examDetails.name}},include: {characteristics: true}
     }) 


     const petExamResult = {
      solicitedBy: examDetails.requestedFor,
      solicitedCrm: "Todo",
      examName: examDetails.name,
      petName: examDetails.medicine.pet.name,
      petEspecie: examDetails.medicine.pet.especie,
      petRace: examDetails.medicine.pet.race,
      petSex: examDetails.medicine.pet.sexo,
      petCod: examDetails.medicine.pet.CodAnimal,
      petCustomer: examDetails.medicine.pet.customer.name,
      result: examDetails.reportExams[0].report
     }

     const petExamRefs = examRefs?.characteristics


     //@ts-ignore
     const filteredRefIdades = petExamRefs?.map((ch) => {
      return {
        id: ch.id,
        name: ch.name,
          //@ts-ignore
        especies:  ch.especie.filter(e => e.name === petExamResult.petEspecie )
      }
     })

      reply.send({petExamResult, filteredRefIdades }).status(200)

    } catch (error) {
        console.log(error)
        reply.send(error)
    }
  }



}