import { FastifyInstance } from "fastify";
import { surgeriesController } from "../controllers/surgeriesController";

export async function surgeriesRoutes(app: FastifyInstance) {
  app.post("/surgeries", surgeriesController.createSurgerie);
  app.get("/surgeries", surgeriesController.getSurgeries);
  app.put("/surgeries/:id", surgeriesController.editSurgery);
  app.post(
    "/surgeries/:id/:petId/:accId/:queueId",
    surgeriesController.setSurgerieInPet
  );
  app.delete(
    "/petsurgery/:id/:accId/:sugPrice/:linkedDebitId",
    surgeriesController.excludePetSugerie
  );

  app.patch(
    "/surgeries/reports/:surgerieId",
    surgeriesController.reportPetSurgerie
  );
  app.get(
    "/surgeries/reports/:petId",
    surgeriesController.getPetSurgeriesHistory
  );
  app.get(
    "/surgeries/reports/started",
    surgeriesController.getPetSurgeriesOpened
  );
  app.get(
    "/surgeries/reports/started/:petId",
    surgeriesController.getPetOpenedSugerie
  );

  app.get(
    "/surgerie/details/:surgerieId",
    surgeriesController.getSurgeriePetDetails
  );

  app.get(
    "/surgerie/letter/:letter/:page",
    surgeriesController.getSurgeriesByLetters
  );
  app.get("/surgerie/name/:name/:page", surgeriesController.getSurgeriesByName);
}
