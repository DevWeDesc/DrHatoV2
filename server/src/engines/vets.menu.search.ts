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
    async getParams({customerName, petName, petCode, isAddmited, isFinished}: VetsMenuProps) {
        let data;
        switch(true) {
            case !!customerName:
                data = await prisma.pets.findMany({
                    where: {
                        customer: {name: {contains: customerName}}},
                    include: {customer: true}
                 })
                break;
            case !!petName: 
              data = await prisma.pets.findMany({
                where: {
                    name: {contains: petName}    
                },
                include: {customer: true}
             })
            break;
            case !!petCode: 
              data = await prisma.pets.findMany({
                where: {
                    codPet: {startsWith: petCode}    
                },
                include: {customer: true}
             })
            break;
            case !!isFinished:
            const res = await prisma.queuesForPet.findMany({
                where: {queueIsDone: true, medicine
                :{ pet: {OR:
                    [
                        {name: {contains: petName}},
                        {customer: {name: {contains: customerName}}},
                        {codPet: {contains: petCode}}
                    ]
                }}}, include:{medicine: {include: {pet: {select: {name: true, id: true, weigth: true ,codPet: true ,customer: {select: {name: true, cpf: true}}}}}}}
            }) 
            
            data = res.map((res) => {
                let data = {
                    id: res.medicine.pet.id,
                    name: res.petName,
                    codPet: res.medicine.pet.codPet,
                    finished: res.queueExit,
                    customer: {
                        name: res.medicine.pet.customer.name,
                        cpf:res.medicine.pet.customer.cpf
                    },
                    responsible: res.responsibleVeterinarian
                }
                return data
            })

            break;
            case !!isAddmited: 
            const beds = await prisma.bed.findMany({
                where: {isBusy: true, pet: {OR: [
                    {name: {contains: petName}},
                    {customer: {name: {contains: customerName}}},
                    {codPet: {contains: petCode}}
                ]}},include: { pet: {include: {customer: true, }}}
            })

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
                        vetPreference: data.pet?.customer.vetPreference
                    }
                }
                return res
            })
            break;
            default: 
            data = await prisma.pets.findMany({
                where: {
                    OR: [
                        {name: {contains: petName}},
                        {customer: {name: {contains: customerName}}},
                        {codPet: {contains: petCode}}
                    ]
                }
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
                const res = await prisma.queuesForPet.findMany({
                    where: {
                        queueIsDone: true,
                        queueEntry: {gte: today},
                        queueExit: {lte: endDay}
    
                    }, include: { medicine: {include: {pet: {select: 
                        {name: true, id: true,  codPet: true,customer: {select: {name: true, cpf: true}}}}}}}
                })     
    
                data = res.map((res) => {
                    let data = {
                        id: res.medicine.pet.id,
                        name: res.petName,
                        codPet: res.medicine.pet.codPet,
                        finished: res.queueExit,
                        customer: {
                            name: res.medicine.pet.customer.name,
                            cpf:res.medicine.pet.customer.cpf
                        },
                        responsible: res.responsibleVeterinarian
                    }
                    return data
                })
              }


            if(isAddmited && (initialDate || finalDate)) {
                const beds = await prisma.bed.findMany({
                    where: {isBusy: true,
                    entryOur: {gte: today},
                    
                    },include: { pet: {include: {customer: true, }}}
                })

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
                            vetPreference: data.pet?.customer.vetPreference
                        }
                    }
                    return res
                })
        
            }

        return {
         data

        }
    }
}