import { FastifyInstance } from "fastify";
import { transactionController } from "../controllers/transactionsController";

export async function transactionRoutes(app: FastifyInstance) {
  app.get("/transactions", transactionController.getAllTransactions);
  app.get("/transactions/:id", transactionController.getCustomerTransactions);
  app.post("/transactions", transactionController.createTransaction);
  app.delete("/transactions/:id", transactionController.deleteUser);
}
