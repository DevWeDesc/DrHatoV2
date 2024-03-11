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
exports.autorizationRoutes = void 0;
const autorizationsController_1 = require("../controllers/autorizationsController");
function autorizationRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/autorizations', autorizationsController_1.autorizationsController.createAutorization);
        app.get('/autorizations', autorizationsController_1.autorizationsController.showAutorization);
        app.get('/autorizations/:id', autorizationsController_1.autorizationsController.searchAutorizaton);
        app.put('/autorizations/:id', autorizationsController_1.autorizationsController.editAutorizaton);
    });
}
exports.autorizationRoutes = autorizationRoutes;
