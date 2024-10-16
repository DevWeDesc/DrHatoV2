import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { SearchSchema } from "../schemas/schemasValidator";
import { searchEngine } from "../engines/searchEngine";
import { VetsMenuSearch } from "../engines/vets.menu.search";
import { LabsMenuSearch } from "../engines/labs.menu.search";

type LabSearchParams = {
  petName: string;
  petCode: string;
  solicitedBy: string;
  initialDate: string;
  finalDate: string;
  codeExam: number;
  showEndExams: string;
};

export const searchController = {
  getAll: async (
    request: FastifyRequest<{
      Querystring: { name?: string; cpf?: string; adress?: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const cpf = request.query.cpf;
      const name = request.query.name;
      const adress = request.query.adress;

      const result = await prisma.customer.findMany({
        where: {
          OR: [
            { name: { startsWith: name } },
            { adress: { startsWith: adress } },
            { cpf: { startsWith: cpf } },
          ],
        },
        include: {
          pets: { include: { queue: true } },
        },
      });

      reply.status(200).send(result);
    } catch (error) {
      reply.status(400).send({ message: error });
      console.log(error);
    }
  },
  vetsBigSearchs: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const {
        initialDate,
        finalDate,
        codPet,
        customerName,
        petName,
        isHospitalized,
        isFinished,
        typePaymentClient,
      } = SearchSchema.parse(request.query);

      const response = await searchEngine({
        customerName,
        petName,
        codPet,
        finalDate,
        initialDate,
        isFinished,
        isHospitalized,
        typePaymentClient,
      });

      if (!response || response == null || response == undefined) {
        reply.status(404);
      } else {
        reply.send(response).status(200);
      }
    } catch (error) {
      reply.status(400).send({ message: error });
      console.log(error);
    }
  },

  admissionsSearch: async (
    request: FastifyRequest<{
      Querystring: {
        clientName: string;
        animalName: string;
        codPet: string;
        finished: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { clientName, animalName, codPet, finished } = request.query;
      if (finished === "true") {
        const admmitepet = await prisma.openededAdmissionsForPet.findMany({
          where: {
            isClosed: true,
            customerAccount: {
              customer: {
                name: { contains: clientName, mode: "insensitive" },
              },
            },
            MedicineRecord: {
              pet: {
                name: { contains: animalName, mode: "insensitive" },
                ...(codPet && { CodAnimal: Number(codPet) }),
              },
            },
          },
          include: {
            MedicineRecord: {
              include: {
                pet: true,
              },
            },
            customerAccount: {
              include: {
                customer: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });

        const data = admmitepet.map((admission) => {
          let data = {
            id: admission.id,
            customer: {
              name: admission.customerAccount?.customer.name,
            },
            name: admission.petName,
            especie: admission.MedicineRecord?.pet?.especie ?? "",
            race: admission.MedicineRecord?.pet.race ?? "",
            bed: {
              entryOur: admission.openedDate,
              kennel: {
                name: "-",
              },
              id: "-",
            },
            CodAnimal: admission.MedicineRecord?.pet?.CodAnimal,
          };
          return data;
        });
        reply.send(data);
      } else {
        const admmitepet = await prisma.pets.findMany({
          where: {
            bed: { isBusy: true },
            name: { contains: animalName, mode: "insensitive" },
            ...(codPet && { CodAnimal: Number(codPet) }),
            customer: { name: { contains: clientName, mode: "insensitive" } },
          },
          include: {
            bed: { include: { kennel: true } },
            customer: { select: { name: true } },
            medicineRecords: {
              include: { petBeds: { where: { isCompleted: false } } },
            },
          },
        });

        reply.send(admmitepet).status(200);
      }
    } catch (error) {
      console.log(error);
    }
  },

  paymentsSearch: async (
    request: FastifyRequest<{
      Querystring: {
        name: string;
        cpf: string;
        codCli: string;
        codPet: string;
        telephone: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { name, cpf, codCli, codPet, telephone } = request.query;

      const cpfFilter = cpf ? { contains: cpf } : undefined;
      const codCliFilter =
        codCli && !isNaN(Number(codCli)) ? Number(codCli) : undefined;
      const phoneFilter = telephone ? { contains: telephone } : undefined;
      const codPetNumber =
        codPet && !isNaN(Number(codPet)) ? Number(codPet) : undefined;
      const petsFilter = codPetNumber
        ? { some: { CodAnimal: codPetNumber } }
        : undefined;

      const accounts = await prisma.customer.findMany({
        where: {
          name: { contains: name, mode: "insensitive" },
          cpf: cpfFilter,
          CodCli: codCliFilter,
          phone: phoneFilter,
          pets: petsFilter,
        },
        include: {
          pets: {
            select: {
              name: true,
              CodAnimal: true,
            },
          },
          customerAccount: true,
        },
      });

      reply.send(accounts);
    } catch (error) {
      console.log(error);
    }
  },

  searchVetMenu: async (
    request: FastifyRequest<{
      Querystring: {
        petName: string;
        customerName: string;
        petCode: string;
        isAddmited: string;
        isFinished: string;
        finalDate: string;
        initialDate: string;
      };
      Params: { page: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const {
        petName,
        customerName,
        petCode,
        isAddmited,
        isFinished,
        finalDate,
        initialDate,
      } = request.query;

      const currentPage = Number(request.params.page) || 1;

      const vetsMenuSearch = new VetsMenuSearch();

      vetsMenuSearch.currentPage = currentPage;

      const { data, totalUsers, totalPages } = await vetsMenuSearch.getParams({
        petName,
        customerName,
        petCode,
        isAddmited,
        isFinished,
        finalDate,
        initialDate,
      });

      if (isFinished && (initialDate || finalDate)) {
        const { data } = await vetsMenuSearch.getParamsWithDate({
          petName,
          customerName,
          petCode,
          isAddmited,
          isFinished,
          finalDate,
          initialDate,
        });
        reply.send(data);
      }

      if (isAddmited && (initialDate || finalDate)) {
        const { data } = await vetsMenuSearch.getParamsWithDate({
          petName,
          customerName,
          petCode,
          isAddmited,
          isFinished,
          finalDate,
          initialDate,
        });
        reply.send(data);
      }

      reply.send({ totalUsers, totalPages, currentPage, data });
    } catch (error) {
      console.log(error);
    }
  },

  getByCodPet: async (
    request: FastifyRequest<{
      Params: { codPet: string };
    }>,
    reply: FastifyReply
  ) => {
    const { codPet } = request.params;
    try {
      const data = await prisma.pets.findFirst({
        where: { CodAnimal: Number(codPet) },
        include: { customer: true },
      });

      reply.send([data]);
    } catch (error) {
      reply.send({ error });
      console.log(error);
    }
  },
  searchLabMenu: async (
    request: FastifyRequest<{
      Querystring: LabSearchParams;
    }>,
    reply: FastifyReply
  ) => {
    try {
      const {
        petCode,
        petName,
        solicitedBy,
        initialDate,
        finalDate,
        codeExam,
        showEndExams,
      } = request.query;

      const labSearchMenu = new LabsMenuSearch();

      const exams = await labSearchMenu.getWithParams({
        petCode,
        petName,
        solicitedBy,
        initialDate,
        finalDate,
        codeExam,
      });

      if (showEndExams.length > 0) {
        const filterExams = exams.filter(
          (exam) =>
            exam.doneExame !== null &&
            exam.doneExame.toString() === showEndExams
        );
        reply.send({ exams: filterExams });
      }

      reply.send({ exams });
    } catch (error) {
      console.log(error);

      reply.send({ error });
    }
  },
};
