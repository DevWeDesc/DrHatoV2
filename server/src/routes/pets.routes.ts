import { FastifyInstance } from "fastify";
import { petsController } from "../controllers/petsController";

export async function petRoutes(app: FastifyInstance) {
  app.get("/pets", petsController.getAllPets);
  app.get("/pets/:id", petsController.getWithId);
  app.get("/petsall/:petId", petsController.getPetBedHistory);
  app.post("/pets/:id", petsController.createPet);
  app.get("/pets/queue", petsController.petsInQueue);
  app.get("/pets/queuevets", petsController.petsInQueueVet);
  app.get("/pets/queue/preference/:vetName", petsController.petsByVetQueue);
  app.put("/pet/:petId/:weight", petsController.changePetWeight);

  app.post("/pets/especie", petsController.createEspecie);
  app.get("/pets/especie", petsController.getEspecies);
  app.get("/pets/especie/:espId", petsController.getEspeciesById);
  app.post("/pets/races", petsController.createRaces);

  app.get("/pets/history/:petId", petsController.getAllPetHistory);
  app.get(
    "/pet/old/history/consults/:petId",
    petsController.getPetOldHistoryConsults
  );

  app.get("/pet/results/old", petsController.getAllResultsOld);
  app.get("/pet/results/old/:petId", petsController.getResultsOldByPet);
  app.get(
    "/pet/results/old/details/:resultId",
    petsController.getResultOldByExamId
  );
  app.post("/pet/results/old/:examId/:petId", petsController.createResultsOld);
  app.put("/pet/edit/:petId", petsController.changePetAll);
}
