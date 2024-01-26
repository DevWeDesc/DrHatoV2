import { PopulateOldExams } from "./CadExamsOld.mjs";
import { PopulateOldExamsHistorie } from "./CadExamsOldHistory.mjs";
import { PopulateOldCaractersExams } from "./CadPartDetailsOld.mjs";
import { PopulatePartDetails } from "./CadPartExamsOld.mjs";
import { PopulateUsers } from "./transformExcell.mjs";
import { PopulateInstructAlta } from "./transformExcellAuts.mjs";
import { PopulateEspecies } from "./transformExcellEspecies.mjs";
import { PopulateInstructions } from "./transformExcellInstructs.mjs";
import { PopulateMGroups } from "./transformExcellMGroups.mjs";
import { PopulateMedicines } from "./transformExcellMedicines.mjs";
import { PopulateOldConsults } from "./transformExcellOldConsults.mjs";
import { PopulatePets } from "./transformExcellPet.mjs";
import { PopulateProcedures } from "./transformExcellProced.mjs";
import { PopulateRaces } from "./transformExcellRaces.mjs";
import { PopulateGroups } from "./transformExcellSGroups.mjs";
import { PopulateSectors } from "./transformExcellSector.mjs";
import { PopulateSurgeries } from "./transformExcellSurgeries.mjs";
import { PopulateCustomer } from "./transformExcellUser.mjs";
import { PopulateVaccines } from "./transformExcellVaccines.mjs";

export async function PopulateDataBase() {
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
        await PopulateEspecies();
        await PopulateRaces();
        await PopulateInstructions();
        await PopulateInstructAlta();
        await PopulateOldConsults()
        await PopulateOldExamsHistorie ()

        console.log("Todo Banco Populado com Sucesso!")
        
    } catch (error) {
        console.log("FALHA AO POPULAR BANCO")
    }
}

PopulateDataBase()