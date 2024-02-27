import { FastifyInstance } from "fastify";
import { examsController } from "../controllers/examsController";

export async function examsRoutes(app: FastifyInstance) {
  app.get("/exams/:id", examsController.getById);
  app.post('/exams', examsController.createExam)
  app.delete(
    "/petexam/:id/:accId/:examPrice/:linkedDebitId",
    examsController.removePetExam
  );
  app.get("/exams/old/detail/:examId", examsController.getExamDetailById);
  app.get("/exams/old/all", examsController.getAllExams);
  app.get("/exams/old/:examName", examsController.getByName);
  app.get("/exams/old/letter/:firstLetter", examsController.getByLetter);
  app.post(
    "/exams/old/:examId/:petId/:accId/:queueId",
    examsController.setExamInPet
  );


  app.delete('/exams/:examId', examsController.deleteExam)
}
