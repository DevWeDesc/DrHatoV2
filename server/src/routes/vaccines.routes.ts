import { FastifyInstance } from "fastify";
import { vaccinesController } from "../controllers/vaccinesController";

export async function vaccinesRoutes(app: FastifyInstance) {
  app.post("/vaccines", vaccinesController.createVaccine);
  app.get("/vaccines", vaccinesController.getAllVaccines);

  app.get("/vaccines/:letter/:page", vaccinesController.getVaccinesByLetter)
  app.get("/vaccines/name/:name/:page", vaccinesController.getVaccinesByName)
  app.post(
    "/vaccinepet/:id/:petId/:accId/:queueId",
    vaccinesController.setVaccineInPet
  );
  //   app.delete(
  //     "/vaccinepet/:id/:accId/:examPrice",
  //     vaccinesController.removeVaccine
  //   );
  app.delete(
    "/petvaccine/:id/:accId/:vaccinePrice/:linkedDebitId",
    vaccinesController.removePetVaccine
  );
}
