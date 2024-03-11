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
exports.medicinesRoutes = void 0;
const medicinesController_1 = require("../controllers/medicinesController");
function medicinesRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        // Medicines Groups // 
        app.post("/medicines/groups", medicinesController_1.medicinesController.createMedicineGroup);
        app.get("/medicines/groups", medicinesController_1.medicinesController.getAllMedicinesGroupsAndMedicines);
        app.get("/medicine/:medicineId", medicinesController_1.medicinesController.getMedicineById);
        // Medicines
        app.get("/medicines/applied/:CodAnimal", medicinesController_1.medicinesController.getMedicinesOnPets);
        app.get("/medicines/search", medicinesController_1.medicinesController.getMedicineByQuery);
        app.get("/pet/medicine/:petId", medicinesController_1.medicinesController.getPetMedicineHistory);
        app.post("/medicine/:medicineGroupId", medicinesController_1.medicinesController.createMedicine);
        app.post("/pet/medicine/:medicineId/:petId/:accId/:queueId", medicinesController_1.medicinesController.setMedicineInPet);
        app.patch("/medicine/remove/:appliedId/:queueId", medicinesController_1.medicinesController.removeMedicineOnPet);
    });
}
exports.medicinesRoutes = medicinesRoutes;
