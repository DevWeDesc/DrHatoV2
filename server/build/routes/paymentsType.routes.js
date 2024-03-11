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
exports.paymentsTypeRoutes = void 0;
const paymentsTypeController_1 = require("../controllers/paymentsTypeController");
function paymentsTypeRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get("/paymentsType", paymentsTypeController_1.paymentsTypeController.getAllPaymentsType);
        app.get("/paymentsType/:id", paymentsTypeController_1.paymentsTypeController.getPaymentTypeById);
        app.post("/paymentsType", paymentsTypeController_1.paymentsTypeController.createPaymentType);
        app.put("/paymentsType/:id", paymentsTypeController_1.paymentsTypeController.editPaymentType);
        app.delete("/paymentsType/:id", paymentsTypeController_1.paymentsTypeController.deletePaymentType);
    });
}
exports.paymentsTypeRoutes = paymentsTypeRoutes;
