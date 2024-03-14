interface IAdminLinks {
  to: string;
  text: string;
}
export const AdminLinks: IAdminLinks[] = [
  { to: "/Admin/Autorizations", text: "Cadastro de Autorizações" },
  { to: "/Admin/Instructions", text: "Cadastro de Instruções" },
  { to: "/Admin/Exams", text: "Cadastro de Exames" },

  { to: "/Admin/Procedures", text: "Cadastro de Procedimentos" },
  { to: "/Admin/Surgeryes", text: "Cadastro de Cirurgias" },
  { to: "/Admin/HealthInsurance", text: "Cadastro de Plano de Saúde" },
  { to: "/Admin/TypesPayment", text: "Cadastro de Tipos de Pagamentos" },
  { to: "/Admin/OptionSistem", text: "Opções do Sistema" },
  { to: "/Admin/Hospitalization", text: "Cadastro de Leitos para Internação" },
  { to: "/Admin/Sectors", text: "Cadastro de Setores/Grupos" },
  { to: "/Admin/SurgeryCenter", text: "Cadastro de Centro Cirúrgico" },
  { to: "/Admin/Vaccines", text: "Cadastro de Vacinas" },
  { to: "/Admin/Box", text: "Cadastro de Caixa" },
  { to: "/Admin/Especies", text: "Cadastro de Especies/Raças" },
];
