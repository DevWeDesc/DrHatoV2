import { Routes, Route } from "react-router-dom";
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
import { CustomerDetails } from "./pages/Customer";
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
import { QueueLabs } from "./queue/Labs";
import ReportsComission from "./pages/Reports/comissions";
import ReportsCashFlow from "./pages/Reports/cashflow";
import { CustomerReports } from "./pages/Reports/customerReports";
import ReportProductionVet from "./pages/Reports/vetProduction";
import { SpecialtiesReports } from "./pages/Reports/specialties";
import ReportsExams from "./pages/Reports/exams";
import ReportSurgeriesCompleted from "./pages/Reports/surgeriesCompleted";
import ReportsExamsForVets from "./pages/Reports/examsforVet";
import { ReportsExamsExtern } from "./pages/Reports/examsExterns";
import { ReactPdfComponent } from "./components/ReactPdfComp";
import { BoxReception } from "./pages/Reception/Box";
import { BoxReports } from "./pages/Reception/Box/reports";
import { BoxPayments } from "./pages/Reception/Box/payments";
import { BoxReturns } from "./pages/Reception/Box/returns";
import { BoxReturnsDetails } from "./pages/Reception/Box/returnsDetails";
import { BoxPaymentsDetails } from "./pages/Reception/Box/paymentsDetails";
import { BoxNewPayments } from "./pages/Reception/Box/newPayments";
import { BoxNewPaymentsClient } from "./pages/Reception/Box/clientPayments";
import { ToolsTable } from "./pages/Reception/Tools/table";
import { ToolsChangePassword } from "./pages/Reception/Tools/passwordChange";
import { ToolsAutorizations } from "./pages/Reception/Tools/autorizations";
import { ToolsAutorizationsDetails } from "./pages/Reception/Tools/autorizationsDetails";
import { ReceptionVaccines } from "./pages/Reception/Vaccines";
import { RegisterClinics } from "./pages/Reception/Administration/registerClinics";
import { EditClinics } from "./pages/Reception/Administration/editClinics";
import { UsersClinics } from "./pages/Reception/Administration/usersClinics";
import { BreedRegistry } from "./pages/Reception/Administration/breedRegistry";
import { OptionSistem } from "./pages/AdminDashboard/optionSistem";
import { EditPets } from "./pages/Pets/edit";
import { HealthInsurance } from "./pages/AdminDashboard/healthInsurance";
import { HealthInsuranceDetails } from "./pages/AdminDashboard/HealthInsuranceDetails";
import AdminBoxs from "./pages/AdminDashboard/box";
import { AuthContextProvider } from "./contexts/AuthContext";
import ReminderPage from "./pages/ReminderPage";
import { ExamsDetails } from "./pages/Vets/WorkSpaceVets/examsDetails";
import { AdminCadEspecies } from "./pages/AdminDashboard/cadEspecies";
import { AdminCadRaces } from "./pages/AdminDashboard/cadRaces";
import { ExamsResultPdfView } from "./pages/Vets/WorkSpaceVets/examsResultPdfsView";
import { CreateMedicineGroup } from "./pages/Medicines/groups";
import { AutorizationsPdf } from "./components/ReactPdfComp/AutorizationPdf";
import { OnePartExamResultPdf } from "./components/ReactPdfComp/OnePartExamResultPdf";
import { MultiPartExamResultPdf } from "./components/ReactPdfComp/MultiPartExamResultPdf";
import { ByTextExamResultPdf } from "./components/ReactPdfComp/ByTextExamResultPdf";
import { InstructionsPdf } from "./components/ReactPdfComp/InstructionsPdf";
import { Historic } from "./pages/Vets/historic";

export function Router() {
  return (
    <AuthContextProvider>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route element={<DefaultLayout />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Reminder" element={<ReminderPage />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="/Reports/Comission" element={<ReportsComission />} />
          <Route path="/Reports/Cashflow" element={<ReportsCashFlow />} />
          <Route
            path="/Reports/CustomerReports"
            element={<CustomerReports />}
          />
          <Route path="/pdf" element={<ReactPdfComponent />} />
          <Route
            path="/Reports/ProductionVet"
            element={<ReportProductionVet />}
          />
          <Route path="/Reports/Specialties" element={<SpecialtiesReports />} />
          <Route path="/Reports/Exams" element={<ReportsExams />} />
          <Route
            path="/Reports/SurgeriesCompleted"
            element={<ReportSurgeriesCompleted />}
          />
          <Route path="/Reports/ExamsVet" element={<ReportsExamsForVets />} />
          <Route path="/Reports/ExamsExtern" element={<ReportsExamsExtern />} />
          <Route path="/Queue" element={<QueueSistem />} />
          <Route path="/Queue/Labs" element={<QueueLabs />} />
          <Route path="/Admin" element={<AdminMain />} />
          <Route path="/Admin/Vaccines" element={<AdminVaccines />} />
          <Route path="/Admin/Surgeryes" element={<AdminSurgery />} />
          <Route path="/Admin/HealthInsurance" element={<HealthInsurance />} />
          <Route
            path="/Admin/HealthInsurance/:id"
            element={<HealthInsuranceDetails />}
          />
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
          <Route path="/Admin/Box" element={<AdminBoxs />} />
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
          <Route path="/Admin/OptionSistem" element={<OptionSistem />} />
          <Route path="/Admin/Especies" element={<AdminCadEspecies />} />
          <Route path="/Admin/Races/:espId" element={<AdminCadRaces />} />
          <Route path="/Autorizations" element={<GenerateAutorizations />} />
          <Route path="/Autorizations/Pdf/:id" element={<AutorizationsPdf />} />
          <Route path="/Instructions/Pdf/:id" element={<InstructionsPdf />} />
          <Route path="/Users" element={<UsersList />} />
          <Route path="/Users/Create" element={<CreateUser />} />
          <Route path="/Users/Edit/:id" element={<EditUser />} />
          eateMedicine
          <Route path="/Vets" element={<VetsList />} />
          <Route path="/Vets/Menu" element={<MenuVet />} />
          <Route path="/Vets/Create" element={<CreateVet />} />
          <Route
            path="/Vets/WorkSpace/:id/:queueId"
            element={<WorkSpaceVet />}
          />
          <Route path="/Vets/Historic/:id" element={<Historic />} />
          {/* VETS WORKSPACE PATHS */}
          <Route path="/WorkSpace/Exam/:id/:queueId" element={<VetExams />} />
          <Route
            path="/WorkSpace/Procedures/:id/:queueId"
            element={<ProceduresVet />}
          />
          <Route
            path="/WorkSpace/Vaccines/:id/:queueId"
            element={<Vaccines />}
          />
          <Route path="/WorkSpace/Protocols/:id" element={<Protocols />} />
          <Route
            path="/WorkSpace/Admissions/:id/:queueId"
            element={<VetsAdmissions />}
          />
          <Route
            path="/WorkSpace/Surgeries/:id/:queueId"
            element={<VetsSurgeries />}
          />
          <Route
            path="/WorkSpace/ExamsDetails/:examId"
            element={<ExamsDetails />}
          />
          <Route
            path="/WorkSpace/ExamResultsOnePart/:examId"
            element={<OnePartExamResultPdf />}
          />
          <Route
            path="/WorkSpace/ExamResultsMultiPart/:examId"
            element={<MultiPartExamResultPdf />}
          />
          <Route
            path="/WorkSpace/ExamResultsByText/:examId"
            element={<ByTextExamResultPdf />}
          />
          <Route
            path="/WorkSpace/ExamResults/:examId"
            element={<ExamsResultPdfView />}
          />
          {/* VETS WORKSPACE PATHS END */}
          <Route path="/Labs" element={<LabMenu />} />
          <Route path="/Labs/Exames" element={<LabExames />} />
          <Route path="/Labs/Exames/:id" element={<DataExames />} />
          <Route path="/Labs/Imagens" element={<LabImagens />} />
          <Route path="/Labs/Set/:id/:examId" element={<SetPetExam />} />
          <Route path="/Schedule" element={<Schedules />} />
          <Route path="/Schedule/Menu" element={<ScheduleMenu />} />
          <Route path="/Admissions" element={<Admissions />} />
          <Route
            path="/Admissions/Protocols"
            element={<AdmissionProtocols />}
          />
          <Route path="/Admissions/Protocols/:id" element={<EditProtocols />} />
          <Route
            path="/Admissions/:id/:queueId"
            element={<AdmissionDetails />}
          />
          <Route
            path="/Admissions/Procedures/:id/:queueId"
            element={<ProceduresAdmisisonPage />}
          />
          <Route
            path="/Admissions/Vaccines/:id/:queueId"
            element={<AdmissionsVaccines />}
          />
          <Route
            path="/Admissions/Exams/:id/:queueId"
            element={<AdmissionExams />}
          />
          <Route
            path="/Admissions/Surgeries/:id/:queueId"
            element={<SurgeriesAdmission />}
          />
          <Route path="/Admissions/Beds" element={<ShowBeds />} />
          <Route path="/Medicines" element={<Medicines />} />
          <Route path="/Medicines/Create" element={<CreateMedicine />} />
          <Route path="/Medicines/Groups" element={<CreateMedicineGroup />} />
          <Route path="/Recepcao" element={<Reception />} />
          <Route path="/Recepcao/Consultas" element={<ReceptionConsults />} />
          <Route path="/Recepcao/Change" element={<ChangeConsult />} />
          <Route
            path="/Recepcao/Consultas/Clientes/:id"
            element={<CustomerDetails />}
          />
          <Route path="/Recepcao/Consultas/Clientes/Pets" element={<Pets />} />
          <Route
            path="/Recepcao/Consultas/Clientes/Pets/Create/:id"
            element={<CreatePets />}
          />
          <Route
            path="/Recepcao/Consultas/Clientes/Pets/Edit/:id/:queueId"
            element={<EditPets />}
          />
          <Route
            path="/Recepcao/Consultas/Clientes/Pets/Details/:id"
            element={<DetailsPets />}
          />
          <Route path="/Recepcao/Caixa" element={<BoxReception />} />
          <Route path="/Recepcao/Caixa/Despesas" element={<BoxReports />} />
          <Route path="/Recepcao/Caixa/Pagamentos" element={<BoxPayments />} />
          <Route
            path="/Recepcao/Caixa/Pagamentos/:id"
            element={<BoxPaymentsDetails />}
          />
          <Route
            path="/Recepcao/Caixa/PagamentoCliente/:petId/:date/:clientId"
            element={<BoxNewPaymentsClient />}
          />
          <Route
            path="/Recepcao/Caixa/NovoPagamento/:id"
            element={<BoxNewPayments />}
          />
          <Route path="/Recepcao/Caixa/Returns" element={<BoxReturns />} />
          <Route
            path="/Recepcao/Caixa/Returns/:id"
            element={<BoxReturnsDetails />}
          />
          <Route
            path="/Pets/MedicineRecord/:id/:queueId"
            element={<MedicineRecords />}
          />
          <Route path="/Recepcao/Create" element={<CreateCustomer />} />
          <Route
            path="/Recepcao/Customer/Edit/:id"
            element={<EditCustomer />}
          />
          <Route path="/Recepcao/Ferramentas/Tabela" element={<ToolsTable />} />
          <Route
            path="/Recepcao/Ferramentas/TrocaDeSenha/:id"
            element={<ToolsChangePassword />}
          />
          <Route
            path="/Recepcao/Ferramentas/Autorizacao"
            element={<ToolsAutorizations />}
          />
          <Route
            path="/Recepcao/Ferramentas/Autorizacao/:id"
            element={<ToolsAutorizationsDetails />}
          />
          <Route
            path="/Recepcao/Internacoes/Vacinas"
            element={<ReceptionVaccines />}
          />
          <Route
            path="/Recepcao/RegistroClinicas"
            element={<RegisterClinics />}
          />
          <Route
            path="/Recepcao/RegistroClinicas/:id"
            element={<EditClinics />}
          />
          <Route
            path="/Recepcao/RegistroClinicas/Users/:id"
            element={<UsersClinics />}
          />
          <Route path="/Recepcao/CadastroRaças" element={<BreedRegistry />} />
          <Route path="/Recepcao/" element={<Reception />} />
          <Route path="/Surgeries/" element={<Surgeries />} />
          <Route path="/Surgeries/:id" element={<SurgeriesDetails />} />
          <Route path="/Customer/Balance/:id" element={<BalanceHistory />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}
