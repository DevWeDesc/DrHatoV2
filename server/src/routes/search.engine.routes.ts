//veterinaryMenuSearch

import { FastifyInstance } from "fastify";

import { searchEngineController } from "../controllers/searchEngineController";

export async function searchEngineMenu(app: FastifyInstance) {
  app.post("/engine/veterinary", searchEngineController.veterinaryMenuSearch);

}
