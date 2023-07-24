import { FastifyInstance } from 'fastify'

import { admissionsController } from '../controllers/admissionsController';


export async function admissionsRoutes(app: FastifyInstance){
app.post('/admissions', admissionsController.createKennel)
app.get('/admissions', admissionsController.getKennels)
app.get('/beds', admissionsController.getBeds)
app.put('/admitpet', admissionsController.admitPet)
app.get('/admittedpet', admissionsController.getBusyAndAdmittedPets)
app.get("/admissionstest", admissionsController.testAdmissions)
}