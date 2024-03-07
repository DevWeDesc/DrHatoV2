import { FastifyRequest, FastifyReply } from "fastify";
import { ValidationContract } from "../validators/userContract";
import { createCustomer } from "../schemas/schemasValidator";
import { randomNumberAccount } from "../utils/randomNumberAccount";
import { prisma } from "../interface/PrismaInstance";
import { z } from "zod";

export const customerController = {
  showAllUsers: async (
    request: FastifyRequest<{ Querystring: { page: string } }>,
    reply: FastifyReply
  ) => {
    try {
      // Obtenha o número da página atual a partir da solicitação.
      const currentPage = Number(request.query.page) || 1;

      // Obtenha o número total de usuários.
      const totalUsers = await prisma.customer.count();

      // Calcule o número de páginas.
      const totalPages = Math.ceil(totalUsers / 35);

      const allUser = await prisma.customer.findMany({
        skip: (currentPage - 1) * 35,
        take: 35,
        include: {
          pets: true,
          transaction: true,
          customerAccount: { include: { installments: true } },
        },
      });

      return reply.send({
        totalUsers,
        currentPage,
        totalPages,
        users: allUser,
      });
    } catch (error) {
      return reply.status(404).send({ message: error });
    }
  },

  searchUser: async (
    request: FastifyRequest<{
      Params: { page: string };
      Querystring: { name?: string; cpf?: string; rg?: string; codPet: string };
    }>,
    reply: FastifyReply
  ) => {
    const { name, cpf, rg, codPet } = request.query;
    // Obtenha o número da página atual a partir da solicitação.
    const currentPage = Number(request.params.page) || 1;

    // Obtenha o número total de usuários.
    const totalUsers = await prisma.customer.count();

    // Calcule o número de páginas.
    const totalPages = Math.ceil(totalUsers / 35);
    try {
      let customer;

      customer = await prisma.customer.findMany({
        skip: (currentPage - 1) * 35,
        take: 35,
        where: {
          OR: [
            { name: { contains: name } },
            { cpf: { contains: cpf } },
            { rg: { contains: rg } },
          ],
        },
        include: { pets: true, transaction: true },
      });

      if (!!codPet) {
        customer = [];
        const data = await prisma.customer.findFirst({
          where: { pets: { some: { CodAnimal: Number(codPet) } } },
        });
        customer.push(data);
      }

      reply.send(customer);
    } catch (error) {
      reply.status(404).send(error);
      console.log(error);
    }
  },
  createUser: async (request: FastifyRequest, reply: FastifyReply) => {
    const contract = new ValidationContract();

    const {
      name,
      adress,
      district,
      rg,
      phone,
      tell,
      email,
      cpf,
      birthday,
      balance,
      cep,
      howKnowUs,
      kindPerson,
      neighbour,
      state,
    } = createCustomer.parse(request.body);
    try {
      await contract.customerAlreadyExists(cpf, "Usuário já existe!");
      if (contract.hadError()) {
        reply.status(400).send(contract.showErrors());
        contract.clearErrors();
        return;
      }

      const customer = await prisma.customer.create({
        data: {
          name,
          adress,
          phone,
          email,
          cpf,
          birthday,
          balance,
          cep,
          district,
          howKnowUs,
          rg,
          tell,
          kindPerson,
          neighbour,
          state,
          customerAccount: {
            create: {
              accountNumber: randomNumberAccount(100, 100000),
              credits: 0,
              debits: 0,
              clientIsVip: false,
            },
          },
        },
      });

      reply.send(customer.id);
    } catch (error) {
      console.error(error);
    }
  },

  findUserById: async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { id }: any = request.params;
    const customer = await prisma.customer.findUnique({
      where: { id: parseInt(id) },
      include: {
        transaction: true,
        customerAccount: {
          include: {
            installments: {
              include: {
                consult: { include: { consultDebits: true } },
                admission: true,
              },
            },
            consultsForPet: { include: { consultDebits: true } },
            Admission: {include: {consultDebits: true }}
          },
        },
        pets: {
          include: {
            medicineRecords:{ 
              include: {
                petConsults: {
                  where: {
                    AND: [
                      { totaLDebits: {gte: 1}},
                      {isClosed: true}
                    ]
                  }
                },
                petAdmissions: {
                  where: {
                    AND: [
                      { totaLDebits: {gte: 1}},
                      {isClosed: true}
                    ]
                  }
                }
              }
            }
          }
        }
      },
    });

    
    const consults = customer?.customerAccount?.consultsForPet
     const admissions = customer?.customerAccount?.Admission
     //@ts-ignore
      const installments = customer?.customerAccount?.installments?.concat(consults).concat(admissions).filter((install) => install?.id).map((installment) => {
        const data = {
            id: installment?.id,
            debitName: installment?.debitName,
            totalDebit: installment?.totalDebit,
			      paymentType: installment?.paymentType,
			      paymentDate: installment?.paymentDate?.toLocaleDateString('pt-BR', {day: '2-digit',
          month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'}),
			      installmentAmount: installment?.installmentAmount,
			      amountInstallments: installment?.amountInstallments,
			      customerId: installment?.customerId,
			      boxHistoryId: installment?.boxHistoryId,
			      consultPetId: installment?.consultPetId,
			      admissionsPetId: installment?.admissionsPetId,
            consult: installment?.consult
        }
        return data
      })


      const debits = customer?.pets.flatMap((pet) => {

        //@ts-ignore
        return pet.medicineRecords?.petConsults.concat(pet.medicineRecords.petAdmissions)
  
   
      })

    reply.send({customer, installments, debits});
      } catch (error) {
        console.log(error)
      }
  },

  getInstallmentDetails: async(request: FastifyRequest, reply: FastifyReply) => {
    const { id }: any = request.params;
    
    try {
      const installment = await prisma.installmentsDebts.findUnique({
        where: {id: parseInt(id)},
        include: {
          consult: {
            include: {consultDebits: true}
          }
        }
      })

      if(!installment) {
        const installment =  await prisma.openedConsultsForPet.findFirst({
          where: {
            id: id
          },
          include: {
            consultDebits: true
          }
        })


          if(!installment) {
            const installment =  await prisma.openededAdmissionsForPet.findFirst({
              where: {
                id: id
              },
            include: {
              consultDebits: true
            }})

              if(!installment) {
                reply.status(404)
              }

              reply.send(installment)
          }

          
          

         reply.send(installment)
      }


      reply.send(installment)
    } catch (error) {
        console.log(error)
    }
      
  },


  incrementCustomerCredits: async(request: FastifyRequest, reply: FastifyReply) => {
    try { 
      const incrementCustomerCreditsBody = z.object({
        customerId: z.coerce.number(),
        credits: z.coerce.number()
      })
      
      const {credits, customerId} = incrementCustomerCreditsBody.parse(request.body)

      await prisma.customerAccount.update({
        where: {
          customerId
        },
        data: {
          credits: {increment: credits}
        }
      })

      reply.status(200)
    } catch (error) {
      console.log(error)
    }
  }
};
