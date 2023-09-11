import { prisma } from "../interface/PrismaInstance";
interface SearchEngineProps {
        customerName?: string;
         initialDate?: Date; 
           finalDate?: Date; 
              codPet?: string; 
             petName?: string; 
      isHospitalized?: boolean | string; 
          isFinished?: boolean | string;
}
export async function searchEngine({customerName,petName,codPet,finalDate,initialDate,isFinished,isHospitalized} : SearchEngineProps) {
    let responseArray: any = [];
    switch(true) {                                               
        case !!customerName && !!petName: 
        const customerAndPetsResults = await prisma.customer.findMany(
            {where: {AND: [
            {name: {startsWith: customerName}},
            {pets: {some: {name: {startsWith: petName}}}}
        ]}, include: {pets: true}})
        responseArray = responseArray.concat(customerAndPetsResults)
        break;

        case !!customerName: 
        const customerResults =  await prisma.pets.findMany({where: {customer :{name :{startsWith: customerName}}}, include: {customer: true}})
        responseArray = responseArray.concat(customerResults)
        break;

        case !!petName:
        const petResults = await prisma.pets.findMany({where: {name: {startsWith: petName}}, include:{ customer: true}})
        responseArray = responseArray.concat(petResults)
        break; 

        case !!codPet: 
        const codPetResulst = await prisma.pets.findFirst({where: {codPet: {startsWith: codPet}},include:{ customer: true}})
        responseArray = responseArray.concat(codPetResulst)
        break;

        case !!isFinished:
        const isFinishedResults = await prisma.queuesForPet.findMany({
            where: {queueIsDone: true}, include:{medicine: {include: {pet: {select: {name: true, id: true, customer: {select: {name: true, cpf: true}}}}}}}
        })    
        responseArray = responseArray.concat(isFinishedResults)
        break;
    }
    
    if(responseArray.length <= 0) return null;

    return responseArray
}