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
exports.userRoutes = void 0;
const userController_1 = require("../controllers/userController");
function userRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/users', userController_1.userController.createUser);
        app.post('/login', userController_1.userController.loginUser);
        app.get('/vets', userController_1.userController.findVetUsers);
        app.get('/users', userController_1.userController.getUsers);
        app.get('/users/:id', userController_1.userController.getWithId);
        app.put('/users/:id', userController_1.userController.editUser);
        app.delete('/users/:id', userController_1.userController.deleteUser);
        app.get('/users/vets', userController_1.userController.getVetUsers);
        app.get('/users/vets/name/:consultName', userController_1.userController.searchVetByName);
    });
}
exports.userRoutes = userRoutes;
