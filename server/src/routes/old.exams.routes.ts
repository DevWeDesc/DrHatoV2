import { FastifyInstance } from 'fastify'
import { oldExamsController } from '../controllers/examsOldController'

export async function oldExamsRoutes(app: FastifyInstance) {
    app.get('/exams/old/detail/:examId', oldExamsController.getExamDetailById)
    app.get('/exams/old/all', oldExamsController.getAllExams)
    app.get('/exams/old/:examName', oldExamsController.getByName)
    app.get('/exams/old/letter/:firstLetter', oldExamsController.getByLetter)


    app.post('/exams/old/:examId/:petId/:accId/:queueId', oldExamsController.setExamInPet)

}

