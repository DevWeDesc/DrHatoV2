import { prisma } from "../interface/PrismaInstance";

type LabParamsProps = {
    petName: string;
    solicitedBy: string;
    petCode: string;
}
export class LabsMenuSearch {

    async getWithParams({petName, petCode, solicitedBy}: LabParamsProps) {
        let data;
        
        switch(true) {
            case !!petName: 

            data = await prisma.pets.findMany({
                where: {
                    name: {contains: petName},
                }, include: {
                    medicineRecords: {select: {petExams: true}}
                }
            })

            break;

            case !!petCode:
            data =  []
           const pet =  await prisma.pets.findFirst({
                where: {
                    CodAnimal: Number(petCode),
                },include: {
                    medicineRecords: {select: {petExams: true}}
                }
            })

            data.push(pet)
            break;
            
            case !!solicitedBy: 

            data = await prisma.examsForPet.findMany({
                where: {
                    requestedFor: {contains: solicitedBy}
                }, include: {medicine: {include: {pet: true}}}
            })

            break;
            
        }


        return {
            data
        }
    }

    
}