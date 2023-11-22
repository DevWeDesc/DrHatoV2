import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../interface/PrismaInstance";
import { SearchSchema } from "../schemas/schemasValidator";
import { searchEngine } from "../engines/searchEngine";
import {  VetsMenuSearch } from "../engines/vets.menu.search";
import { LabsMenuSearch } from "../engines/labs.menu.search";

type LabSearchParams = {
  petName:  string;
  petCode: string;
  solicitedBy: string;
}

export const searchController = {
 getAll: async (request: FastifyRequest<{
    Querystring: { name?: string; cpf?: string; adress?: string };
  }>, reply: FastifyReply) => {
    try {
      const cpf = request.query.cpf;
      const name = request.query.name;
      const adress = request.query.adress;
      
      const result = await prisma.customer.findMany({
        where: {
          OR: [
            { name: { startsWith: name } },
            { adress: { startsWith: adress } },
            { cpf: { startsWith: cpf } }
          ]
        },
        include: {
          pets: {include: {queue: true}},
        },
      });
      
      reply.status(200).send(result);
    } catch (error) {
      reply.status(400).send({ message: error})
      console.log(error)
    }
  },
  vetsBigSearchs: async(request: FastifyRequest,  reply: FastifyReply) => {
      try {
  
        const {initialDate, finalDate, codPet, customerName, petName, isHospitalized, isFinished} = SearchSchema.parse(request.query)
        
        const response = await searchEngine({customerName,petName, codPet, finalDate, initialDate, isFinished,isHospitalized})
     
        if(!response || response == null || response == undefined) {
          reply.status(404)
        } else {
          reply.send(response).status(200)
        }
        
    
    } catch (error) {
      reply.status(400).send({ message: error})
      console.log()
      console.log(error)
    }
  },

  searchVetMenu: async(request: FastifyRequest<{
    Querystring: {petName: string, customerName: string, petCode: string; isAddmited: string
      isFinished: string, finalDate: string, initialDate: string
    },
    Params: { page: string}
  }>,  reply: FastifyReply) => {
    try {

      const {petName, customerName, petCode, isAddmited, isFinished, finalDate,initialDate } = request.query


      const currentPage = Number(request.params.page) || 1;


      const vetsMenuSearch = new VetsMenuSearch();


      vetsMenuSearch.currentPage = currentPage;

     const  {data, totalUsers, totalPages} = await vetsMenuSearch.getParams({petName, customerName, petCode, isAddmited, isFinished, finalDate,initialDate })


      if(isFinished && (initialDate || finalDate)) {
        const {data} = await vetsMenuSearch.getParamsWithDate({petName, customerName, petCode, isAddmited, isFinished, finalDate,initialDate})
        reply.send(data)
      }

      if(isAddmited && (initialDate || finalDate)) {
        const {data} = await vetsMenuSearch.getParamsWithDate({petName, customerName, petCode, isAddmited, isFinished, finalDate,initialDate})
        reply.send(data)
      }


      reply.send({totalUsers, totalPages, currentPage, data})
    } catch (error) {
      console.log(error)
    }
  },

  searchLabMenu: async (request: FastifyRequest<{
    Querystring: LabSearchParams
  }>, reply: FastifyReply) => {

    try {
      const { petCode, petName, solicitedBy } = request.query

        const labSearchMenu = new LabsMenuSearch()


        const {data} = await labSearchMenu.getWithParams({petCode, petName, solicitedBy})

        reply.send({
          data
        })


     } catch (error) {
      console.log(error)

      reply.send({error})
    }
  }


}


