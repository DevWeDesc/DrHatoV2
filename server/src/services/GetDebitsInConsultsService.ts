import { OpenedConsultsForPet, PetConsultsDebits } from '@prisma/client'
import { prisma } from '../interface/PrismaInstance'
import { ResourceNotFoundError } from '../errors/ResouceNotFoundError'

interface GetDebitsInConsultsServiceRequest {
  queueId: string
  isAdmission?: boolean
}
interface GetDebitsInConsultsServiceResponse {
  total: number
  debits: (any & {
    consultDebits: PetConsultsDebits[];
})[]
}

export class GetDebitsInConsultsService {
  async execute({ queueId, isAdmission }: GetDebitsInConsultsServiceRequest): Promise<any> {
    let debits;
    if (isAdmission === true) {
       debits = await prisma.openededAdmissionsForPet.findMany({
        where: {
          id: queueId
        },
        include: {
          consultDebits: true
        }
      })


    const total = debits[0]?.consultDebits.reduce(
      (acc, total) => {
        acc.total += Number(total.price)
        return acc
      },
      { total: 0 }
    )

    return {
      total: total?.total,
      debits: debits
    }
    } else {
        debits = await prisma.openedConsultsForPet.findMany({
        where: {
          id: queueId
        },
        include: {
          consultDebits: true
        }
      })

      
    const total = debits[0]?.consultDebits.reduce(
      (acc, total) => {
        acc.total += Number(total.price)
        return acc
      },
      { total: 0 }
    )

    return {
      total: total?.total,
      debits: debits
    }
    }

   


  }
}

