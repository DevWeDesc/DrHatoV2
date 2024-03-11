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
exports.admissionsRoutes = void 0;
const admissionsController_1 = require("../controllers/admissionsController");
function admissionsRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/admissions', admissionsController_1.admissionsController.createKennel);
        app.get('/admissions', admissionsController_1.admissionsController.getKennels);
        app.get('/petsadmitted', admissionsController_1.admissionsController.showAdmitedPets);
        app.get('/beds', admissionsController_1.admissionsController.getBeds);
        app.put('/admitpet', admissionsController_1.admissionsController.admitPet);
        app.put('/endadmission', admissionsController_1.admissionsController.finishPetAdmission);
        app.get('/admittedpet', admissionsController_1.admissionsController.getBusyAndAdmittedPets);
        app.post('/admissions/diary/:bedId', admissionsController_1.admissionsController.recordHospDiary);
    });
}
exports.admissionsRoutes = admissionsRoutes;
