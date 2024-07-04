import { ExamsType } from "../schemas/schemasValidator";
import bcrypt from "bcrypt";
import { prisma } from "../interface/PrismaInstance";
import { ResourceNotFoundError } from "../errors/ResouceNotFoundError";
import { InvalidPasswordError } from "../errors/InvalidPasswordError";

export class ValidationContract {
  private errors: string[];
  constructor() {
    this.errors = [];
  }
  public async customerAlreadyExists(value: string, message: string) {
    const customerExits = await prisma.customer.findUnique({
      where: { cpf: value },
    });
    if (customerExits) {
      throw new Error("CPF já cadastrado no sistema!");
    }
  }

  public async checkPassword(
    value: { username: string; password: string },
    message: string
  ) {
    const user = await prisma.user.findUnique({
      where: { username: value.username },
    });

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const correctPassword = await bcrypt.compare(value.password, user.password);

    if (!correctPassword) {
      throw new InvalidPasswordError();
    }

    if (correctPassword) {
      return true;
    }
  }

  public async userAlreadyExists(value: string, message: string) {
    const userExist = await prisma.user.findUnique({
      where: { email: value },
    });

    if (!userExist) {
      this.errors.push(message);
    }
  }

  public async userHasAllToBeCreated(
    value: {
      email: string;
      username: string;
      password: string;
      userType?: string;
      userIsVet?: boolean;
      crmv?: number;
    },
    message: string
  ) {
    if (value.email == "" || value.username == "" || value.password == "") {
      this.errors.push(message);
    }
  }

  public async examAlreadyExist(value: string, message: string) {
    const examExist = await prisma.oldExams.findFirst({
      where: { name: value },
    });

    if (examExist) {
      this.errors.push(message);
    }
  }

  public async validateExamsType(value: string[], message: string) {
    ExamsType.some((e) => value.includes(e)) ? true : this.errors.push(message);
  }

  public async validateBedIsBusy(value: number, message: string) {
    const bedIsBusy = await prisma.bed.findUnique({
      where: { id: value },
      select: { isBusy: true },
    });

    if (bedIsBusy?.isBusy === true) {
      this.errors.push(message);
    }
  }

  public showErrors(): string[] {
    return this.errors;
  }
  public hadError() {
    if (this.errors.length >= 1) return true;
  }

  public clearErrors() {
    this.errors = [];
  }
}
