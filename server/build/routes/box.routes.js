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
exports.boxRoutes = void 0;
const boxController_1 = require("../controllers/boxController");
function boxRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post("/vetbox", boxController_1.boxController.createVetBox);
        app.get("/vetbox", boxController_1.boxController.showVetBox);
        app.get("/dailybox", boxController_1.boxController.showDailyBox);
        app.get("/lastbox", boxController_1.boxController.showlastBoxClosed);
        app.get("/debitaccounts", boxController_1.boxController.showCustomerDebitsOpen);
        app.post("/openhistbox/:boxId", boxController_1.boxController.openBoxDaily);
        app.patch("/closehistbox/:vetBox/:boxId", boxController_1.boxController.closeBoxDaily);
        app.get("/account/debitsAll", boxController_1.boxController.getAllDebits);
        app.get("/account/debitByBox/:boxId", boxController_1.boxController.getDebitsByBox);
        app.post("/account/returns/:boxId/:customerId/:installmentId", boxController_1.boxController.createReturnsBoxByUser);
        app.get("/returnsAll", boxController_1.boxController.getAllReturns);
        app.get('/dailybox/installments/:dailyBoxId', boxController_1.boxController.getDailyBoxInstallments);
    });
}
exports.boxRoutes = boxRoutes;
