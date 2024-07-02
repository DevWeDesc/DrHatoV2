import { FastifyInstance } from "fastify";
import { oldConsultsController } from "../controllers/oldConsultsController";

export async function oldConsultsRoutes(app: FastifyInstance){
  app.get('/consults/historie/old', oldConsultsController.getAllOldConsults)
}
