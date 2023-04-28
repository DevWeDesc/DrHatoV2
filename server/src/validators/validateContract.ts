import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export class ValidationContract {
    private errors: string[];
    constructor() {
      this.errors = [];
    }
    public async userAlreadyExists(value: string, message: string) {
     const userExits = await prisma.customer.findUnique({
        where: { cpf: value },
      })
       if(userExits) {
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
  
  