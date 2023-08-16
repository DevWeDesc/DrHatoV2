import { prisma } from "../interface/PrismaInstance";

export class PetsContract {
    private errors: string[];
    constructor() {
      this.errors = [];
    }
    public async customerAlreadyExists(value: string, message: string) {
     const customerExits = await prisma.customer.findUnique({
        where: { cpf: value },
      })
       if(customerExits) {
        this.errors.push(message)
       } 
    }

    public async verifyIfIsPossibleEndQueue(id: string, message: string) {
      const petExams = await prisma.examsForPet.findMany({
        where: {medicine_id: parseInt(id), doneExame: false}
      })

      if(petExams.length >= 1) {
        this.errors.push(message)
      }

    }


    public showErrors(): string[] {
      return this.errors;
    }
    public hadError() {
      if(this.errors.length >= 1)
      return true
    }

    public clearErrors() {
      this.errors = [];
    }
  }
  
  