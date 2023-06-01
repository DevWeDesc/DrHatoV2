import { PrismaClient } from "@prisma/client";
import { ExamsType } from "../schemas/schemasValidator";
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


    public async procedureAlreadyExist(value: string, message: string) {
      const procedureExist = await prisma.procedures.findUnique({
         where: {name: value}
      })

      if(procedureExist) {
          this.errors.push(message)
      }
    }


    public async examAlreadyExist(value: string, message: string) {
      const examExist = await prisma.exams.findFirst({
        where: {name: value}
      })

      if(examExist) {
        this.errors.push(message)
      }
    }
 
    public async validateExamsType(value: string[], message: string){
      ExamsType.some( e => value.includes(e)) ? true : this.errors.push(message)
    }


    public async validateBedIsBusy(value: number, message: string){
      const bedIsBusy = await prisma.bed.findUnique({where: {id: value}, select: {isBusy:true}})


      if(bedIsBusy?.isBusy === true){
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
  
  