import { FastifyInstance } from "fastify";
import { paymentsTypeController } from "../controllers/paymentsTypeController";

export async function paymentsTypeRoutes(app: FastifyInstance) {
  app.get("/paymentsType", paymentsTypeController.getAllPaymentsType);
  app.get("/paymentsType/:id", paymentsTypeController.getPaymentTypeById);
  app.post("/paymentsType", paymentsTypeController.createPaymentType);
  app.put("/paymentsType/:id", paymentsTypeController.editPaymentType);
  app.delete("/paymentsType/:id", paymentsTypeController.deletePaymentType);
}
