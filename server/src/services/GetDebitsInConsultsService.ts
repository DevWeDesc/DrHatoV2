import { OpenedConsultsForPet, PetConsultsDebits } from '@prisma/client'
import { prisma } from '../interface/PrismaInstance'
import { ResourceNotFoundError } from '../errors/ResouceNotFoundError'

interface GetDebitsInConsultsServiceRequest {
  queueId: string
}
interface GetDebitsInConsultsServiceResponse {
  total: number
  debits: (OpenedConsultsForPet & {
    consultDebits: PetConsultsDebits[];
})[]
}

export class GetDebitsInConsultsService {
  async execute({ queueId }: GetDebitsInConsultsServiceRequest): Promise<GetDebitsInConsultsServiceResponse> {
    const debits = await prisma.openedConsultsForPet.findMany({
      where: {
        id: queueId
      },
      include: {
        consultDebits: true
      }
    })

    if(!debits) {
      throw new ResourceNotFoundError()
    }

    const total = debits[0].consultDebits.reduce(
      (acc, total) => {
        acc.total += Number(total.price)
        return acc
      },
      { total: 0 }
    )

    return {
      total: total.total,
      debits: debits
    }
  }
}

