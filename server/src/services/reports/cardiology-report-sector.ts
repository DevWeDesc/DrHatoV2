import { prisma } from "../../interface/PrismaInstance";


export async function CardiologyAdmissionsAndConsultsReportSector (initialDate: number, finalDate: number) {

  const consult = await prisma.openedConsultsForPet.findMany({
    where: {
      AND: [
        { openedDate: { gte: new Date(initialDate) } },
        { closedDate: { lt: new Date(finalDate) } },
      ],
    },
    include: {
      consultDebits: true,
    },
  });

  const admission = await prisma.openededAdmissionsForPet.findMany({
    where: {
      AND: [
        { openedDate: { gte: new Date(initialDate) } },
        { closedDate: { lt: new Date(finalDate) } },
      ],
    },
    include: {
      consultDebits: true,
    },
  });


  const proceduresByConsults = consult.flatMap((consults) => {
    return consults.consultDebits.filter((c) => c.sectorId === 16);
  });

  const proceduresByAdmissions = admission.flatMap((admission) => {
    return admission.consultDebits.filter((a) => a.sectorId === 16);
  });


  const proceduresCount = proceduresByConsults.reduce((acc: any, curr: any) => {
    if (acc[curr.name]) {
      acc[curr.name]++;
    } else {
      acc[curr.name] = 1;
    }
    return acc;
  }, {});

  const proceduresAdmissionCount = proceduresByAdmissions.reduce((acc: any, curr: any) => {
    if (acc[curr.name]) {
      acc[curr.name]++;
    } else {
      acc[curr.name] = 1;
    }
    return acc;
  }, {});



  const data = {
    consults: {
      procedures: Object.entries(proceduresCount).map(([name, quantity]) => ({
        name,
            //@ts-ignore
        value: proceduresByConsults.find(procedure => procedure.name === name).price,
        quantity
      })),
      consultsQuantity: proceduresByConsults.length,
      consultsInvoicing: proceduresByConsults.reduce(
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.price),
        0
      ),
    },
    admissions: {
      procedures: Object.entries(proceduresAdmissionCount).map(([name, quantity]) => ({
        name,
        //@ts-ignore
        value: proceduresByAdmissions.find(procedure => procedure.name === name).price,
        quantity
      })),
      consultsQuantity: proceduresByAdmissions.length,
      consultsInvoicing: proceduresByAdmissions.reduce(
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.price),
        0
      ),
    }
  };



  return data


}