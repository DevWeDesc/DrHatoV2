import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { AdminCharts } from "./pages/AdminDashboard/charts";
import { Autorizations } from "./pages/AdminDashboard/autorizations";
import { AutorizationsEdit } from "./pages/AdminDashboard/autorizationsEdit";
import { AdminMain } from "./pages/AdminDashboard/";
import { VetsList } from "./pages/Vets";
import { MenuVet } from "./pages/Vets/menu";
import { Admissions } from "./pages/Admissions";
import { LabMenu } from "./pages/Labs";
import { LabExames } from "./pages/Labs/exames";
import { LabImagens } from "./pages/Labs/imagens";
import { CreateVet } from "./pages/Vets/create";
import { DefaultLayout } from "./layouts";
import { CreateUser } from "./pages/Users/create";
import { Reception } from "./pages/Reception";
import { ReceptionConsults } from "./pages/Reception/consults";
import { Finance } from "./pages/Finance";
import { Customer } from "./pages/Customer";
import { Pets } from "./pages/Pets";
import { CreatePets } from "./pages/Pets/create";
import { DetailsPets } from "./pages/Pets/details";
import { EditUser } from "./pages/Users/edit";
import { Schedules } from "./pages/Schedule/schedule";
import { Medicines } from "./pages/Medicines";
import { CreateMedicine } from "./pages/Medicines/create";
import { GenerateAutorizations } from "./pages/Autorizations";
import { CreateCustomer } from "./pages/Reception/createCustomer";
import { ScheduleMenu } from "./pages/Schedule/menu";
import { QueueSistem } from "./queue";
import { BalanceHistory } from "./pages/Customer/balanceHistory";
import { ExamesList } from "./pages/Exams";
import { ExamsEdit } from "./pages/Exams/edit";
import { ExamDetail } from "./pages/Exams/details";
import { SectorsList } from "./pages/AdminDashboard/sectors";
import { InstructionsList } from "./pages/AdminDashboard/instructions";
import { ProceduresList } from "./pages/Procedures";
import { ProcedureCreate } from "./pages/Procedures/create";
import { ProcedureEdit } from "./pages/Procedures/edit";
import { MedicineRecords } from "./pages/Pets/medicinesRecord";
import { WorkSpaceVet } from "./pages/Vets/workspace";
import { SetPetExam } from "./pages/Exams/setpetexam";
import { ShowBeds } from "./pages/Admissions/beds";
import { EditCustomer } from "./pages/Customer/edit";
import { ChangeConsult } from "./pages/Reception/changeConsult";
import { VetExams } from "./pages/Vets/WorkSpaceVets/exams";
import { ProceduresVet } from "./pages/Vets/WorkSpaceVets/procedures";
import { DataExames } from "./pages/Labs/dataExames";
import { Vaccines } from "./pages/Vets/WorkSpaceVets/vaccines";
import { Protocols } from "./pages/Vets/WorkSpaceVets/protocols";
import { VetInstructions } from "./pages/Vets/WorkSpaceVets/instructions";
import { VetsAdmissions } from "./pages/Vets/WorkSpaceVets/admissions";
import { VetsSurgeries } from "./pages/Vets/WorkSpaceVets/sergeries";
import { AdmissionDetails } from "./pages/Admissions/details";
import { SurgeriesAdmission } from "./components/Admission/surgeriesadmission";
import { AdmissionExams } from "./pages/Admissions/exams";
import AdmissionsVaccines from "./pages/Admissions/vaccines";
import ProceduresAdmisisonPage from "./components/Admission/ProceduresPage";
import AdmissionProtocols from "./pages/Admissions/protocols";
import EditProtocols from "./pages/Admissions/editProtocols";
import AdminVaccines from "./pages/AdminDashboard/vaccines";
import Surgeries from "./pages/Surgeries";
import SurgeriesDetails from "./pages/Surgeries/SurgeriesDetails";
import { SurgeryCenter } from "./pages/AdminDashboard/surgeryCenter";
import { Hospitalization } from "./pages/AdminDashboard/hospitalization";
import { Reports } from "./pages/Reports/index";
import { AdminSurgery } from "./pages/AdminDashboard/surgeryes";
import { UsersList } from "./pages/Users";
import { AnimatePresence } from "framer-motion";
import { QueueLabs } from "./queue/Labs";

export function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route element={<DefaultLayout />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Reports" element={<Reports />} />

          <Route path="/Queue" element={<QueueSistem />} />
          <Route path="/Queue/Labs" element={<QueueLabs />} />

          <Route path="/Admin" element={<AdminMain />} />
          <Route path="/Admin/Vaccines" element={<AdminVaccines />} />
          <Route path="/Admin/Surgeryes" element={<AdminSurgery />} />

          <Route path="/Admin/Charts" element={<AdminCharts />} />
          <Route path="/Admin/Autorizations" element={<Autorizations />} />
          <Route
            path="/Admin/Autorizations/:id"
            element={<AutorizationsEdit />}
          />
          <Route path="/Admin/Exams" element={<ExamesList />} />
          <Route path="/Admin/Exams/:id" element={<ExamsEdit />} />
          <Route path="/Admin/Exams/Details/:id" element={<ExamDetail />} />
          <Route path="/Admin/Sectors" element={<SectorsList />} />
          <Route path="/Admin/Instructions" element={<InstructionsList />} />
          <Route path="/Admin/Procedures" element={<ProceduresList />} />
          <Route
            path="/Admin/Procedures/Create"
            element={<ProcedureCreate />}
          />
          <Route
            path="/Admin/Procedures/Edit/:id"
            element={<ProcedureEdit />}
          />
          <Route path="/Admin/SurgeryCenter" element={<SurgeryCenter />} />
          <Route path="/Admin/Hospitalization" element={<Hospitalization />} />

          <Route path="/Autorizations" element={<GenerateAutorizations />} />

          <Route path="/Users" element={<UsersList />} />
          <Route path="/Users/Create" element={<CreateUser />} />
          <Route path="/Users/Edit/:id" element={<EditUser />} />

          <Route path="/Vets" element={<VetsList />} />
          <Route path="/Vets/Menu" element={<MenuVet />} />
          <Route path="/Vets/Create" element={<CreateVet />} />
          <Route path="/Vets/WorkSpace/:id" element={<WorkSpaceVet />} />

          {/* VETS WORKSPACE PATHS */}
          <Route path="/WorkSpace/Exam/:id" element={<VetExams />} />
          <Route path="/WorkSpace/Procedures/:id" element={<ProceduresVet />} />
          <Route path="/WorkSpace/Vaccines/:id" element={<Vaccines />} />
          <Route path="/WorkSpace/Protocols/:id" element={<Protocols />} />
          <Route
            path="/WorkSpace/Instructions/:id"
            element={<VetInstructions />}
          />
          <Route
            path="/WorkSpace/Admissions/:id"
            element={<VetsAdmissions />}
          />
          <Route path="/WorkSpace/Surgeries/:id" element={<VetsSurgeries />} />

          {/* VETS WORKSPACE PATHS END */}

          <Route path="/Labs" element={<LabMenu />} />
          <Route path="/Labs/Exames" element={<LabExames />} />
          <Route path="/Labs/Exames/:id" element={<DataExames />} />
          <Route path="/Labs/Imagens" element={<LabImagens />} />
          <Route path="/Labs/Set/:id" element={<SetPetExam />} />

          <Route path="/Schedule" element={<Schedules />} />
          <Route path="/Schedule/Menu" element={<ScheduleMenu />} />

          <Route path="/Admissions" element={<Admissions />} />
          <Route
            path="/Admissions/Protocols"
            element={<AdmissionProtocols />}
          />
          <Route path="/Admissions/Protocols/:id" element={<EditProtocols />} />

          <Route path="/Admissions/:id" element={<AdmissionDetails />} />
          <Route
            path="/Admissions/Procedures/:id"
            element={<ProceduresAdmisisonPage />}
          />
          <Route
            path="/Admissions/Vaccines/:id"
            element={<AdmissionsVaccines />}
          />
          <Route path="/Admissions/Exams/:id" element={<AdmissionExams />} />
          <Route
            path="/Admissions/Surgeries/:id"
            element={<SurgeriesAdmission />}
          />
          <Route path="/Admissions/Beds" element={<ShowBeds />} />

          <Route path="/Medicines" element={<Medicines />} />
          <Route path="/Medicines/Create" element={<CreateMedicine />} />

          <Route path="/Recepcao" element={<Reception />} />
          <Route path="/Recepcao/Consultas" element={<ReceptionConsults />} />
          <Route path="/Recepcao/Change" element={<ChangeConsult />} />
          <Route
            path="/Recepcao/Consultas/Clientes/:id"
            element={<Customer />}
          />
          <Route path="/Recepcao/Consultas/Clientes/Pets" element={<Pets />} />
          <Route
            path="/Recepcao/Consultas/Clientes/Pets/Create/:id"
            element={<CreatePets />}
          />
          <Route
            path="/Recepcao/Consultas/Clientes/Pets/Details/:id"
            element={<DetailsPets />}
          />
          <Route
            path="/Pets/MedicineRecord/:id"
            element={<MedicineRecords />}
          />
          <Route path="/Recepcao/Create" element={<CreateCustomer />} />
          <Route
            path="/Recepcao/Customer/Edit/:id"
            element={<EditCustomer />}
          />
          <Route path="/Recepcao/Finance" element={<Finance />} />
          <Route path="/Recepcao/" element={<Reception />} />

          <Route path="/Surgeries/" element={<Surgeries />} />
          <Route path="/Surgeries/:id" element={<SurgeriesDetails />} />

          <Route path="/Customer/Balance/:id" element={<BalanceHistory />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
