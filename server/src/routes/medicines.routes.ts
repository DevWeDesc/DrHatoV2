import { FastifyInstance } from 'fastify'

import { medicinesController } from '../controllers/medicinesController';

export async function medicinesRoutes(app: FastifyInstance){

    // Medicines Groups // 
    app.post("/medicines/groups", medicinesController.createMedicineGroup)
    app.get("/medicines/groups", medicinesController.getAllMedicinesGroupsAndMedicines)

    app.get("/medicine/:medicineId", medicinesController.getMedicineById)


    app.get("/pet/medicine/:petId", medicinesController.getPetMedicineHistory)
    app.post("/medicine/:medicineGroupId", medicinesController.createMedicine)
    app.post("/pet/medicine/:medicineId/:petId/:dosage/:accId", medicinesController.setMedicineInPet)
}