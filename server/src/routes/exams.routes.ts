import { FastifyInstance } from 'fastify'
import { examsController } from '../controllers/examsController'

export async function examsRoutes(app: FastifyInstance) {
    app.post('/exams', examsController.createExam)
    app.post('/setexam/:id/:recordId/:accId', examsController.setExamInPet)
    app.post('/examcharac', examsController.createExamCharacteristics)
    app.post('/mergedexams', examsController.createMergedExams)
    app.get('/mergedexams', examsController.getMergedExams)
    app.get('/mergedexams/:id', examsController.getMergedExamsById)
    app.get('/examcharac', examsController.getExamsCharacteristics)
    app.get('/exams', examsController.getExams)
    app.get('/exams/:id', examsController.getById)
    app.put('/exams/:id', examsController.editExams)
    app.delete('/exams/:id', examsController.deleteExam)
    app.delete('/petexam/:id/:accId/:examPrice', examsController.removePetExam)
}

