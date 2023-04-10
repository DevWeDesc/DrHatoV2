import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { AdminCharts } from "./pages/AdminDashboard/charts";
import { Autorizations } from "./pages/AdminDashboard/autorizations";
import { AdminMain } from "./pages/AdminDashboard/";
import { UsersList } from "./pages/Users";
import { VetsList } from "./pages/Vets";
import { MenuVet } from "./pages/Vets/menu";
import { Admissions } from "./pages/Admissions";
import { LabMenu} from "./pages/Labs";
import { LabExames} from "./pages/Labs/exames";
import { LabImagens} from "./pages/Labs/imagens";
import { CreateVet } from "./pages/Vets/create";
import { DefaultLayout } from "./layouts";
import { CreateUser } from "./pages/Users/create";
import { Reception } from "./pages/Reception";
import { ReceptionConsults } from "./pages/Reception/consultas";
import { Finance } from "./pages/Finance";
import { Customer } from "./pages/Customer";
import { Pets } from "./pages/Pets";
import { CreatePets } from "./pages/Pets/create";
import { DetailsPets } from "./pages/Pets/details";
import { EditUser } from "./pages/Users/edit";
import { Schedules } from "./pages/Schedule";
import { Medicines } from "./pages/Medicines";
import { CreateMedicine } from "./pages/Medicines/create";

export function Router() {
  return (
    <Routes>


        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<DefaultLayout />}>
        <Route path="/Home" element={<Home />} />
         
        <Route path="/Home/Admin" element={<AdminMain />} />
        <Route path="/Home/Admin/Charts" element={<AdminCharts />} />
        <Route path="/Home/Admin/Autorizations" element={<Autorizations />} />


        <Route path="/Home/Users" element={<UsersList />} />
        <Route path="/Home/Users/Create" element={<CreateUser />} />
        <Route path="/Home/Users/Edit/:id" element={<EditUser />} />
        
        <Route path="/Home/Vets" element={<VetsList />} />
        <Route path="/Home/Vets/Menu" element={<MenuVet />} />
        <Route path="/Home/Vets/Create" element={<CreateVet />} />


        <Route path="/Home/Labs" element={<LabMenu />} />
        <Route path="/Home/Labs/Exames" element={<LabExames />} />
        <Route path="/Home/Labs/Imagens" element={<LabImagens />} />




        
        <Route path="/Home/Schedule" element={<Schedules />} />
        <Route path="/Home/Admissions" element={<Admissions />} />
        <Route path="/Home/Medicines" element={<Medicines />} />
        <Route path="/Home/Medicines/Create" element={<CreateMedicine />} />
      
        <Route path="/Home/Recepcao" element={<Reception />} />
        <Route path="/Home/Recepcao/Consultas"element={<ReceptionConsults />}/>
        <Route path="/Home/Recepcao/Consultas/Clientes/:id"element={<Customer />}/>
        <Route path="/Home/Recepcao/Consultas/Clientes/Pets" element={<Pets />}/>
        <Route path="/Home/Recepcao/Consultas/Clientes/Pets/Create/:id"element={<CreatePets />}/>
        <Route path="/Home/Recepcao/Consultas/Clientes/Pets/Details/:id" element={<DetailsPets />}/>
        <Route path="/Home/Recepcao/Finance" element={<Finance />} />
      </Route>
    </Routes>
  );
}
