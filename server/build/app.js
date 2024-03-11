"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = require("fastify");
const zod_1 = require("zod");
const cors_1 = __importDefault(require("@fastify/cors"));
const users_routes_1 = require("./routes/users.routes");
const transaction_routes_1 = require("./routes/transaction.routes");
const customer_routes_1 = require("./routes/customer.routes");
const pets_routes_1 = require("./routes/pets.routes");
const pets_debits_routes_1 = require("./routes/pets.debits.routes");
const autorizations_routes_1 = require("./routes/autorizations.routes");
const exams_routes_1 = require("./routes/exams.routes");
const sector_routes_1 = require("./routes/sector.routes");
const intructions_routes_1 = require("./routes/intructions.routes");
const groups_routes_1 = require("./routes/groups.routes");
const procedures_routes_1 = require("./routes/procedures.routes");
const search_routes_1 = require("./routes/search.routes");
const queue_routes_1 = require("./routes/queue.routes");
const labs_routes_1 = require("./routes/labs.routes");
const admissions_routes_1 = require("./routes/admissions.routes");
const charts_routes_1 = require("./routes/charts.routes");
const vaccines_routes_1 = require("./routes/vaccines.routes");
const surgeries_routes_1 = require("./routes/surgeries.routes");
const box_routes_1 = require("./routes/box.routes");
const accounts_routes_1 = require("./routes/accounts.routes");
const medicines_routes_1 = require("./routes/medicines.routes");
const oldsystem_historie_routes_1 = require("./routes/oldsystem.historie.routes");
const paymentsType_routes_1 = require("./routes/paymentsType.routes");
const reports_routes_1 = require("./routes/reports.routes");
const exam_parts_routes_1 = require("./routes/exam.parts.routes");
exports.app = (0, fastify_1.fastify)();
exports.app.register(cors_1.default, { origin: true });
exports.app.register(users_routes_1.userRoutes);
exports.app.register(transaction_routes_1.transactionRoutes);
exports.app.register(customer_routes_1.customersRoutes);
exports.app.register(pets_routes_1.petRoutes);
exports.app.register(pets_debits_routes_1.petDebitsRoutes);
exports.app.register(autorizations_routes_1.autorizationRoutes);
exports.app.register(exams_routes_1.examsRoutes);
exports.app.register(sector_routes_1.sectorsRoutes);
exports.app.register(intructions_routes_1.instructionsRoutes);
exports.app.register(groups_routes_1.groupsRoutes);
exports.app.register(procedures_routes_1.proceduresRoutes);
exports.app.register(search_routes_1.searchsRoutes);
exports.app.register(queue_routes_1.queueRoutes);
exports.app.register(labs_routes_1.labsRoutes);
exports.app.register(admissions_routes_1.admissionsRoutes);
exports.app.register(charts_routes_1.chartsRoutes);
exports.app.register(vaccines_routes_1.vaccinesRoutes);
exports.app.register(surgeries_routes_1.surgeriesRoutes);
exports.app.register(box_routes_1.boxRoutes);
exports.app.register(accounts_routes_1.accountsRoutes);
exports.app.register(medicines_routes_1.medicinesRoutes);
exports.app.register(oldsystem_historie_routes_1.oldSystemHistorieRoutes);
exports.app.register(paymentsType_routes_1.paymentsTypeRoutes);
exports.app.register(reports_routes_1.reportsRoutes);
exports.app.register(exam_parts_routes_1.examPartRoutes);
exports.app.get('/hello', () => {
    return 'hello word';
});
exports.app.setErrorHandler((error, _, reply) => {
    if (error instanceof zod_1.ZodError) {
        return reply
            .status(400)
            .send({ message: "Validation error", issues: error.format() });
    }
    return reply.status(500).send({ message: "Internal server error" });
});
