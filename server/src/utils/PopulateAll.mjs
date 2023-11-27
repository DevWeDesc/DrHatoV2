import { PopulateOldExams } from "./CadExamsOld.mjs";
import { PopulateOldCaractersExams } from "./CadPartDetailsOld.mjs";
import { PopulatePartDetails } from "./CadPartExamsOld.mjs";
import { PopulateUsers } from "./transformExcell.mjs";
import { PopulateMGroups } from "./transformExcellMGroups.mjs";
import { PopulateMedicines } from "./transformExcellMedicines.mjs";
import { PopulatePets } from "./transformExcellPet.mjs";
import { PopulateSurgeries } from "./transformExcellSurgeries.mjs";
import { PopulateCustomer } from "./transformExcellUser.mjs";
import { PopulateVaccines } from "./transformExcellVaccines.mjs";

async function PopulateDataBase () {
    try {
 await PopulateUsers().then(() => {
            PopulateCustomer().then(() => {
                PopulatePets().then(() => {
                    PopulateOldExams().then(() => {
                        PopulatePartDetails().then(() => {
                            PopulateOldCaractersExams().then(() => {
                                PopulateSurgeries().then(() => {
                                    PopulateVaccines().then(() => {
                                        PopulateMGroups().then(() => {
                                            PopulateMedicines().then(() =>  console.log("TODO BANCO POPULADO COM SUCESSO!"))
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })

       
    } catch (error) {
        console.log("FALHA AO POPULAR BANCO")
    }
}

PopulateDataBase()