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
exports.examPartRoutes = void 0;
const examsPartsController_1 = require("../controllers/examsPartsController");
function examPartRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post("/parts/exams/:codexam", examsPartsController_1.examsPartsController.createExamPartSession);
        app.post("/part/exams/characs/:sessionId", examsPartsController_1.examsPartsController.createExamPartCharacteristics);
    });
}
exports.examPartRoutes = examPartRoutes;
