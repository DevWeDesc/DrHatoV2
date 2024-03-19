import { FastifyInstance } from "fastify";

import { healthInsuranceController } from "../controllers/healthInsuranceController";

export async function healthInsuranceRoutes(app: FastifyInstance) {
  app.get("/health/insurance/:planId", healthInsuranceController.getHealthInsuranceById);
  app.get("/health/insurance", healthInsuranceController.getAllHealthInsurance);
  app.post("/health/insurance",healthInsuranceController.createHealthInsurance);
  app.put("/edit/health/insurance",healthInsuranceController.editHealthInsurance);
  app.delete("/delete/health/insurance/:planId", healthInsuranceController.removeHealthInsurance);
}
