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
exports.searchsRoutes = void 0;
const searchController_1 = require("../controllers/searchController");
function searchsRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get("/filtredquery", searchController_1.searchController.vetsBigSearchs);
        app.get("/queryall", searchController_1.searchController.getAll);
        app.get("/vetmenusearch/:page", searchController_1.searchController.searchVetMenu);
        app.get("/searchcodpet/:codPet", searchController_1.searchController.getByCodPet);
        app.get("/labmenusearch", searchController_1.searchController.searchLabMenu);
    });
}
exports.searchsRoutes = searchsRoutes;
