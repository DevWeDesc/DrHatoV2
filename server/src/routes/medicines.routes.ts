import { FastifyInstance } from 'fastify'

import { medicinesController } from '../controllers/medicinesController';

export async function medicinesRoutes(app: FastifyInstance){

    // Medicines Groups // 
    app.post("/medicines/groups", medicinesController.createMedicineGroup)
    app.get("/medicines/groups", medicinesController.getAllMedicinesGroupsAndMedicines)
    app.get("/medicine/:medicineId", medicinesController.getMedicineById)

    // Medicines
    app.get("/medicines/applied/:CodAnimal", medicinesController.getMedicinesOnPets)
    app.get("/medicines/search", medicinesController.getMedicineByQuery)
    app.get("/pet/medicine/:petId", medicinesController.getPetMedicineHistory)
    app.post("/medicine/:medicineGroupId", medicinesController.createMedicine)
    app.post("/pet/medicine/:medicineId/:petId/:accId/:queueId", medicinesController.setMedicineInPet)
    app.patch("/medicine/remove/:appliedId/:queueId", medicinesController.removeMedicineOnPet)
}