import { FastifyInstance } from "fastify";

import { boxController } from "../controllers/boxController";

export async function boxRoutes(app: FastifyInstance) {
  app.post("/vetbox", boxController.createVetBox);
  app.get("/vetbox", boxController.showVetBox);
  app.get("/dailybox", boxController.showDailyBox);
  app.get("/lastbox", boxController.showlastBoxClosed);
  app.get("/debitaccounts", boxController.showCustomerDebitsOpen);
  app.post("/openhistbox/:boxId", boxController.openBoxDaily);
  app.patch("/closehistbox/:vetBox/:boxId", boxController.closeBoxDaily);
  app.get("/account/debitsAll", boxController.getAllDebits);
  app.get("/account/debitByBox/:boxId", boxController.getDebitsByBox);
  app.post(
    "/account/returns/:boxId/:customerId/:installmentId",
    boxController.createReturnsBoxByUser
  );
  app.get("/returnsAll", boxController.getAllReturns);
}
