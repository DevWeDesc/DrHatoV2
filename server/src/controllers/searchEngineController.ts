import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../interface/PrismaInstance";
import { randomUUID } from "crypto";

export const searchEngineController =  {

  

  veterinaryMenuSearch: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const veterinaryMenuSearchBody = z.object({
        customerName: z.string().optional(),
        petName: z.string().optional(),
        petCode: z.coerce.number().optional(),
        isFinished: z.boolean().optional(),
        isAddmited: z.boolean().optional(),
        initialDate: z.string().optional(),
        finalDate: z.string().optional(),
        page: z.number().optional(),
      })

      const {customerName,finalDate,initialDate,isAddmited,isFinished,petCode,petName, page} = veterinaryMenuSearchBody.parse(request.body)
      const today = new Date(initialDate ? initialDate : new Date());
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const endDay = new Date(finalDate ? finalDate : tomorrow);
      endDay.setHours(0, 0, 0, 0);


      const currentPage = page || 1;
      let data;
      let total;

  
      switch(true) {
        case isFinished:
          const response = await prisma.openedConsultsForPet.findMany({
            skip: (currentPage - 1) * 25,
            take: 25,
            where: {
              
              AND: [
                {openedDate: {gte: today}},
                {closedDate: {lte: endDay}}
              ],
              isClosed: true,
              MedicineRecord: {
                pet: {
                  OR: [
                    { name: { contains: petName } },
                    { customer: { name: { contains: customerName } } },
                    { CodAnimal: { equals: petCode } },
                  ],
                },
              },
            },
  
            include: {
              MedicineRecord: {
                include: {
                  pet: {
                    select: {
                      name: true,
                      id: true,
                      weigth: true,
                      CodAnimal: true,
                      customer: { select: { name: true, cpf: true } },
                    },
                  },
                },
              },
            },
          });
          data = response.map((res) => {
            let data = {
              id: res.MedicineRecord?.pet.id,
              name: res.MedicineRecord?.pet?.name,
              codPet: res.MedicineRecord?.pet?.CodAnimal,
              randomUUID: randomUUID(),
              finished: res.closedDate,
              customer: {
                name: res.MedicineRecord?.pet?.customer?.name,
                cpf: res.MedicineRecord?.pet?.customer?.cpf,
              },
              responsible: res.clodedByVetName,
            };
            return data;
          });

          total = data.length

          reply.send({
            data,
            total,
            totalPages: Math.ceil(total / 25),
            currentPage
          })
         break

        case isAddmited: 
        const beds = await prisma.bed.findMany({
          skip: (currentPage - 1) * 25,
          take: 25,
          where: {
            isBusy: true,
            AND: [
              {entryOur: {gte: today}},
              {exitOur: {lte: endDay}},
            ],
            pet: {
              OR: [
                { name: { contains: petName } },
                { customer: { name: { contains: customerName } } },
                { CodAnimal: { equals: petCode } },
              ],
            },
          },
          include: { pet: { include: { customer: true } } },
        });

        data = beds.map((data) => {
          let res = {
            isBusy: data.isBusy,
            id: data.petId,
            name: data.pet?.name,
            codPet: data.pet?.codPet,
            weigth: data.pet?.weigth,
            customer: {
              name: data.pet?.customer.name,
              cpf: data.pet?.customer.cpf,
              vetPreference: data.pet?.customer.vetPreference,
            },
          };
          return res;
        });

        total = data.length

        reply.send({
          data,
          total,
          totalPages: Math.ceil(total / 25),
          currentPage
        })
        break
         //@ts-ignore
        case customerName?.length >= 1 &&  !isFinished && !isAddmited:
        data = await prisma.pets.findMany({
          skip: (currentPage - 1) * 25,
          take: 10,
          where: {
            customer: { name: { contains: customerName } },
          },
          include: { customer: true },
        });

        total = data.length

        reply.send({
          data,
          total,
          totalPages: Math.ceil(total / 25),
          currentPage
        })

        break
        //@ts-ignore
        case petName.length >= 1 &&  !isFinished && !isAddmited:
        data = await prisma.pets.findMany({
          where: {
            name: { contains: petName },
          },
          include: { customer: true },
        });
        total = data.length

        reply.send({
          data,
          total,
          totalPages: Math.ceil(total / 25),
          currentPage
        })
        break;

      //@ts-ignore
      case petCode >= 1 &&  !isFinished && !isAddmited: 
      data = await prisma.pets.findMany({
        where: {
          CodAnimal: Number(petCode),
        },
        include: { customer: true },
      });

      total = data.length

      reply.send({
        data,
        total,
        totalPages: Math.ceil(total / 25),
        currentPage
      })
      break;
        
      default:
        data = await prisma.pets.findMany({
          skip: (currentPage - 1) * 25,
          take: 25,
          where: {
            OR: [
              { name: { contains: petName } },
              { customer: { name: { contains: customerName } } },
              { CodAnimal: { equals: petCode } },
            ],
          },
        });

        total = await prisma.pets.count()

        reply.send({
          data,
          total,
          totalPages: Math.ceil(total / 25),
          currentPage
        })
      break;


      }

   
    } catch (error) {
      console.log(error)
    }
  }

}