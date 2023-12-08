import { PopulateOldExams } from "./CadExamsOld.mjs";
import { PopulateOldCaractersExams } from "./CadPartDetailsOld.mjs";
import { PopulatePartDetails } from "./CadPartExamsOld.mjs";
import { PopulateUsers } from "./transformExcell.mjs";
import { PopulateMGroups } from "./transformExcellMGroups.mjs";
import { PopulateMedicines } from "./transformExcellMedicines.mjs";
import { PopulatePets } from "./transformExcellPet.mjs";
import { PopulateProcedures } from "./transformExcellProced.mjs";
import { PopulateGroups } from "./transformExcellSGroups.mjs";
import { PopulateSectors } from "./transformExcellSector.mjs";
import { PopulateSurgeries } from "./transformExcellSurgeries.mjs";
import { PopulateCustomer } from "./transformExcellUser.mjs";
import { PopulateVaccines } from "./transformExcellVaccines.mjs";

async function PopulateDataBase () {
    try {

        await PopulateUsers();
        await PopulateCustomer();
        await PopulatePets();
        await PopulateOldExams();
        await PopulatePartDetails();
        await PopulateOldCaractersExams();
        await PopulateSurgeries();
        await PopulateVaccines();
        await PopulateMGroups();
        await PopulateMedicines();
        await PopulateSectors();
        await PopulateGroups();
        await PopulateProcedures();

        console.log("Todo Banco Populado com Sucesso!")
        
    } catch (error) {
        console.log("FALHA AO POPULAR BANCO")
    }
}

PopulateDataBase()