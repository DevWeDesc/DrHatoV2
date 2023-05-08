import {fastify} from 'fastify'
import cors from '@fastify/cors'
import { userRoutes } from './routes/users.routes'
import { transactionRoutes } from './routes/transaction.routes'
import { customersRoutes } from './routes/customer.routes'
import { petRoutes } from './routes/pets.routes'
import {generalRoutes } from './routes/general.routes'
import { examsRoutes } from './routes/exams.routes'

const app = fastify()

app.register(cors, {origin: true})
app.register(userRoutes)
app.register(transactionRoutes)
app.register(customersRoutes)
app.register(petRoutes)
app.register(generalRoutes)
app.register(examsRoutes)

app.listen({ port: 5000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log("Server Running at v2")
})