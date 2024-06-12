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
        // exams = await prisma.pets.findMany({
        //   where: {
        //     name: { contains: petName },
        //   },
        //   include: {
        //     medicineRecords: { select: { petExams: true } },
        //   },
        // });
        const name = await prisma.examsForPet.findMany({
          include: { medicine: { include: { pet: true } } },
        });

        const filteredExamsForPetName = name.filter(
          (exam) => exam.medicine.pet.name.includes(petName)
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
            requestedFor: { contains: solicitedBy },
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
