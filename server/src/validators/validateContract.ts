import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export class ValidationContract {
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

    public async userAlreadyExists(value: string, message: string) {
        const userExist = await prisma.user.findFirst({
          where:{name: value}
        })

        if(userExist) {
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
  
  