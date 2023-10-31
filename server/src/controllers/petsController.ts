import { FastifyRequest, FastifyReply } from 'fastify'
import { petSchema } from '../schemas/schemasValidator'
import { prisma } from '../interface/PrismaInstance'

export const petsController = {
  getAllPets: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const pets = await prisma.pets.findMany({
        include: {
          queue: { select: { id: true, queryType: true, vetPreference: true } },
          medicineRecords: { include: { petQueues: true } },
          customer: { select: { name: true } }
        }
      })
      return reply.send(pets)
    } catch (error) {
      reply.status(404).send(error)
    }
  },

  getWithId: async (request: FastifyRequest, reply: FastifyReply) => {
    const { id }: any = request.params
    try {
      const pet = await prisma.pets.findUnique({
        where: { id: parseInt(id) },
        include: {
          customer: {
            select: { name: true, id: true, balance: true, pets: true }
          },
          medicineRecords: {
            select: {
              petExams: { include: { reportExams: true } },
              petQueues: true,
              observations: true,
              id: true,
              petVaccines: true,
              petSurgeries: true,
              petProcedures: true,
              petBeds: { where: { isCompleted: false },include: {hospDiary: true} }
            }
          },
          queue: {
            select: {
              id: true,
              queryType: true,
              vetPreference: true,
              moreInfos: true,
              queueOur: true,
              queueEntry: true,
              petIsInQueue: true
            }
          },
          bed: {
            select: {
              isBusy: true,
              entryOur: true,
              id: true,
              kennel: { select: { name: true, price: true } },
              dailyRate: true,
              mustFasting: true,

            },
            
          },
          priceAccumulator: { select: { id: true, accumulator: true } }
        }
      })

      const petData = {
        id: pet?.id,
        name: pet?.name,
        debits: pet?.debits,
        customerName: pet?.customer.name,
        customerId: pet?.customer.id,
        customerPets: pet?.customer.pets?.map(pet => {
          let petsData = {
            id: pet.id,
            name: pet.name
          }
          return petsData
        }),
        especie: pet?.especie,
        sexo: pet?.sexo,
        race: pet?.race,
        castred: pet?.isCastred,
        chip: pet?.haveChip,
        weigth: pet?.weigth,
        corPet: pet?.corPet,
        sizePet: pet?.sizePet,
        bornDate: pet?.bornDate,
        observations: pet?.observations,
        codPet: pet?.codPet,
        more: pet?.queue?.moreInfos,
        ouor: pet?.queue?.queueOur,
        recordId: pet?.medicineRecords?.id,
        isBusy: pet?.bed?.isBusy,
        bedInfos: {
          id: pet?.bed?.id,
          entry: pet?.bed?.entryOur,
          kennelName: pet?.bed?.kennel,
          fasting: pet?.bed?.mustFasting,
          price: pet?.bed?.kennel?.price
        },
        exams: pet?.medicineRecords?.petExams.map(exams => {
          let examData = {
            id: exams.id,
            requestedData: exams.requesteData,
            name: exams.name,
            price: exams.price,
            doneExam: exams.doneExame,
            reports: exams.reportExams
          }
          return examData
        }),
        vaccines: pet?.medicineRecords?.petVaccines.map(vaccine => {
          let vacineData = {
            id: vaccine.id,
            name: vaccine.name,
            price: vaccine.price,
            requestedDate: vaccine.requestedDate,
            applicableDate: vaccine.applicationDate
          }
          return vacineData
        }),
        surgeries: pet?.medicineRecords?.petSurgeries.map(surgerie => {
          let surgeriesData = {
            id: surgerie.id,
            name: surgerie.name,
            price: surgerie.price,
            requestedDate: surgerie.requestedDate,
            completedDate: surgerie.completedDate,
            surgerieStatus: surgerie.status
          }
          return surgeriesData
        }),
        procedures: pet?.medicineRecords?.petProcedures.map(procedure => {
          let procedureData = {
            id: procedure.id,
            name: procedure.name,
            price: procedure.price,
            available: procedure.available,
            requested: procedure.requestedDate
          }
          return procedureData
        }),
        admissions: pet?.medicineRecords?.petBeds.map(bed => {
          let bedData = {
            id: bed.id,
            entry: bed.entryOur,
            exit: bed.exitOur,
            totalDebit: bed.totalDebt,
            fasting: bed.mustFasting,
            observations: bed.hospDiary
          }
          return bedData
        }),
        queue: pet?.queue,
        queueHistory: pet?.medicineRecords?.petQueues,
        totalAcc: {
          id: pet?.priceAccumulator?.id,
          price: pet?.priceAccumulator?.accumulator
        }
      }
      return reply.send(petData)
    } catch (error) {
      console.log(error)
    }
  },

  createPet: async (request: FastifyRequest, reply: FastifyReply) => {
    const {
      name,
      especie,
      sexo,
      race,
      weigth,
      haveChip,
      isCastred,
      corPet,
      bornDate,
      observations
    } = petSchema.parse(request.body)

    const { id }: any = request.params

    try {
      const petAlreadyExists = await prisma.pets.findFirst({
        where: { name: name }
      })

      if (petAlreadyExists) {
        reply.status(404).send('Pet already exists')
        return
      }

      await prisma.pets.create({
        data: {
          name,
          especie,
          sexo,
          race,
          weigth,
          haveChip,
          isCastred,
          corPet,
          bornDate,
          observations,
          customer: {
            connect: {
              id: parseInt(id)
            }
          },
          queue: {
            create: {
              vetPreference: '',
              queryType: '',
              queueEntry: null
            }
          },
          medicineRecords: {
            create: {
              observations: ['']
            }
          },
          priceAccumulator: {
            create: {
              accumulator: 0
            }
          }
        }
      })

      reply.status(201).send('Sucesso')
    } catch (error) {
      reply.send('FALHA')
    }
  },

  petsInQueue: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const pets = await prisma.pets.findMany({
        where: {
          queue: { petIsInQueue: true }
        },
        include: {
          queue: {
            select: {
              vetPreference: true,
              queryType: true,
              queueEntry: true,
              petIsInQueue: true,
              queueExit: true,
              queueOur: true,
              moreInfos: true
            }
          },
          customer: { select: { name: true, vetPreference: true, cpf: true } }
        }
      })

      const totalInQueue = await prisma.queues.count({
        where: { petIsInQueue: true }
      })
      const response = pets.map(pet => {
        let data = {
          name: pet.name,
          id: pet.id,
          customerName: pet.customer.name,
          vetPreference: pet.queue?.vetPreference,
          codPet: pet.codPet.substring(0, 6).concat('...'),
          queueEntry: pet.queue?.queueEntry,
          ouor: pet.queue?.queueOur,
          especie: pet.especie,
          more: pet.queue?.moreInfos,
          race: pet.race,
          customerCpf: pet.customer.cpf,
          queryType: pet.queue?.queryType,
          totalInQueue
        }
        return data
      })

      return reply.send({ response, totalInQueue })
    } catch (error) {
      reply.status(404).send(error)
    }
  },

  changePetWeight: async (
    request: FastifyRequest<{ Params: { petId: string; weight: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { petId, weight } = request.params

      await prisma.pets.update({
        where: { id: parseInt(petId) },
        data: {
          weigth: weight
        }
      })
    } catch (error) {
      reply.send(error)
      console.log(error)
    }
  },

  getPetBedHistory: async (request: FastifyRequest<{ Params: {petId: string}}>, reply: FastifyReply) => {
    const { petId } = request.params
    try {
       const pet = await prisma .pets.findUnique({
          where: {id:  parseInt(petId)}, include: {
            medicineRecords: {include:{ 
              petBeds: true

            }}
          }
        })

        reply.send(pet)
    } catch (error) {
      console.log(error)
      reply.send(error)
    }
  },

  createEspecie: async (request: FastifyRequest<{ Body: {name: string}}>, reply: FastifyReply) => {
    try {
        const {name} = request.body

        await prisma.especies.create({
          data: {name}
        })
        reply.status(201).send("Created successfully")
    } catch (error) {
      console.error(error)
      reply.send(error)
    }
  },

  getEspecies: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const especies = await prisma.especies.findMany({
        include: {race: true}
      })

      reply.send(especies)
    } catch (error) {
      console.log(error)
      reply.send(error)
    }
  },

  createRaces: async (request: FastifyRequest<{
    Body: { name: string, espId: number}
  }>, reply: FastifyReply) => {
    try {

      const { name, espId } = request.body
      
      await prisma.races.create({
        data: {name, Especies: {
          connect: { id: espId}
        }}
      })

      reply.status(201).send('Race created successfully')
    } catch (error) {
      console.log(error)
      reply.send(error)
    }
  },

  getEspeciesById: async (request: FastifyRequest<{Params: {espId: string}}>, reply: FastifyReply) => {
      try {

        const {espId} = request.params

       const esp =  await prisma.especies.findUnique({
          where: {id: parseInt(espId)},
          include: {race: true}
        })


        reply.send({
          esp
        })
      } catch (error) {
        console.log(error)
        reply.send({message: error})
      }
  },


  getAllPetHistory: async (request: FastifyRequest<{Params: {petId: string}}>, reply: FastifyReply) => {
    try {
      const {petId} = request.params

     const response = await prisma.pets.findUnique({
        where: {id: parseInt(petId)}, include: {medicineRecords: {select: {petBeds: {include :{hospDiary: true}}, petExams: true, petQueues: true, petSurgeries: true, petVaccines: true}}, customer: true}
      }) 

      reply.send(response)

    } catch (error) {
      console.log(error)
    }
}




}
