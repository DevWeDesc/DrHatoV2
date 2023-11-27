import {fastify} from 'fastify'
import cors from '@fastify/cors'
import { userRoutes } from './routes/users.routes'
import { transactionRoutes } from './routes/transaction.routes'
import { customersRoutes } from './routes/customer.routes'
import { petRoutes } from './routes/pets.routes'
import {autorizationRoutes } from './routes/autorizations.routes'
import { examsRoutes } from './routes/exams.routes'
import { sectorsRoutes } from './routes/sector.routes'
import { instructionsRoutes } from './routes/intructions.routes'
import { groupsRoutes } from './routes/groups.routes'
import { proceduresRoutes } from './routes/procedures.routes'
import { searchsRoutes } from './routes/search.routes'
import { queueRoutes } from './routes/queue.routes'
import { labsRoutes } from './routes/labs.routes'
import { admissionsRoutes } from './routes/admissions.routes'
import { chartsRoutes } from './routes/charts.routes'
import { vaccinesRoutes } from './routes/vaccines.routes'
import { surgeriesRoutes } from './routes/surgeries.routes'
import { boxRoutes } from './routes/box.routes'
import { accountsRoutes } from './routes/accounts.routes'
import { medicinesRoutes } from './routes/medicines.routes'
import { oldExamsRoutes } from './routes/old.exams.routes'
import { petDebitsRoutes } from './routes/pets.debits.routes'

const app = fastify()
app.register(cors, {origin: true})
app.register(userRoutes)
app.register(transactionRoutes)
app.register(customersRoutes)
app.register(petRoutes)
app.register(petDebitsRoutes)
app.register(autorizationRoutes)
app.register(oldExamsRoutes)
app.register(examsRoutes)
app.register(sectorsRoutes)
app.register(instructionsRoutes)
app.register(groupsRoutes)
app.register(proceduresRoutes)
app.register(searchsRoutes)
app.register(queueRoutes)
app.register(labsRoutes)
app.register(admissionsRoutes)
app.register(chartsRoutes)
app.register(vaccinesRoutes)
app.register(surgeriesRoutes)
app.register(boxRoutes)
app.register(accountsRoutes)
app.register(medicinesRoutes)



app.listen({ port: 5000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Servidor iniciado porta ${address}`)
})