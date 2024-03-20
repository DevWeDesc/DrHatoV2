import { FastifyInstance } from "fastify";
import { groupsController } from "../controllers/groupsController";
import { app } from "../app";

export async function groupsRoutes(app: FastifyInstance) {
  app.post("/groups", groupsController.createGroup);
  app.get("/groups", groupsController.getGroups);
  app.put("/groups/:id", groupsController.editGroup);
  app.delete("/groups/:id", groupsController.removeGroup);
}
