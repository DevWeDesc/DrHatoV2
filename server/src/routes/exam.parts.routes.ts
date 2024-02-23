import { FastifyInstance } from 'fastify'
import { examsPartsController } from '../controllers/examsPartsController'

export async function examPartRoutes(app: FastifyInstance)
{

  app.post("/parts/exams/:codexam", examsPartsController.createExamPartSession)

}