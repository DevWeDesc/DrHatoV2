import prisma from "../../client";

export interface VetsMenuProps {
    customerName: string | undefined;
    petName: string | undefined;
    petCode: string | undefined; 
    isFinished: string;
    isAddmited: string;
    initialDate: Date | string;
    finalDate: Date | string;
}
export class VetsMenuSearch {
    async getParams({customerName, petName, petCode, initialDate, finalDate, isAddmited, isFinished}: VetsMenuProps) {
        let data;


        if(customerName || petName || petCode) {
             data = await prisma.pets.findMany({
                where: {
                    OR: [
                        {customer: {name: {contains: customerName}}},
                        {name: {contains: petName}},
                        {codPet: {contains: petCode}}
                        ]},
                include: {customer: true}
             })
        }

        if(isFinished) {
            data = await prisma.queuesForPet.findMany({
                where: {queueIsDone: true, medicine
                :{ pet: {OR:
                    [
                        {name: {contains: petName}},
                        {customer: {name: {contains: customerName}}},
                        {codPet: {contains: petCode}}
                    ]
                }}}, include:{medicine: {include: {pet: {select: {name: true, id: true, customer: {select: {name: true, cpf: true}}}}}}}
            })     
        }


        if(isAddmited) {
            data = await prisma.bed.findMany({
                where: {isBusy: true, pet: {OR: [
                    {name: {contains: petName}},
                    {customer: {name: {contains: customerName}}},
                    {codPet: {contains: petCode}}
                ]}}
            })
        }

        return {
            data
        }
    }

    async getParamsWithDate({ customerName, petName, petCode, initialDate, finalDate, isAddmited, isFinished}: VetsMenuProps) {

        const today = new Date(initialDate ? initialDate : new Date());
        today.setHours(0, 0, 0, 0); 


        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const endDay = new Date(finalDate ? finalDate : tomorrow)
        endDay.setHours(0, 0, 0, 0); 

        let data;


        if(isFinished && (initialDate || finalDate)) {
            data = await prisma.queuesForPet.findMany({
                where: {queueIsDone: true, medicine
                :{ pet: {OR:
                    [
                        {name: {contains: petName ?? ""}},
                        {customer: {name: {contains: customerName?? ""}}},
                        {codPet: {contains: petCode ?? ""}}
                    ]
                }},  queueEntry: {gte: today, lte: endDay}}, include:{medicine: {include: {pet: {select: {name: true, id: true, customer: {select: {name: true, cpf: true}}}}}}}
            })     
        }


        return {
         data

        }
    }
}