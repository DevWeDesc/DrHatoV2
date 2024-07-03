import { FastifyInstance } from "fastify";
import { labsController } from "../controllers/labsController";
import multipart from "@fastify/multipart";

export async function labsRoutes(app: FastifyInstance) {
  app.register(multipart, {
    limits: {
      fileSize: 35 * 1024 * 1024, // 35mb limit
    },
  });
  app.get("/labs", labsController.getOpenExamsInLab);
  app.get("/labs/end", labsController.getEndExamsInlab);
  app.get("/labexam/:petId", labsController.getPetOpenedExamDetails);
  app.get("/labsearch", labsController.searchExamsBy);
  app.get("/labimg", labsController.searchImgExams);
  app.post("/labreportexam/:examId", labsController.reportAnExam);
  app.patch("/reportexam/:examId", labsController.reportTableExam);
  app.put("/labimport/:examId", labsController.reportWithPdf);
  app.get("/labfile/:examId", labsController.showExamsFiles);

  app.get("/lab/onepart/:examId", labsController.getOnePartExamResultById);
  app.get("/lab/multipart/:examId", labsController.getMultiPartExamResultById);
  app.get("/lab/bytext/:examId", labsController.getTextExamResultById);

  app.post("/sendemail/report/multipart/:examId", labsController.sendMultiPartExamResultById);
  app.post("/sendemail/report/text/:examId", labsController.sendByTextExamResultPdf);
  app.post("/sendemail/report/onepart/:examId", labsController.sendOnePartExamResultPdf);


  app.get("/lab/reportInserted/:pdfId", labsController.getInsertedExam);
}
