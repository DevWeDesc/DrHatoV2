import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { AdminCharts } from "./pages/AdminDashboard/charts";
import { Autorizations } from "./pages/AdminDashboard/autorizations";
import { AutorizationsEdit } from "./pages/AdminDashboard/autorizationsEdit";
import { AdminMain } from "./pages/AdminDashboard/";
import { UsersList } from "./pages/Users";
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

export function Router() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<DefaultLayout />}>
        <Route path="/Home" element={<Home />} />

        <Route path="/Queue" element={<QueueSistem />} />


        <Route path="/Admin" element={<AdminMain />} />
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
         <Route path="/Admin/Procedures/Create" element={<ProcedureCreate />} />
         <Route path="/Admin/Procedures/Edit/:id" element={<ProcedureEdit />} />


        <Route path="/Autorizations" element={<GenerateAutorizations />} />

        <Route path="/Users" element={<UsersList />} />
        <Route path="/Users/Create" element={<CreateUser />} />
        <Route path="/Users/Edit/:id" element={<EditUser />} />

        <Route path="/Vets" element={<VetsList />} />
        <Route path="/Vets/Menu" element={<MenuVet />} />
        <Route path="/Vets/Create" element={<CreateVet />} />
        <Route path="/Vets/WorkSpace/:id" element={<WorkSpaceVet />} />

        <Route path="/Labs"  element={<LabMenu />} />
        <Route path="/Labs/Exames" element={<LabExames />} />
        <Route path="/Labs/Imagens" element={<LabImagens />} />
        <Route path="/Labs/Set/:id"  element={<SetPetExam />} />


        <Route path="/Schedule" element={<Schedules />} />
        <Route path="/Schedule/Menu" element={<ScheduleMenu />} />

        <Route path="/Admissions" element={<Admissions />} />

        <Route path="/Medicines" element={<Medicines />} />
        <Route path="/Medicines/Create" element={<CreateMedicine />} />

        <Route path="/Recepcao" element={<Reception />} />
        <Route path="/Recepcao/Consultas" element={<ReceptionConsults />} />
        <Route path="/Recepcao/Consultas/Clientes/:id" element={<Customer />} />
        <Route path="/Recepcao/Consultas/Clientes/Pets" element={<Pets />} />
        <Route
          path="/Recepcao/Consultas/Clientes/Pets/Create/:id"
          element={<CreatePets />}
        />
        <Route
          path="/Recepcao/Consultas/Clientes/Pets/Details/:id"
          element={<DetailsPets />}
        />
        <Route path="/Pets/MedicineRecord/:id" element={<MedicineRecords/>} />
        <Route path="/Recepcao/Create" element={<CreateCustomer />} />
        <Route path="/Recepcao/Finance" element={<Finance />} />

        <Route path="/Customer/Balance/:id" element={<BalanceHistory />} />
      </Route>
    </Routes>
  );
}
