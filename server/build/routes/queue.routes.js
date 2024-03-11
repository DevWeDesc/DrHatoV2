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
exports.queueRoutes = void 0;
const queueController_1 = require("../controllers/queueController");
function queueRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.put("/queue/:id", queueController_1.queueController.setPetInQueue);
        app.put("/endqueue/:petId/:queueUUID/:customerId", queueController_1.queueController.finishQueueOfPet);
        app.get("/queuedebits/:petId/:date", queueController_1.queueController.getQueuePetHistory);
        app.put("/queue/unconclude", queueController_1.queueController.unconcludeQueue);
        app.put("/queue/setClientIsVip/:queueId/:idCustomer/:clientIsVip", queueController_1.queueController.updatedClientIsVipInConsultForPet);
        app.get("/queue/details/:queueId", queueController_1.queueController.getQueueByID);
        app.patch("/queue/consult/:queueId", queueController_1.queueController.updateQueueDiagnostics);
        app.get("/queue/consult/diagnostic/:queueId", queueController_1.queueController.getQueueDiagnostics);
        app.patch('/queue/pet/weight/:queueid/:petWeight', queueController_1.queueController.updatePetWeightInQueue);
    });
}
exports.queueRoutes = queueRoutes;
