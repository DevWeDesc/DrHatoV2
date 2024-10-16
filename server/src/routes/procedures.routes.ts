import { FastifyInstance } from "fastify";
import { proceduresController } from "../controllers/proceduresController";

export async function proceduresRoutes(app: FastifyInstance) {
  app.post("/procedures", proceduresController.createProcedure);
  app.post(
    "/procedures/:procedureId/:petId/:accId/:queueId",
    proceduresController.setProcedureInPet
  );
  app.get("/procedures", proceduresController.getProcedures);
  app.get("/procedures/:id", proceduresController.getWithId);
  app.put("/procedures/edit", proceduresController.editProcedure);
  app.delete("/procedures/:id", proceduresController.deleteProcedure);
  //   app.delete(
  //     "/proceduresfp/:id/:accId/:procedPrice",
  //     proceduresController.deleteProcedureOfPet
  //   );
  app.delete(
    "/petprocedure/:id/:accId/:procedurePrice/:linkedDebitId",
    proceduresController.removePetProcedure
  );

  app.get("/procedures/query", proceduresController.queryProcedureByName);
  app.put(
    "/procedures/especies/:procedureId/:especieId",
    proceduresController.setEspecieInProcedure
  );
  app.put(
    "/procedures/especies/all/:procedureId",
    proceduresController.setAllEspeciesInProcedure
  );
  app.put(
    "/procedures/especies/all/remove/:procedureId",
    proceduresController.removeAllEspeciesInProcedure
  );

  app.get(
    "/procedures/health/:planName/:page",
    proceduresController.getProcedureByHealthInsurance
  );

  app.get(
    "/procedures/letters/:letter/:page",
    proceduresController.getProceduresByLetters
  );
}
