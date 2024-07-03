import { FastifyInstance } from "fastify";
import { surgeriesCentralController } from "../controllers/surgeriesCentralController";


export async function surgeriesCentralRoutes(app: FastifyInstance) {
  app.post("/surgeries/central", surgeriesCentralController.createCentralSurgerie);
  app.put("/surgeries/central/edit", surgeriesCentralController.editCentralSurgerie);
  app.put("/surgeries/central/reserve", surgeriesCentralController.reserveSlot);
  app.delete("/surgeries/central/:centralId", surgeriesCentralController.excludeCentralSurgerie)
  app.get("/surgeries/central", surgeriesCentralController.findAllCentralSurgeries)
  app.get("/surgeries/central/:centralId", surgeriesCentralController.findCentralSurgerieById)
}
