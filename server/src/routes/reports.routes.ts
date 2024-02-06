import { FastifyInstance } from "fastify";
import { reportsController } from "../controllers/reportsController";

export async function reportsRoutes(app: FastifyInstance) {
  app.post("/reports/sector", reportsController.reportBySector);
}
