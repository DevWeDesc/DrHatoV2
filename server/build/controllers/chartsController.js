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
exports.chartsController = void 0;
require("../utils/chartsMarketingCount");
const chartsMarketingCount_1 = require("../utils/chartsMarketingCount");
const PrismaInstance_1 = require("../interface/PrismaInstance");
exports.chartsController = {
    allCharts: (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const marketingChart = yield PrismaInstance_1.prisma.customer.findMany({
                select: { howKnowUs: true }
            });
            let response = (0, chartsMarketingCount_1.chartsCount)(marketingChart);
            reply.send(response);
        }
        catch (error) {
            console.log(error);
        }
    })
};
