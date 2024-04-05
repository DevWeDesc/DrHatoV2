import { FastifyInstance } from 'fastify'
import { oldSystemHistorieController } from '../controllers/oldSystemHistorieController';


export async function oldSystemHistorieRoutes(app: FastifyInstance){
app.get('/exams/historie/old/:petId', oldSystemHistorieController.getPetOldExams)
app.get('/admission/historie/old/all', oldSystemHistorieController.getPetOldAdmissions)
}