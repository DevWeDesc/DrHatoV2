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
exports.sectorsRoutes = void 0;
const sectorsController_1 = require("../controllers/sectorsController");
function sectorsRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/sectors', sectorsController_1.sectorsController.createSector);
        app.get('/sectors', sectorsController_1.sectorsController.getSectors);
        app.put('/sectors/:id', sectorsController_1.sectorsController.editSector);
        app.delete('/sectors/:id', sectorsController_1.sectorsController.deleteSector);
    });
}
exports.sectorsRoutes = sectorsRoutes;
