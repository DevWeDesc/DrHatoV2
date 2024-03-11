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
exports.instructionsRoutes = void 0;
const instructionsController_1 = require("../controllers/instructionsController");
function instructionsRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/instructions', instructionsController_1.instructionsController.createInstruction);
        app.get('/instructions', instructionsController_1.instructionsController.getInstructions);
        app.get('/instructions/:id', instructionsController_1.instructionsController.getInstructionById);
        app.put('/instructions/:id', instructionsController_1.instructionsController.editInstruction);
        app.delete('/instructions/:id', instructionsController_1.instructionsController.deleteInstruction);
    });
}
exports.instructionsRoutes = instructionsRoutes;
