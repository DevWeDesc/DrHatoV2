import { FastifyInstance } from "fastify";

import { searchController } from "../controllers/searchController";

export async function searchsRoutes(app: FastifyInstance) {
  app.get("/filtredquery", searchController.vetsBigSearchs);
  app.get("/queryall", searchController.getAll);
  app.get("/vetmenusearch/:page", searchController.searchVetMenu)
}
