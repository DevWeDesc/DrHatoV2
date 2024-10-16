import { FastifyRequest, FastifyReply } from "fastify";
import { petSchema } from "../schemas/schemasValidator";
import { prisma } from "../interface/PrismaInstance";
import { z } from "zod";

export const petsController = {
  getAllPets: async (request: FastifyRequest, reply: FastifyReply) => {
    const PetsSchema = z.object({
      page: z.string(),
    });

    const { page = 0 }: any = request.query;

    const pageTotals = (await prisma.pets.count()) / 30;

    const cursorReference = Number(page) === 0 ? 1 : 30 * page;

    try {
      const pets = await prisma.pets.findMany({
        skip: Number(page),
        take: 30,
        cursor: {
          id: cursorReference,
        },
        include: {
          queue: { select: { id: true, queryType: true, vetPreference: true } },
          medicineRecords: { include: { petQueues: true } },
          customer: { select: { name: true } },
        },
        orderBy: {
          id: "asc",
        },
      });
      return reply.send(
        pets
        // pageInfos: { pageTotals: pageTotals, paginationActual: page },
      );
    } catch (error) {
      reply.status(404).send(error);
    }
  },

  getWithId: async (request: FastifyRequest, reply: FastifyReply) => {
    const { id }: any = request.params;
    try {
      const pet = await prisma.pets.findUnique({
        where: { id: parseInt(id) },
        include: {
          customer: {
            select: { name: true, id: true, balance: true, pets: true },
          },
          medicineRecords: {
            select: {
              petConsults: true,
              petExams: true,
              petQueues: true,
              observations: true,
              id: true,
              petVaccines: true,
              petSurgeries: true,
              petProcedures: true,
              petAdmissions: true,
              petBeds: {
                where: { isCompleted: false },
                include: { hospDiary: true },
              },
            },
          },
          
          queue: {
            select: {
              id: true,
              queryType: true,
              vetPreference: true,
              moreInfos: true,
              queueOur: true,
              queueEntry: true,
              petIsInQueue: true,
              
            },
          },
          bed: {
            select: {
              isBusy: true,
              entryOur: true,
              id: true,
              kennel: { select: { name: true, price: true } },
              dailyRate: true,
              mustFasting: true,
              vetPreference: true,
            },
          },
          priceAccumulator: { select: { id: true, accumulator: true } },
        },
      });

      const petData = {
        id: pet?.id,
        name: pet?.name,
        debits: pet?.debits,
        customerName: pet?.customer.name,
        customerId: pet?.customer.id,
        customerPets: pet?.customer.pets?.map((pet) => {
          let petsData = {
            id: pet.id,
            name: pet.name,
          };
          return petsData;
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
        codPet: pet?.CodAnimal,
        more: pet?.queue?.moreInfos,
        ouor: pet?.queue?.queueOur,
        recordId: pet?.medicineRecords?.id,
        isBusy: pet?.bed?.isBusy,
        bedInfos: {
          id: pet?.bed?.id,
          entry: pet?.bed?.entryOur,
          kennelName: pet?.bed?.kennel,
          fasting: pet?.bed?.mustFasting,
          price: pet?.bed?.kennel?.price,
          vetPreference: pet?.bed?.vetPreference,
        },
        exams: pet?.medicineRecords?.petExams.map((exams) => {
          let examData = {
            id: exams.id,
            requestedData: exams.requesteData,
            name: exams.name,
            price: exams.price,
            doneExam: exams.doneExame,
            linkedConsultId: exams.linkedConsultDebitId,
            linkedAdmissionId: exams.LinkedAdmissionDebitId,
            onePart: exams.onePart,
            twoPart: exams.twoPart,
            byText: exams.byReport,
          };
          return examData;
        }),
        vaccines: pet?.medicineRecords?.petVaccines.map((vaccine) => {
          let vacineData = {
            id: vaccine.id,
            name: vaccine.name,
            price: vaccine.price,
            requestedDate: vaccine.requestedDate,
            applicableDate: vaccine.applicationDate,
            linkedConsultId: vaccine.linkedConsultDebitId,
            linkedAdmissionId: vaccine.LinkedAdmissionDebitId,
          };
          return vacineData;
        }),
        surgeries: pet?.medicineRecords?.petSurgeries.map((surgerie) => {
          let surgeriesData = {
            id: surgerie.id,
            name: surgerie.name,
            price: surgerie.price,
            requestedDate: surgerie.requestedDate,
            completedDate: surgerie.completedDate,
            surgerieStatus: surgerie.status,
            linkedConsultId: surgerie.linkedConsultDebitId,
            linkedAdmissionId: surgerie.LinkedAdmissionDebitId,
            slotId: surgerie.slotId,
          };
          return surgeriesData;
        }),
        procedures: pet?.medicineRecords?.petProcedures.map((procedure) => {
          let procedureData = {
            id: procedure.id,
            name: procedure.name,
            price: procedure.price,
            available: procedure.available,
            requested: procedure.requestedDate,
            linkedConsultId: procedure.linkedConsultDebitId,
            linkedAdmissionId: procedure.LinkedAdmissionDebitId,
          };
          return procedureData;
        }),
        admissions: pet?.medicineRecords?.petBeds.map((bed) => {
          let bedData = {
            id: bed.id,
            entry: bed.entryOur,
            exit: bed.exitOur,
            totalDebit: bed.totalDebt,
            fasting: bed.mustFasting,
            observations: bed.hospDiary,
          };
          return bedData;
        }),
        admissionsHealthPlan: pet?.medicineRecords?.petAdmissions.map((admission) => {
          let admissionData = {
            id: admission.id,
            healthInsuranceName: admission.healthInsuranceName,
          };
          return admissionData;
        }
        ),
        consultsPet: pet?.medicineRecords?.petConsults.map((consult) => {
          let consultPet = {
            id: consult.id,
            openedDate: consult.openedDate,
            openedBy: consult.openedBy,
            vetPreference: consult.vetPreference,
            consultType: consult.consultType,
            medicineRecordId: consult.medicineRecordId,
            clientIsVip: consult.clientIsVip,
            observations: consult.observations,
          };
          return consultPet;
        }),
        queue: pet?.queue,
        queueHistory: pet?.medicineRecords?.petQueues,
        totalAcc: {
          id: pet?.priceAccumulator?.id,
          price: pet?.priceAccumulator?.accumulator,
        },
      };
      return reply.send(petData);
    } catch (error) {
      console.log(error);
    }
  },

  getPetLastedCodAnimal: async () => {
    try {
      const lastedPet = await prisma.pets.findMany({
        where: {
          CodAnimal: {
            not: null,
            gte: 60000
          },
          
        },
        orderBy: { CodCli: "desc" },
        take: 1,
      });
      return lastedPet[0].CodAnimal;

    }catch(error){
      console.log(error);
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
      observations,
    } = petSchema.parse(request.body);

    
    const { id }: any = request.params;
    
    const customer = await prisma.customer.findUnique({
      where: { id: parseInt(id) },
      select: { CodCli: true },
    });

    const codeAnimal = await petsController.getPetLastedCodAnimal();
    

  
    if (!customer) {
      reply.status(404).send("Cliente não encontrado");
      return;
    }

    try {
      await prisma.pets.create({
        data: {
          name,
          especie,
          CodAnimal: codeAnimal ? codeAnimal + 1 : 60000,
          sexo,
          race,
          weigth: parseFloat(weigth),
          haveChip,
          isCastred,
          corPet,
          bornDate,
          CodCli: customer.CodCli,
          observations,
          customer: {
            connect: {
              id: parseInt(id),
              
            },
          },
          queue: {
            create: {
              vetPreference: "",
              queryType: "",
              queueEntry: null,
            },
          },
          medicineRecords: {
            create: {
              observations: [""],
            },
          },
          priceAccumulator: {
            create: {
              accumulator: 0,
            },
          },
        },
      });

      reply.status(201).send("Sucesso");
    } catch (error) {
      console.error(error);
    }
  },

  petsInQueueVet: async (
    request: FastifyRequest<{
      Querystring: {
        vetName: string;
        isClosed: string;
        initialDate: string;
        finalDate: string;
        petName: string;
        petCode: string;
        customerName: string;
        page: number;
        isAddmited: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    const {
      vetName,
      isClosed,
      initialDate,
      finalDate,
      petName,
      petCode,
      customerName,
      page,
      isAddmited,
    } = request.query;

    const filter: { openedDate?: { gte: Date; lte: Date } } = {};

    if (initialDate && finalDate) {
      filter.openedDate = {
        gte: new Date(initialDate),
        lte: new Date(finalDate),
      };
    }

    try {

      const currentPage = Number(page) || 1;
      const totalConsults = await prisma.pets.count({
        where: {
          medicineRecords: {
            petConsults: {
              some: {
                isClosed: isClosed === "true" ? true : false,
                OR: [
                  { vetPreference: { contains: vetName } },
                  { vetPreference: "Sem preferência" },
                ]
              },
            },
          },
        },
      });

      

      const pets = await prisma.pets.findMany({
        // skip: (currentPage - 1) * 35,
        // take: 35,
        where: {
          CodAnimal: petCode ? Number(petCode) : undefined,
          name: { contains: petName, mode: "insensitive" },
          customer: { name: { contains: customerName, mode: "insensitive" } },
          medicineRecords: {
            petConsults: {
              some: {
                isClosed: isClosed === "true" ? true : false,                
                openedDate: filter.openedDate,
                OR: [
                  { vetPreference: { contains: vetName } },
                  { vetPreference: "Sem preferência" },
                ]
                
              },
            },
          },
          bed: isAddmited === "true" ? { isBusy: true } : undefined,
        },
        include: {
          medicineRecords: {
            include: {
              petConsults: {
                where: {
                  isClosed: isClosed === "true" ? true : false,
                  openedDate: filter.openedDate,
                  OR: [
                    { vetPreference: { contains: vetName } },
                    { vetPreference: "Sem preferência" },
                  ]
                },
                orderBy: { openedDate: "asc" },
              
              },
            },
          },
          bed: { select: { isBusy: true } },
          customer: { select: { name: true, vetPreference: true, cpf: true, } },
          
        },
      });

      const totalInQueue = await prisma.openedConsultsForPet.count({
        where: {
          vetPreference: { contains: vetName },
          isClosed: false,
        },
      });

      const response = pets.flatMap((pet: any) => {
        return (
          pet.medicineRecords?.petConsults.map((consult: any) => {
            return {
              name: pet.name,
              id: pet.id,
              customerName: pet.customer.name,
              vetPreference: consult.vetPreference ?? "Sem preferência",
              vetPreferenceOriginal: consult.vetPreferenceOriginal,
              queueId: consult.id,
              openedBy: consult.openedBy,
              codPet: pet.CodAnimal,
              queueEntry: consult.openedDate,
              especie: pet.especie,
              more: consult.observations,
              race: pet.race,
              customerCpf: pet.customer.cpf,
              queryType: consult.consultType,
              totalInQueue,
              petAdmitted: pet.bed?.isBusy ? true : false,
              idConsult: consult.idConsult,
            };
          }) || []
        );
      }).sort((a: any, b: any) => a.queueEntry - b.queueEntry);

      //Paginação
      const itemsPerPage = 35;
      const totalPages = Math.ceil( isClosed === "true"  ? response.length / 35  : totalConsults / 35);
      const paginatedResponse = response.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
      //Paginação

      return reply.send({response: paginatedResponse, totalInQueue, totalPages, totalConsults });
    } catch (error) {
      console.error(error);
      reply.status(404).send(error);
    }
  },

  petsInQueue: async (
    request: FastifyRequest<{
      Querystring: {
        vetName: string;
        isClosed: string;
        initialDate: string;
        finalDate: string;
        petName: string;
        petCode: string;
        customerName: string;
        page: number;
        isAddmited: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    const {
      vetName,
      isClosed,
      initialDate,
      finalDate,
      petName,
      petCode,
      customerName,
      page,
      isAddmited,
    } = request.query;

    const filter: { openedDate?: { gte: Date; lte: Date } } = {};

    if (initialDate && finalDate) {
      filter.openedDate = {
        gte: new Date(initialDate),
        lte: new Date(finalDate),
      };
    }

    try {

      const currentPage = Number(page) || 1;
      const totalConsults = await prisma.pets.count({
        where: {
          medicineRecords: {
            petConsults: {
              some: {
                isClosed: isClosed === "true" ? true : false,
                vetPreference: { contains: vetName },
              },
            },
          },
        },
      });

      

      const pets = await prisma.pets.findMany({
        // skip: (currentPage - 1) * 35,
        // take: 35,
        where: {
          CodAnimal: petCode ? Number(petCode) : undefined,
          name: { contains: petName, mode: "insensitive" },
          customer: { name: { contains: customerName, mode: "insensitive" } },
          medicineRecords: {
            petConsults: {
              some: {
                isClosed: isClosed === "true" ? true : false,
                vetPreference: { contains: vetName },
                openedDate: filter.openedDate,
                
              },
            },
          },
          bed: isAddmited === "true" ? { isBusy: true } : undefined,
        },
        include: {
          medicineRecords: {
            include: {
              petConsults: {
                where: {
                  isClosed: isClosed === "true" ? true : false,
                  openedDate: filter.openedDate,
                  vetPreference: { contains: vetName },
                },
                orderBy: { openedDate: "asc" },
              
              },
            },
          },
          bed: { select: { isBusy: true } },
          customer: { select: { name: true, vetPreference: true, cpf: true, } },
          
        },
      });

      const totalInQueue = await prisma.openedConsultsForPet.count({
        where: {
          vetPreference: { contains: vetName },
          isClosed: false,
        },
      });

      const response = pets.flatMap((pet: any) => {
        return (
          pet.medicineRecords?.petConsults.map((consult: any) => {
            return {
              name: pet.name,
              id: pet.id,
              customerName: pet.customer.name,
              vetPreference: consult.vetPreference ?? "Sem preferência",
              vetPreferenceOriginal: consult.vetPreferenceOriginal,
              queueId: consult.id,
              openedBy: consult.openedBy,
              codPet: pet.CodAnimal,
              queueEntry: consult.openedDate,
              especie: pet.especie,
              more: consult.observations,
              race: pet.race,
              customerCpf: pet.customer.cpf,
              queryType: consult.consultType,
              totalInQueue,
              petAdmitted: pet.bed?.isBusy ? true : false,
              idConsult: consult.idConsult,
            };
          }) || []
        );
      }).sort((a: any, b: any) => a.queueEntry - b.queueEntry);

      //Paginação
      const itemsPerPage = 35;
      const totalPages = Math.ceil( isClosed === "true"  ? response.length / 35  : totalConsults / 35);
      const paginatedResponse = response.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
      //Paginação

      return reply.send({response: paginatedResponse, totalInQueue, totalPages, totalConsults });
    } catch (error) {
      console.error(error);
      reply.status(404).send(error);
    }
  },

  petsByVetQueue: async (
    request: FastifyRequest<{ Params: { vetName: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { vetName } = request.params;

      const pets = await prisma.pets.findMany({
        where: {
          medicineRecords: {
            petConsults: {
              some: {
                isClosed: false,
              },
            },
          },
          AND: {
            medicineRecords: {
              petConsults: {
                some: {
                  vetPreference: { contains: vetName },
                },
              },
            },
          },
        },
        include: {
          medicineRecords: {
            include: { petConsults: true },
          },
          customer: { select: { name: true, vetPreference: true, cpf: true } },
        },
      });

      const totalInQueue = await prisma.queues.count({
        where: { petIsInQueue: true },
      });
      const response = pets.map((pet) => {
        let data = {
          name: pet.name,
          id: pet.id,
          customerName: pet.customer.name,
          vetPreference:
            pet.medicineRecords?.petConsults[0]?.vetPreference ??
            "Sem preferência",
          vetPreferenceOriginal: pet.customer.vetPreference,
          queueId: pet.medicineRecords?.petConsults[0]?.id,
          openedBy: pet.medicineRecords?.petConsults[0]?.openedBy,
          codPet: pet.CodAnimal,
          queueEntry: pet.medicineRecords?.petConsults[0]?.openedDate,
          especie: pet.especie,
          more: pet.medicineRecords?.petConsults[0]?.observations,
          race: pet.race,
          customerCpf: pet.customer.cpf,
          queryType: pet.medicineRecords?.petConsults[0]?.consultType,
          totalInQueue,
        };
        return data;
      });

      return reply.send({ response, totalInQueue });
    } catch (error) {
      reply.status(404).send(error);
    }
  },

  changePetWeight: async (
    request: FastifyRequest<{ Params: { petId: string; weight: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { petId, weight } = request.params;

      await prisma.pets.update({
        where: { id: parseInt(petId) },
        data: {
          weigth: parseFloat(weight),
        },
      });
    } catch (error) {
      reply.send(error);
      console.log(error);
    }
  },

  changePetAll: async (
    request: FastifyRequest<{ Params: { petId: string }, Body: {
      bornDate: string,
      cor: string,
      especie: string,
      haveChip: boolean,
      isCastred: boolean,
      name: string,
      observations: string,
      race: string,
      sexo: string,
      weigth: number,
    } }>,
    reply: FastifyReply
  ) => {
    try {
      const { petId } = request.params;
      const { bornDate, cor, especie, haveChip, isCastred, name, observations, race, sexo, weigth } = request.body;

      const pet = await prisma.pets.update({
        where: { id: parseInt(petId) },
        data: {
          bornDate,
          corPet: cor,
          especie,
          haveChip,
          isCastred,
          name,
          observations,
          race,
          sexo,
          weigth,
        },
      });

      reply.status(201).send(pet);
      
    } catch (error) {
      reply.send(error);
      console.log(error);
    }
  },

  getPetBedHistory: async (
    request: FastifyRequest<{ Params: { petId: string } }>,
    reply: FastifyReply
  ) => {
    const { petId } = request.params;
    try {
      const pet = await prisma.pets.findUnique({
        where: { id: parseInt(petId) },
        include: {
          medicineRecords: {
            include: {
              petBeds: true,
            },
          },
        },
      });

      reply.send(pet);
    } catch (error) {
      console.log(error);
      reply.send(error);
    }
  },

  createEspecie: async (
    request: FastifyRequest<{ Body: { name: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { name } = request.body;

      await prisma.especies.create({
        data: { name },
      });
      reply.status(201).send("Created successfully");
    } catch (error) {
      console.error(error);
      reply.send(error);
    }
  },

  getEspecies: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const especies = await prisma.especies.findMany({
        include: { race: true },
      });

      reply.send(especies);
    } catch (error) {
      console.log(error);
      reply.send(error);
    }
  },

  createRaces: async (
    request: FastifyRequest<{
      Body: { name: string; espId: number };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { name, espId } = request.body;

      await prisma.races.create({
        data: {
          name,
          Especies: {
            connect: { id: espId },
          },
        },
      });

      reply.status(201).send("Race created successfully");
    } catch (error) {
      console.log(error);
      reply.send(error);
    }
  },

  getEspeciesById: async (
    request: FastifyRequest<{ Params: { espId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { espId } = request.params;

      const esp = await prisma.especies.findUnique({
        where: { id: parseInt(espId) },
        include: { race: true },
      });

      reply.send({
        esp,
      });
    } catch (error) {
      console.log(error);
      reply.send({ message: error });
    }
  },

  getAllPetHistory: async (
    request: FastifyRequest<{ Params: { petId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { petId } = request.params;

      const response = await prisma.pets.findUnique({
        where: { id: parseInt(petId) },
        include: {
          medicineRecords: {
            select: {
              petBeds: { include: { hospDiary: true } },
              petExams: true,
              petConsults: true,
              petSurgeries: true,
              petVaccines: true,
            },
          },
          customer: {
            include: { pets: true },
          },
        },
      });

      reply.send(response);
    } catch (error) {
      console.log(error);
    }
  },

  getPetOldHistoryConsults: async (
    request: FastifyRequest<{ Params: { petId: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { petId } = request.params;

      const oldConsults = await prisma.pets.findUnique({
        where: { id: parseInt(petId) },
        include: {
          petOldConsults: true,
          customer: true,
        },
      });

      if (!oldConsults) {
        reply.status(404).send("sem histórico para esse animal!");
      }

      reply.send({
        oldConsults,
      });
    } catch (error) {
      reply.send({
        message: error,
      });
    }
  },

  getAllResultsOld: async (request: FastifyRequest, reply: FastifyReply) => {
    const resultOld = await prisma.resultsOld.findMany();
    return reply.status(200).send(resultOld);
  },

  getResultOldByExamId: async (
    request: FastifyRequest<{ Params: { resultId: string } }>,
    reply: FastifyReply
  ) => {
    const resultOld = await prisma.resultsOld.findUnique({
      where: { id: parseInt(request.params.resultId) },
    });

    if (resultOld == null)
      return reply
        .status(400)
        .send({ Message: "Resultado informado não existe!" });

    const petResult = await prisma.pets.findUnique({
      where: { CodAnimal: resultOld?.petId ? resultOld.petId : 0 },
    });

    const examResult = await prisma.oldExams.findUnique({
      where: { codexam: resultOld?.examId ? resultOld.examId : 0 },
      include: {
        partExams: {
          include: { examsDetails: true },
        },
      },
    });

    const data = {
      client: resultOld?.customerName,
      animal: `${petResult?.name}, ${petResult?.especie}, ${petResult?.race}, ${petResult?.dateAge}, ${petResult?.sexo}, Código do Animal: ${petResult?.CodAnimal}`,
      date: resultOld?.date,
      examName: resultOld?.examName,
      Exam: resultOld?.examName,
      solicited: `${resultOld?.requesterName} / ${resultOld?.requesterCRM}`,
      report: resultOld?.report,
    };

    return reply.status(200).send({ dataResult: data, petResult: petResult });
  },

  getResultsOldByPet: async (
    request: FastifyRequest<{ Params: { petId: string } }>,
    reply: FastifyReply
  ) => {
    const resultOldByPet = await prisma.resultsOld.findMany({
      where: { petId: parseInt(request.params.petId) },
    });
    return reply.status(200).send(resultOldByPet);
  },

  createResultsOld: async (request: FastifyRequest, reply: FastifyReply) => {
    const requestParams = z.object({
      examId: z.string(),
      petId: z.string(),
    });

    const { ...params } = requestParams.parse(request.params);

    const requestBody = z.object({
      date: z.string(),
      requesterCRM: z.string(),
      requesterName: z.string(),
      report: z.any(),
    });

    const { ...body } = requestBody.parse(request.body);

    try {
      const examById = await prisma.oldExams.findUnique({
        where: { codexam: Number(params.examId) },
        include: {
          partExams: {
            include: { examsDetails: true },
          },
        },
      });

      if (examById == null)
        return reply.status(400).send({ message: "Exame não encontrado!" });

      const petById = await prisma.pets.findUnique({
        where: { CodAnimal: parseInt(params.petId) },
        include: { customer: true },
      });

      if (petById == null)
        return reply.status(400).send({ message: "Pet não encontrado!" });

      await prisma.resultsOld.create({
        data: {
          customerName: petById?.customer.name,
          examName: examById?.name,
          petId: parseInt(params.petId),
          examId: parseInt(params.examId),
          date: body.date,
          requesterCRM: body.requesterCRM,
          requesterName: body.requesterName,
          report: examById.partExams,
        },
      });

      return reply
        .status(200)
        .send({ message: "Resultado Criado com sucesso!" });
    } catch (error) {
      return reply.status(400).send(error);
    }
  },
};
