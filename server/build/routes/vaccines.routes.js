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
exports.vaccinesRoutes = void 0;
const vaccinesController_1 = require("../controllers/vaccinesController");
function vaccinesRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post("/vaccines", vaccinesController_1.vaccinesController.createVaccine);
        app.get("/vaccines", vaccinesController_1.vaccinesController.getAllVaccines);
        app.post("/vaccinepet/:id/:petId/:accId/:queueId", vaccinesController_1.vaccinesController.setVaccineInPet);
        //   app.delete(
        //     "/vaccinepet/:id/:accId/:examPrice",
        //     vaccinesController.removeVaccine
        //   );
        app.delete("/petvaccine/:id/:accId/:vaccinePrice/:linkedDebitId", vaccinesController_1.vaccinesController.removePetVaccine);
    });
}
exports.vaccinesRoutes = vaccinesRoutes;
