import { PrismaClient } from "@prisma/client";


export async function deleteOpenedConsultsForPet() {

const prisma = new PrismaClient();
  try {
    await prisma.openedConsultsForPet.deleteMany({});
    console.log('Todos os registros foram deletados com sucesso.');
  } catch (error) {
    console.error('Erro ao deletar registros:', error);
  } finally {
    await prisma.$disconnect();
}
}