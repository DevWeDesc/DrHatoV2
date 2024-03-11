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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.labsRoutes = void 0;
const labsController_1 = require("../controllers/labsController");
const multipart_1 = __importDefault(require("@fastify/multipart"));
function labsRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.register(multipart_1.default, {
            limits: {
                fileSize: 35 * 1024 * 1024, // 35mb limit
            }
        });
        app.get('/labs', labsController_1.labsController.getOpenExamsInLab);
        app.get('/labs/end', labsController_1.labsController.getEndExamsInlab);
        app.get('/labexam/:petId', labsController_1.labsController.getPetOpenedExamDetails);
        app.get('/labsearch', labsController_1.labsController.searchExamsBy);
        app.get('/labimg', labsController_1.labsController.searchImgExams);
        app.post('/labreportexam/:examId', labsController_1.labsController.reportAnExam);
        app.patch('/reportexam/:examId', labsController_1.labsController.reportTableExam);
        app.put('/labimport/:examId', labsController_1.labsController.reportWithPdf);
        app.get('/labfile/:examId', labsController_1.labsController.showExamsFiles);
        app.get('/lab/onepart/:examId', labsController_1.labsController.getOnePartExamResultById);
        app.get('/lab/multipart/:examId', labsController_1.labsController.getMultiPartExamResultById);
        app.get('/lab/bytext/:examId', labsController_1.labsController.getTextExamResultById);
    });
}
exports.labsRoutes = labsRoutes;
