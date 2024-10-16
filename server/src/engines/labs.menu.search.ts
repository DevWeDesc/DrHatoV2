import { prisma } from "../interface/PrismaInstance";

type LabParamsProps = {
  petName: string;
  solicitedBy: string;
  petCode: string;
  initialDate: string;
  finalDate: string;
  codeExam: number;
};
export class LabsMenuSearch {
  async getWithParams({
    petName,
    petCode,
    solicitedBy,
    initialDate,
    finalDate,
    codeExam,
  }: LabParamsProps) {
    const filter: { requesteData?: { gte: Date; lte: Date } } = {};

    if (initialDate && finalDate) {
      filter.requesteData = {
        gte: new Date(initialDate),
        lte: new Date(finalDate),
      };
    }

    return await prisma.examsForPet.findMany({
      where: {
        medicine: {
          pet: {
            name: { contains: petName, mode: "insensitive" },
            id: petCode ? Number(petCode) : undefined,
          },
        },
        codeExam: { equals: codeExam ? Number(codeExam) : undefined },
        requestedFor: { contains: solicitedBy, mode: "insensitive" },
        requesteData: filter.requesteData,
      },
      include: {
        medicine: {
          include: {
            pet: true,
          },
        },
      },
    });
  }
}
