import { CardNavigation } from "../../components/CardNavigation";
import {
  BsHouseDoorFill,
  FaHospitalUser,
  GiHealthNormal,
  IoFlask,
  BsBellFill,
  GiHealthPotion,
  AiFillSchedule,
  GiNurseFemale,
  AiFillCheckCircle,
  MdAdminPanelSettings,
  GiScalpel,
} from "react-icons/all";
export function CardsMenu() {
  const userPermissions = "admin";
  let menu;
  switch (true) {
    case userPermissions.includes("admin"):
      menu = (
        <>
          {" "}
          <CardNavigation
            path="/Admin"
            title="Administração"
            text="Relatórios"
            icon={<MdAdminPanelSettings fill="#8eda7c" size={36} />}
          />
          <CardNavigation
            path="/Recepcao"
            title="Recepção"
            text="Consultar cliente"
            icon={<FaHospitalUser size={36} />}
          />
          <CardNavigation
            path="/Vets/Menu"
            title="Veterinários"
            text="Marcar consulta"
            icon={<GiHealthNormal fill="#f10b0b" size={36} />}
          />
          <CardNavigation
            path="/Labs"
            title="Laboratórios"
            text="Ver exames"
            icon={<IoFlask fill="#217c97" size={36} />}
          />
          <CardNavigation
            path="/Medicines"
            title="Medicamentos"
            text="Ver medicamentos"
            icon={<GiHealthPotion fill="#63136a" size={36} />}
          />
          <CardNavigation
            path="/Admissions"
            title="Internações"
            text="Ver exames"
            icon={<GiNurseFemale fill="#c9537e" size={36} />}
          />
          <CardNavigation
            //path="/Schedule/Menu"
            title="Agendas"
            text="Ver exames"
            icon={<AiFillSchedule fill="#6ac574" size={36} />}
          />
          <CardNavigation
            title="Mensagens"
            text="Ver mensagens"
            icon={<BsBellFill fill="#FF7200" size={36} />}
          />
          <CardNavigation
            path="/Autorizations"
            title="Autorizações"
            text="Ver exames"
            icon={<AiFillCheckCircle fill="#46720c" size={36} />}
          />
          <CardNavigation
            path="/Surgeries"
            title="Cirurgias"
            text="Ver Cirurgias"
            icon={<GiScalpel fill="#46720c" size={36} />}
          />
        </>
      );
      break;
    case userPermissions.includes("vet"):
      menu = (
        <>
          <CardNavigation
            path="/Vets/Menu"
            title="Veterinários"
            text="Marcar consulta"
            icon={<GiHealthNormal fill="#f10b0b" size={36} />}
          />
          <CardNavigation
            path="/Labs"
            title="Laboratórios"
            text="Ver exames"
            icon={<IoFlask fill="#217c97" size={36} />}
          />
          <CardNavigation
            path="/Medicines"
            title="Medicamentos"
            text="Ver medicamentos"
            icon={<GiHealthPotion fill="#63136a" size={36} />}
          />
          <CardNavigation
            path="/Admissions"
            title="Internações"
            text="Ver exames"
            icon={<GiNurseFemale fill="#c9537e" size={36} />}
          />
          <CardNavigation
            //path="/Schedule/Menu"
            title="Agendas"
            text="Ver exames"
            icon={<AiFillSchedule fill="#6ac574" size={36} />}
          />
          <CardNavigation
            title="Mensagens"
            text="Ver mensagens"
            icon={<BsBellFill fill="#FF7200" size={36} />}
          />
          <CardNavigation
            path="/Autorizations"
            title="Autorizações"
            text="Ver exames"
            icon={<AiFillCheckCircle fill="#46720c" size={36} />}
          />
          <CardNavigation
            path="/Surgeries"
            title="Cirurgias"
            text="Ver Cirurgias"
            icon={<GiScalpel fill="#46720c" size={36} />}
          />
        </>
      );
      break;
    case userPermissions.includes("reception"):
      menu = (
        <>
          <CardNavigation
            path="/Recepcao"
            title="Recepção"
            text="Consultar cliente"
            icon={<FaHospitalUser size={36} />}
          />
          <CardNavigation
            path="/Admissions"
            title="Internações"
            text="Ver exames"
            icon={<GiNurseFemale fill="#c9537e" size={36} />}
          />
          <CardNavigation
            //path="/Schedule/Menu"
            title="Agendas"
            text="Ver exames"
            icon={<AiFillSchedule fill="#6ac574" size={36} />}
          />
          <CardNavigation
            //title="Mensagens"
            text="Ver mensagens"
            icon={<BsBellFill fill="#FF7200" size={36} />}
          />
          <CardNavigation
            path="/Autorizations"
            title="Autorizações"
            text="Ver exames"
            icon={<AiFillCheckCircle fill="#46720c" size={36} />}
          />
          <CardNavigation
            path="/Surgeries"
            title="Cirurgias"
            text="Ver Cirurgias"
            icon={<GiScalpel fill="#46720c" size={36} />}
          />
        </>
      );
      break;
    default:
      menu = (
        <>
          <CardNavigation
            path="/Admin"
            title="Administração"
            text="Relatórios"
            icon={<BsHouseDoorFill fill="#8eda7c" size={36} />}
          />
          <CardNavigation
            path="/Recepcao"
            title="Recepção"
            text="Consultar cliente"
            icon={<FaHospitalUser size={36} />}
          />
          <CardNavigation
            path="/Vets/Menu"
            title="Veterinários"
            text="Marcar consulta"
            icon={<GiHealthNormal fill="#f10b0b" size={36} />}
          />
          <CardNavigation
            path="/Labs"
            title="Laboratórios"
            text="Ver exames"
            icon={<IoFlask fill="#217c97" size={36} />}
          />
          <CardNavigation
            onClick={() => {
              localStorage.setItem("origem", window.location.pathname);
            }}
            path="/Medicines"
            title="Medicamentos"
            text="Ver medicamentos"
            icon={<GiHealthPotion fill="#63136a" size={36} />}
          />
          <CardNavigation
            path="/Admissions"
            title="Internações"
            text="Ver exames"
            icon={<GiNurseFemale fill="#c9537e" size={36} />}
          />
          <CardNavigation
            path="/Surgeries"
            title="Cirurgias"
            text="Ver Cirurgias"
            icon={<GiScalpel fill="#46720c" size={36} />}
          />
          <CardNavigation
            path="/Autorizations"
            title="Autorizações"
            text="Ver exames"
            icon={<AiFillCheckCircle fill="#46720c" size={36} />}
          />

          <CardNavigation
            //path="/Schedule/Menu"
            title="Agendas"
            text="Ver exames"
            icon={<AiFillSchedule fill="#6ac574" size={36} />}
          />
          <CardNavigation
            title="Mensagens"
            text="Ver mensagens"
            icon={<BsBellFill fill="#FF7200" size={36} />}
          />
        </>
      );
      break;
  }
  return <>{menu}</>;
}
