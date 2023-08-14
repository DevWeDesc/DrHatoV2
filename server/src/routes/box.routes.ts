import { FastifyInstance } from 'fastify'

import {  boxController} from '../controllers/boxController';


export async function boxRoutes(app: FastifyInstance){
  app.post("/vetbox", boxController.createVetBox)
  app.get("/vetbox", boxController.showVetBox)
  app.get("/dailybox", boxController.showDailyBox)
  app.post("/openhistbox/:boxId", boxController.openBoxDaily)
  app.put("/closehistbox/:vetBox/:boxId", boxController.closeBoxDaily)
}