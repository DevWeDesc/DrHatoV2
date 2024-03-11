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
exports.petRoutes = void 0;
const petsController_1 = require("../controllers/petsController");
function petRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('/pets', petsController_1.petsController.getAllPets);
        app.get('/pets/:id', petsController_1.petsController.getWithId);
        app.get('/petsall/:petId', petsController_1.petsController.getPetBedHistory);
        app.post('/pets/:id', petsController_1.petsController.createPet);
        app.get('/pets/queue', petsController_1.petsController.petsInQueue);
        app.get('/pets/queue/preference/:vetName', petsController_1.petsController.petsByVetQueue);
        app.put('/pet/:petId/:weight', petsController_1.petsController.changePetWeight);
        app.post('/pets/especie', petsController_1.petsController.createEspecie);
        app.get('/pets/especie', petsController_1.petsController.getEspecies);
        app.get('/pets/especie/:espId', petsController_1.petsController.getEspeciesById);
        app.post('/pets/races', petsController_1.petsController.createRaces);
        app.get('/pets/history/:petId', petsController_1.petsController.getAllPetHistory);
        app.get('/pet/old/history/consults/:petId', petsController_1.petsController.getPetOldHistoryConsults);
    });
}
exports.petRoutes = petRoutes;
