import { prisma } from "../interface/PrismaInstance";

type LabParamsProps = {
  petName: string;
  solicitedBy: string;
  petCode: string;
};
export class LabsMenuSearch {
  async getWithParams({ petName, petCode, solicitedBy }: LabParamsProps) {
    let exams;

    switch (true) {
      case !!petName:
        const name = await prisma.examsForPet.findMany({
          include: { medicine: { include: { pet: true } } },
        });

        const filteredExamsForPetName = name.filter(
          (exam) => exam.medicine.pet.name.toLocaleLowerCase().includes(petName.toLocaleLowerCase())
        );
        exams = filteredExamsForPetName;

        break;

      case !!petCode:
        const pet = await prisma.examsForPet.findMany({
          include: { medicine: { include: { pet: true } } },
        });

        const filteredExamsForPet = pet.filter(
          (exam) => exam.medicine.petId === Number(petCode)
        );
        exams = filteredExamsForPet;
        
        break;

      case !!solicitedBy:
        exams = await prisma.examsForPet.findMany({
          where: {
            requestedFor: { contains: solicitedBy, mode: "insensitive"},
          },
          include: { medicine: { include: { pet: true } } },
        });

        break;
    }

    return {
      data: exams,
    };
  }
}
