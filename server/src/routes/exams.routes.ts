import { FastifyInstance } from 'fastify'
import { examsController } from '../controllers/examsController'

export async function examsRoutes(app: FastifyInstance) {
    app.post('/exams', examsController.createExam)
    app.get('/exams', examsController.getExams)
    app.get('/exams/:id', examsController.getById)
    app.put('/exams/:id', examsController.editExams)
    app.delete('/exams/:id', examsController.deleteExam)
}