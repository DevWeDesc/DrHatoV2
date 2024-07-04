import { FastifyRequest, FastifyReply } from "fastify"
import { prisma } from "../interface/PrismaInstance"
import { z } from "zod"


function convertToISO(dateStr: any, timeStr: any) {
  const date = new Date(dateStr);
  const [time, period] = timeStr.split(' ');
  let [hours, minutes, seconds] = time.split(':').map(Number);
  
  if (period === 'PM' && hours !== 12) {
      hours += 12;
  } else if (period === 'AM' && hours === 12) {
      hours = 0;
  }

  date.setUTCHours(hours, minutes, seconds, 0);
  
  return date.toISOString();
}

export const oldConsultsController = {
  getCPFCustomer: async (id: number) => {
    const response = await prisma.customer.findUnique({ where: { CodCli: id }});
    return response?.cpf;
  },

  getPetInfos: async (id: number) => {
    const response = await prisma.pets.findUnique({ where: { CodAnimal: id }});
    return response;
  },


  getAllOldConsults: async (request: FastifyRequest<{
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
  

    try {

      const {
        vetName,
        initialDate,
        finalDate,
        petName,
        petCode,
        customerName,
        page,    
      } = request.query;

      const filter: { date?: { gte: Date; lte: Date } } = {};

    if (initialDate && finalDate) {
      filter.date = {
        gte: new Date(initialDate),
        lte: new Date(finalDate),
      };
    }

      const currentPage = Number(page) || 1;

      const oldConsults = await prisma.oldConsults.findMany({
        skip: (currentPage - 1) * 35,
        take: 35,
        where: {
          vetName: {
            contains: vetName,
          },
          petName: {
            contains: petName,
          },
          customerName: {
            contains: customerName,
          },
          CodAnimal: {
            equals: Number(petCode) || undefined,
          },
          date: filter.date,
        },
      });


      const response = await Promise.all(oldConsults.map(async (consult) => {
        const customerCpf = await oldConsultsController.getCPFCustomer(consult.CodCli);
        const petInfos = await oldConsultsController.getPetInfos(consult.petsId as number);
        return {
          name: consult.petName,
          id: petInfos?.id,
          customerName: consult.customerName,
          vetPreference: consult.vetName ?? "Sem preferência",
          queueId: consult.codConsulta,
          openedBy: consult.date,
          codPet: consult.CodAnimal,
          queueEntry: convertToISO(consult.date, consult.startAt) as string,
          especie: petInfos?.especie,
          more: "",
          race: petInfos?.race,
          customerCpf: customerCpf,
          queryType: consult.consulType,
          petAdmitted: false,
        };
      }));

      const totalExams = await prisma.oldConsults.count();
      const totalPages = Math.ceil(totalExams / 35);

      reply.send({ totalPages, totalExams, currentPage, response });
    } catch (error) {
      console.log(error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
};
