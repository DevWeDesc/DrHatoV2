"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.examsRoutes = void 0;
const examsController_1 = require("../controllers/examsController");
function examsRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get("/exams/:id", examsController_1.examsController.getById);
        app.post('/exams', examsController_1.examsController.createExam);
        app.delete("/petexam/:id/:accId/:examPrice/:linkedDebitId", examsController_1.examsController.removePetExam);
        app.get("/exams/old/detail/:examId", examsController_1.examsController.getExamDetailById);
        app.get("/exams/old/all", examsController_1.examsController.getAllExams);
        app.get("/exams/old/:examName", examsController_1.examsController.getByName);
        app.get("/exams/old/letter/:firstLetter", examsController_1.examsController.getByLetter);
        app.post("/exams/old/:examId/:petId/:accId/:queueId", examsController_1.examsController.setExamInPet);
        app.delete('/exams/:examId', examsController_1.examsController.deleteExam);
        app.patch('/exams/especies/:examId/:especieId', examsController_1.examsController.setEspecieInExam);
        app.patch('/exams/especies/remove/:examId/:especieId', examsController_1.examsController.removeEspecieInExam);
    });
}
exports.examsRoutes = examsRoutes;
