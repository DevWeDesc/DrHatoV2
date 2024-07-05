import { fastify } from "fastify";
import { ZodError } from "zod";
import cors from "@fastify/cors";
import { userRoutes } from "./routes/users.routes";
import { transactionRoutes } from "./routes/transaction.routes";
import { customersRoutes } from "./routes/customer.routes";
import { petRoutes } from "./routes/pets.routes";
import { petDebitsRoutes } from "./routes/pets.debits.routes";
import { autorizationRoutes } from "./routes/autorizations.routes";
import { examsRoutes } from "./routes/exams.routes";
import { sectorsRoutes } from "./routes/sector.routes";
import { instructionsRoutes } from "./routes/intructions.routes";
import { groupsRoutes } from "./routes/groups.routes";
import { proceduresRoutes } from "./routes/procedures.routes";
import { searchsRoutes } from "./routes/search.routes";
import { queueRoutes } from "./routes/queue.routes";
import { labsRoutes } from "./routes/labs.routes";
import { admissionsRoutes } from "./routes/admissions.routes";
import { chartsRoutes } from "./routes/charts.routes";
import { vaccinesRoutes } from "./routes/vaccines.routes";
import { surgeriesRoutes } from "./routes/surgeries.routes";
import { boxRoutes } from "./routes/box.routes";
import { accountsRoutes } from "./routes/accounts.routes";
import { medicinesRoutes } from "./routes/medicines.routes";
import { oldSystemHistorieRoutes } from "./routes/oldsystem.historie.routes";
import { paymentsTypeRoutes } from "./routes/paymentsType.routes";
import { reportsRoutes } from "./routes/reports.routes";
import { examPartRoutes } from "./routes/exam.parts.routes";
import { searchEngineMenu } from "./routes/search.engine.routes";
import { healthInsuranceRoutes } from "./routes/health.insurance.routes";
import { surgeriesCentralRoutes } from "./routes/surgeries.central.routes";
import { oldConsultsRoutes } from "./routes/oldconsults.routes";

export const app = fastify();


app.register(cors, { origin: true });
app.register(userRoutes);
app.register(transactionRoutes);
app.register(customersRoutes);
app.register(petRoutes);
app.register(petDebitsRoutes);
app.register(autorizationRoutes);
app.register(examsRoutes);
app.register(sectorsRoutes);
app.register(instructionsRoutes);
app.register(groupsRoutes);
app.register(proceduresRoutes);
app.register(searchsRoutes);
app.register(queueRoutes);
app.register(labsRoutes);
app.register(admissionsRoutes);
app.register(chartsRoutes);
app.register(vaccinesRoutes);
app.register(surgeriesRoutes);
app.register(boxRoutes);
app.register(accountsRoutes);
app.register(medicinesRoutes);
app.register(oldSystemHistorieRoutes);
app.register(paymentsTypeRoutes);
app.register(reportsRoutes);
app.register(examPartRoutes)
app.register(searchEngineMenu)
app.register(healthInsuranceRoutes)
app.register(surgeriesCentralRoutes)
app.register(oldConsultsRoutes)


app.get('/hello', () => {
  return 'hello word'
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  return reply.status(500).send({ message: "Internal server error" });
});
