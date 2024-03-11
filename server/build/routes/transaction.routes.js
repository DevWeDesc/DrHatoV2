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
exports.transactionRoutes = void 0;
const transactionsController_1 = require("../controllers/transactionsController");
function transactionRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get("/transactions", transactionsController_1.transactionController.getAllTransactions);
        app.get("/transactions/:id", transactionsController_1.transactionController.getCustomerTransactions);
        app.post("/transactions", transactionsController_1.transactionController.createTransaction);
        app.delete("/transactions/:id", transactionsController_1.transactionController.deleteUser);
    });
}
exports.transactionRoutes = transactionRoutes;
