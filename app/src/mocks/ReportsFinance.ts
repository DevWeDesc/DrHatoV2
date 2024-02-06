interface AmbulatorioEntry {
  Procedimento: string;
  "Qtd Amb": number;
  "Qtd Int": number;
  "Fat Amb": number;
  "Fat Int": number;
  "Qtd Total": number;
  "Fat Total": number;
}

interface AmbulatorioData {
  Ambulatorio: AmbulatorioEntry[];
  Anestesia: AmbulatorioEntry[];
  Cardiologia: AmbulatorioEntry[];
}

export const ReportFinanceData: AmbulatorioData = {
  Ambulatorio: [
    {
      Procedimento: "Consulta",
      "Qtd Amb": 433,
      "Qtd Int": 2,
      "Fat Amb": 57217.4,
      "Fat Int": 208,
      "Qtd Total": 435,
      "Fat Total": 57425.4,
    },
    {
      Procedimento: "Consulta Plantão (Após as 18hrs, Sábados e Feriados)",
      "Qtd Amb": 335,
      "Qtd Int": 0,
      "Fat Amb": 54830,
      "Fat Int": 0,
      "Qtd Total": 335,
      "Fat Total": 54830,
    },
    {
      Procedimento: "Aplicação SC (3 Medicações)",
      "Qtd Amb": 297,
      "Qtd Int": 0,
      "Fat Amb": 30267.6,
      "Fat Int": 0,
      "Qtd Total": 297,
      "Fat Total": 30267.6,
    },
    {
      Procedimento: "Aplicação SC (2 Medicações)",
      "Qtd Amb": 230,
      "Qtd Int": 0,
      "Fat Amb": 17561.2,
      "Fat Int": 0,
      "Qtd Total": 230,
      "Fat Total": 17561.2,
    },
    {
      Procedimento: "Aplicação de Convenia (cada 0,1ml)",
      "Qtd Amb": 271,
      "Qtd Int": 43,
      "Fat Amb": 10587,
      "Fat Int": 1695,
      "Qtd Total": 314,
      "Fat Total": 12282,
    },
    {
      Procedimento: "Aplicação SC (4 Medicações)",
      "Qtd Amb": 68,
      "Qtd Int": 0,
      "Fat Amb": 8373.2,
      "Fat Int": 0,
      "Qtd Total": 68,
      "Fat Total": 8373.2,
    },
    {
      Procedimento: "Aplicação SC (1 Medicação)",
      "Qtd Amb": 146,
      "Qtd Int": 0,
      "Fat Amb": 7940.8,
      "Fat Int": 0,
      "Qtd Total": 146,
      "Fat Total": 7940.8,
    },
    {
      Procedimento: "Aplicação de Cerenia (cada 0,1ml)",
      "Qtd Amb": 746,
      "Qtd Int": 58,
      "Fat Amb": 5801,
      "Fat Int": 462,
      "Qtd Total": 804,
      "Fat Total": 6263,
    },
    {
      Procedimento: "Eutanasia",
      "Qtd Amb": 11,
      "Qtd Int": 1,
      "Fat Amb": 5185,
      "Fat Int": 330,
      "Qtd Total": 12,
      "Fat Total": 5515,
    },
    {
      Procedimento: "Taxa de Providência",
      "Qtd Amb": 48,
      "Qtd Int": 1,
      "Fat Amb": 4401.5,
      "Fat Int": 81,
      "Qtd Total": 49,
      "Fat Total": 4482.5,
    },
    {
      Procedimento: "Aplicação SC (5 Medicações)",
      "Qtd Amb": 19,
      "Qtd Int": 0,
      "Fat Amb": 2908,
      "Fat Int": 0,
      "Qtd Total": 19,
      "Fat Total": 2908,
    },
    {
      Procedimento: "Aplicação SC - Combo 3 Aplicacoes",
      "Qtd Amb": 21,
      "Qtd Int": 0,
      "Fat Amb": 2771,
      "Fat Int": 0,
      "Qtd Total": 21,
      "Fat Total": 2771,
    },
    {
      Procedimento: "Chip",
      "Qtd Amb": 17,
      "Qtd Int": 0,
      "Fat Amb": 2765,
      "Fat Int": 0,
      "Qtd Total": 17,
      "Fat Total": 2765,
    },
    {
      Procedimento: "Aplicação de Osurnia (cada tubo)",
      "Qtd Amb": 12,
      "Qtd Int": 0,
      "Fat Amb": 1804,
      "Fat Int": 0,
      "Qtd Total": 12,
      "Fat Total": 1804,
    },
    {
      Procedimento: "Aplicação de Neptra (cada tubo)",
      "Qtd Amb": 6,
      "Qtd Int": 0,
      "Fat Amb": 1498,
      "Fat Int": 0,
      "Qtd Total": 6,
      "Fat Total": 1498,
    },
    {
      Procedimento:
        "Aplicação Subcutânea ou Intramuscular (SC/IM) Com Medicação - PETLOVE",
      "Qtd Amb": 21,
      "Qtd Int": 0,
      "Fat Amb": 1211,
      "Fat Int": 0,
      "Qtd Total": 21,
      "Fat Total": 1211,
    },
    {
      Procedimento: "Aplicação de Librela 5mg (Frasco)",
      "Qtd Amb": 5,
      "Qtd Int": 0,
      "Fat Amb": 1037.73,
      "Fat Int": 0,
      "Qtd Total": 5,
      "Fat Total": 1037.73,
    },
    {
      Procedimento: "Consulta Triagem",
      "Qtd Amb": 13,
      "Qtd Int": 0,
      "Fat Amb": 985,
      "Fat Int": 0,
      "Qtd Total": 13,
      "Fat Total": 985,
    },
  ],
  Anestesia: [
    {
      Procedimento: "Anestesia inalatória (Baixa complexidade)",
      "Qtd Amb": 8,
      "Qtd Int": 3,
      "Fat Amb": 2454,
      "Fat Int": 1339,
      "Qtd Total": 11,
      "Fat Total": 3793,
    },
    {
      Procedimento: "Sedação",
      "Qtd Amb": 6,
      "Qtd Int": 0,
      "Fat Amb": 604,
      "Fat Int": 0,
      "Qtd Total": 6,
      "Fat Total": 604,
    },
    {
      Procedimento: "Anestesia Inalatória Grupo 1 - PETLOVE",
      "Qtd Amb": 1,
      "Qtd Int": 0,
      "Fat Amb": 462,
      "Fat Int": 0,
      "Qtd Total": 1,
      "Fat Total": 462,
    },
    {
      Procedimento: "Sedação Acompanhada",
      "Qtd Amb": 1,
      "Qtd Int": 0,
      "Fat Amb": 150,
      "Fat Int": 0,
      "Qtd Total": 1,
      "Fat Total": 150,
    },
    {
      Procedimento: "Sedação - Anestesista",
      "Qtd Amb": 1,
      "Qtd Int": 0,
      "Fat Amb": 99,
      "Fat Int": 0,
      "Qtd Total": 1,
      "Fat Total": 99,
    },
    {
      Procedimento: "Anestesia Local",
      "Qtd Amb": 1,
      "Qtd Int": 0,
      "Fat Amb": 80,
      "Fat Int": 0,
      "Qtd Total": 1,
      "Fat Total": 80,
    },
  ],
  Cardiologia: [
    {
      Procedimento: "ECG",
      "Qtd Amb": 85,
      "Qtd Int": 3,
      "Fat Amb": 12949,
      "Fat Int": 471,
      "Qtd Total": 88,
      "Fat Total": 13420,
    },
    {
      Procedimento: "ECO",
      "Qtd Amb": 10,
      "Qtd Int": 0,
      "Fat Amb": 2216,
      "Fat Int": 0,
      "Qtd Total": 10,
      "Fat Total": 2216,
    },
    {
      Procedimento: "ECO - MOBILIVET (até as 18 horas)",
      "Qtd Amb": 5,
      "Qtd Int": 1,
      "Fat Amb": 1260,
      "Fat Int": 240,
      "Qtd Total": 6,
      "Fat Total": 1500,
    },
    {
      Procedimento: "Consulta Cardiologia",
      "Qtd Amb": 3,
      "Qtd Int": 0,
      "Fat Amb": 865,
      "Fat Int": 0,
      "Qtd Total": 3,
      "Fat Total": 865,
    },
    {
      Procedimento: "Consulta Especialista (Cardiologista) - PETLOVE",
      "Qtd Amb": 1,
      "Qtd Int": 0,
      "Fat Amb": 300,
      "Fat Int": 0,
      "Qtd Total": 1,
      "Fat Total": 300,
    },
    {
      Procedimento: "Pressão Sistólica",
      "Qtd Amb": 4,
      "Qtd Int": 0,
      "Fat Amb": 134,
      "Fat Int": 0,
      "Qtd Total": 4,
      "Fat Total": 134,
    },
  ],
};
