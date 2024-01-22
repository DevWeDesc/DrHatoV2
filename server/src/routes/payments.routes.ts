import { FastifyInstance } from "fastify";
import { paymentsTypeController } from "../controllers/paymentsTypeController";

export async function paymentsRoutes(app: FastifyInstance) {
  app.get("/payments", paymentsTypeController.getAllPaymentsType);
  app.get("/payments/:id", paymentsTypeController.getPaymentTypeById);
  app.post("/payments", paymentsTypeController.createPaymentType);
  app.put("/payments/:id", paymentsTypeController.editPaymentType);
  app.delete("/payments/:id", paymentsTypeController.deletePaymentType);
}
