import { FastifyInstance } from "fastify";

import { accountController } from "../controllers/accountController";

export async function accountsRoutes(app: FastifyInstance) {
  app.put("/account/credit/:customerId", accountController.creditAccount);
  app.put("/account/debit/:customerId", accountController.debitAccount);
  app.post(
    "/account/installments/:customerId/:histBoxId",
    accountController.payInInstallments
  );
  app.get("/account/debitsAll", accountController.getAllDebits);
  app.get("/account/debitByBox/:boxId", accountController.getDebitsByBox);
}
