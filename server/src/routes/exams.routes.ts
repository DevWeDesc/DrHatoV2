import { FastifyInstance } from 'fastify'
import { examsController } from '../controllers/examsController'

export async function examsRoutes(app: FastifyInstance) {
    app.post('/exams', examsController.createExam)
    app.get('/exams', examsController.getExams)
}