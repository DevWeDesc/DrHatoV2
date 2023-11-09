import { FastifyInstance } from 'fastify'
import { labsController } from '../controllers/labsController'
import multipart from '@fastify/multipart'

export async function labsRoutes(app: FastifyInstance) {
  app.register(multipart, {
    limits: {
        fileSize: 35 * 1024 * 1024,  // 35mb limit
      }
})
  app.get('/labs', labsController.getOpenExamsInLab)
  app.get('/labsearch', labsController.searchExamsBy)
  app.get('/labimg', labsController.searchImgExams)
  app.post('/labreportexam/:examId', labsController.reportAnExam)
  app.patch('/reportexam/:examId', labsController.reportTableExam)
  app.put('/labimport/:examId', labsController.reportWithPdf)
  app.get('/labfile/:examId', labsController.showExamsFiles)
  app.get('/labexam/:examId', labsController.getReportExamById)


  app.get('/lab/onepart/:examId', labsController.getOnePartExamResultById)
}