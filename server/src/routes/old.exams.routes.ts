import { FastifyInstance } from 'fastify'
import { oldExamsController } from '../controllers/examsOldController'

export async function oldExamsRoutes(app: FastifyInstance) {
    app.get('/exams/old/detail/:examId', oldExamsController.getExamDetailById)
    app.get('/exams/old/all', oldExamsController.getAllExams)

}

