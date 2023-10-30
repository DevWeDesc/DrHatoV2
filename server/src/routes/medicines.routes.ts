import { FastifyInstance } from 'fastify'

import { medicinesController } from '../controllers/medicinesController';

export async function medicinesRoutes(app: FastifyInstance){
    app.get("/pet/medicine/:petId", medicinesController.getPetMedicineHistory)
    app.post("/medicines/groups", medicinesController.createMedicineGroup)
    app.post("/medicine/medicineGroupId:", medicinesController.createMedicine)
    app.post("/pet/medicine/:medicineId/:petId/:dosage/:accId", medicinesController.setMedicineInPet)
}