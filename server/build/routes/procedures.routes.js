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
exports.proceduresRoutes = void 0;
const proceduresController_1 = require("../controllers/proceduresController");
function proceduresRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post("/procedures", proceduresController_1.proceduresController.createProcedure);
        app.post("/procedures/:procedureId/:petId/:accId/:queueId", proceduresController_1.proceduresController.setProcedureInPet);
        app.get("/procedures", proceduresController_1.proceduresController.getProcedures);
        app.get("/procedures/:id", proceduresController_1.proceduresController.getWithId);
        app.put("/procedures/:id", proceduresController_1.proceduresController.editProcedure);
        app.delete("/procedures/:id", proceduresController_1.proceduresController.deleteProcedure);
        //   app.delete(
        //     "/proceduresfp/:id/:accId/:procedPrice",
        //     proceduresController.deleteProcedureOfPet
        //   );
        app.delete("/petprocedure/:id/:accId/:procedurePrice/:linkedDebitId", proceduresController_1.proceduresController.removePetProcedure);
        app.get("/procedures/query", proceduresController_1.proceduresController.queryProcedureByName);
        app.put("/procedures/especies/:procedureId/:especieId", proceduresController_1.proceduresController.setEspecieInProcedure);
        app.put("/procedures/especies/all/:procedureId", proceduresController_1.proceduresController.setAllEspeciesInProcedure);
        app.put("/procedures/especies/all/remove/:procedureId", proceduresController_1.proceduresController.removeAllEspeciesInProcedure);
    });
}
exports.proceduresRoutes = proceduresRoutes;
