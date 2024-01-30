import { FastifyInstance } from "fastify";
import { queueController } from "../controllers/queueController";

export async function queueRoutes(app: FastifyInstance) {
  app.put("/queue/:id", queueController.setPetInQueue);
  app.put(
    "/endqueue/:petId/:queueUUID/:customerId",
    queueController.finishQueueOfPet
  );
  app.get("/queuedebits/:petId/:date", queueController.getQueuePetHistory);
  app.put("/queue/unconclude", queueController.unconcludeQueue);
  app.put(
    "/queue/setClientIsVip/:queueId/:idCustomer/:clientIsVip",
    queueController.updatedClientIsVipInConsultForPet
  );

  app.get("/queue/details/:queueId", queueController.getQueueByID);

  app.patch("/queue/consult/:queueId", queueController.updateQueueDiagnostics);
  app.get(
    "/queue/consult/diagnostic/:queueId",
    queueController.getQueueDiagnostics
  );
}
