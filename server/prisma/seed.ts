import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

async function main() {
  const userData = [
    {
      username: "Daniel Hato",
      email: "daniel@gmail.com",
      password: await bcrypt.hash("123456", 10),
      userType: "['admin']",
    },
    {
      username: "Danilo Scalia",
      email: "danilo@gmail.com",
      password: await bcrypt.hash("123456", 10),
      userType: "['admin']",
    },
    {
      username: "Dilan Lopez",
      email: "dilan@gmail.com",
      password: await bcrypt.hash("123456", 10),
      userType: "['admin']",
    },
  ];

  const customerData = [
    {
      name: "Daniel",
      adress: "Av. Martim Francisco, 802",
      district: "Santo André",
      state: "SP",
      neighbour: "Bairro Vila Alto",
      phone: "11950441928",
      tell: "1140506090",
      cpf: "215661556",
      rg: "546849616",
      email: "daniel@gmail.com",
      birthday: "03/09/1978",
      balance: 0,
      kindPerson: "FÍSICA",
      vetPreference: null,
      howKnowUs: "Facebook",
    },
    {
      name: "Danilo",
      adress: "Rua Adolfo Bastos, 597",
      district: "Santo André",
      state: "SP",
      neighbour: "Bairro Vila Alto",
      phone: "11954541928",
      tell: "1140506090",
      cpf: "211511556",
      rg: "544646616",
      email: "danilo@gmail.com",
      birthday: "03/09/1988",
      balance: 0,
      kindPerson: "FÍSICA",
      vetPreference: null,
      howKnowUs: "Instagram",
    },
    {
      name: "Mariana",
      adress: "Rua das Flores, 123",
      district: "São Paulo",
      state: "SP",
      neighbour: "Bairro Jardim das Rosas",
      phone: "11987654321",
      tell: "1122574455",
      cpf: "123456789",
      rg: "987654321",
      email: "mariana@example.com",
      birthday: "10/20/1990",
      balance: 0,
      kindPerson: "FÍSICA",
      vetPreference: null,
      howKnowUs: "SiteBusca",
    },
    {
      name: "Pedro",
      adress: "Av. dos Sonhos, 456",
      district: "Rio de Janeiro",
      state: "RJ",
      neighbour: "Bairro Nova Esperança",
      phone: "21987654321",
      tell: "2122334455",
      cpf: "9876554321",
      rg: "123456789",
      email: "pedro@example.com",
      birthday: "05/15/1985",
      balance: 0,
      kindPerson: "FÍSICA",
      vetPreference: null,
      howKnowUs: "FachadaHospital",
    },
    {
      name: "Gabriela",
      adress: "Rua das Estrelas, 789",
      district: "Belo Horizonte",
      state: "MG",
      neighbour: "Bairro Jardim Celestial",
      phone: "31987654321",
      tell: "3122334455",
      cpf: "567896234",
      rg: "432156789",
      email: "gabriela@example.com",
      birthday: "12/05/1992",
      balance: 0,
      kindPerson: "FÍSICA",
      vetPreference: null,
      howKnowUs: "Indicação",
    },
    {
      name: "Lucas",
      adress: "Av. Central, 987",
      district: "Curitiba",
      state: "PR",
      neighbour: "Bairro Centro",
      phone: "41987654321",
      tell: "4122334455",
      cpf: "2345667891",
      rg: "678912345",
      email: "lucas@example.com",
      birthday: "08/30/1982",
      balance: 0,
      kindPerson: "FÍSICA",
      vetPreference: null,
      howKnowUs: "PlacaRua",
    },
    {
      name: "Isabela",
      adress: "Rua dos Pássaros, 321",
      district: "Porto Alegre",
      state: "RS",
      neighbour: "Bairro Jardim das Aves",
      phone: "51987654321",
      tell: "5122334455",
      cpf: "5765875782",
      rg: "891234567",
      email: "isabela@example.com",
      birthday: "02/12/1995",
      balance: 0,
      kindPerson: "FÍSICA",
      vetPreference: null,
      howKnowUs: "Twitter",
    },
    {
      name: "Rodrigo",
      adress: "Av. das Árvores, 654",
      district: "Fortaleza",
      state: "CE",
      neighbour: "Bairro Jardim das Plantas",
      phone: "85987654321",
      tell: "8582334455",
      cpf: "6543131667",
      rg: "234567891",
      email: "rodrigo@example.com",
      birthday: "07/25/1998",
      balance: 0,
      kindPerson: "FÍSICA",
      vetPreference: null,
      howKnowUs: "Petshop",
    },
    {
      name: "Carolina",
      adress: "Rua das Pedras, 987",
      district: "Salvador",
      state: "BA",
      neighbour: "Bairro Praia do Sol",
      phone: "71987654321",
      tell: "7122334455",
      cpf: "895674567",
      rg: "345678912",
      email: "carolina@example.com",
      birthday: "03/18/1987",
      balance: 0,
      kindPerson: "FÍSICA",
      vetPreference: null,
      howKnowUs: "Outros",
    },
    {
      name: "Rafael",
      adress: "Av. dos Anjos, 321",
      district: "Recife",
      state: "PE",
      neighbour: "Bairro Jardim Celeste",
      phone: "81987654321",
      tell: "8122334455",
      cpf: "2368877891",
      rg: "678912345",
      email: "rafael@example.com",
      birthday: "11/05/1991",
      balance: 0,
      kindPerson: "FÍSICA",
      vetPreference: null,
      howKnowUs: "ClienteHato",
    },
  ];

  const examsData = [
    {
      name: "Hemo + Eritograma",
      price: 500.5,
      available: true,
      examsType: "['lab']",
    },
    {
      name: "Bioquímica sérica",
      price: 1000.5,
      available: true,
      examsType: "['lab']",
    },
    {
      name: "Hemograma Felino",
      price: 2000.5,
      available: true,
      examsType: "['lab']",
    },
    {
      name: "Consulta Clínica",
      price: 150.5,
      available: true,
      examsType: "['lab']",
    },
    {
      name: "Vacinação V8",
      price: 80.25,
      available: true,
      examsType: "['lab']",
    },
    {
      name: "Cirurgia de Esterilização",
      price: 300.0,
      available: true,
      examsType: "['lab']",
    },
    {
      name: "Raio-X",
      price: 250.75,
      available: true,
      examsType: "['image']",
    },
    {
      name: "Ultrassonografia",
      price: 180.9,
      available: true,
      examsType: "['image']",
    },
  ];

  const vaccinesData = [
    {
      name: "Anti Rábica",
      price: 215,
      description: "Aplicada para prevenção do vírus da raiva",
    },

    {
      name: "Vacina da Cinomose",
      price: 250.5,
      description:
        "Aplicada para prevenir a cinomose, uma doença viral que afeta os cães.",
    },

    {
      name: "Vacina da Parvovirose",
      price: 180.75,
      description:
        "Utilizada para proteger cães contra a parvovirose, uma infecção viral grave.",
    },

    {
      name: "Vacina da Tosse dos Canis",
      price: 150.25,
      description:
        "Aplicada para prevenir a tosse dos canis, uma doença respiratória altamente contagiosa em cães.",
    },

    {
      name: "Vacina da Leptospirose",
      price: 290.35,
      description:
        "Utilizada para proteger cães contra a leptospirose, uma infecção bacteriana transmitida por animais selvagens e água contaminada.",
    },
  ];

  const surgeriesData = [
    {
      name: "Cirurgia de Castração",
      price: 200,
    },

    {
      name: "Cirurgia de Remoção de Tumor",
      price: 280,
    },

    {
      name: "Cirurgia de Correção de Luxação de Patela",
      price: 250,
    },

    {
      name: "Cirurgia de Limpeza Dentária",
      price: 180,
    },

    {
      name: "Cirurgia de Amputação de Membro",
      price: 300,
    },
  ];

  const autorizationsData = [
    {
      name: "Autorização de Internação",
      text: "Permite a internação do animal no hospital veterinário para receber cuidados e tratamentos especializados.",
    },

    {
      name: "Autorização de Cirurgia",
      text: "Permite a realização de uma cirurgia no animal, seguindo os procedimentos necessários para tratar uma condição específica.",
    },

    {
      name: "Autorização de Exames Laboratoriais",
      text: "Permite a realização de exames laboratoriais no animal, como análises de sangue, urina ou imagem, para diagnóstico ou acompanhamento do estado de saúde.",
    },

    {
      name: "Autorização de Tratamento Medicamentoso",
      text: "Permite o início ou continuidade de um tratamento medicamentoso para o animal, incluindo a prescrição e administração de medicamentos específicos.",
    },

    {
      name: "Autorização de Eutanásia",
      text: "Permite a realização da eutanásia no animal, em casos de sofrimento irreversível ou condições médicas graves e incuráveis.",
    },
  ];


  const especiesData = [
    {
      "name": "Felina"
    },
    {
      "name": "Canina"
    },
    {
      "name": "Ave"
    },
    {
      "name": "Roedor"
    },
    {
      "name": "Silvestre"
    },
    {
      "name": "Réptil"
    },
    {
      "name": "Peixe"
    },
    {
      "name": "Quelônio"
    },
    {
      "name": "Primata"
    }
  ]
  const racesData = [
    { "name": "Persa", "espId": 1 },
    { "name": "British Blue", "espId": 1 },
    { "name": "Escocês", "espId": 1 },
    { "name": "Russo Azul", "espId": 1 },
    { "name": "Himalaio", "espId": 1 },
    { "name": "Chartrox", "espId": 1 },
    { "name": "Mestiço", "espId": 1 },
    { "name": "Pelo Curto Brasileiro", "espId": 1 },
    { "name": "Himalaio Persa", "espId": 1 },
    { "name": "Rag Doll", "espId": 1 },
    { "name": "Angorá Turco", "espId": 1 },
    { "name": "Comum Européia", "espId": 1 },
    { "name": "Siamês", "espId": 1 },
    { "name": "Rajado Brasileiro", "espId": 1 },
    { "name": "Sagrado da Birmânia", "espId": 1 },
    { "name": "Sagrado", "espId": 1 },
    { "name": "Maine Coon", "espId": 1 },
    { "name": "Bengal", "espId": 1 },
    { "name": "Househound Pet", "espId": 1 },
    { "name": "Scottish Straight", "espId": 1 },
    { "name": "Snowshoe", "espId": 1 },
    { "name": "Persa Exótica", "espId": 1 },
    { "name": "Devon Rex", "espId": 1 },
    { "name": "Cornish Rex", "espId": 1 },
    { "name": "Sphynx", "espId": 1 },
    { "name": "Abyssinian", "espId": 1 },
    { "name": "Siamese Oriental", "espId": 1 },
    { "name": "Burmesa", "espId": 1 },
    { "name": "Tonquinês", "espId": 1 },
    { "name": "Savannah", "espId": 1 },
    { "name": "Siberiano", "espId": 1 },
    { "name": "Norueguês da Floresta", "espId": 1 },
    { "name": "Bobtail Japonês", "espId": 1 },
    { "name": "Turkish Van", "espId": 1 },
    { "name": "Manx", "espId": 1 },
    { "name": "Labrador Retriever", "espId": 2 },
   { "name": "Golden Retriever", "espId": 2 },
   { "name": "German Shepherd", "espId": 2 },
   { "name": "French Bulldog", "espId": 2 },
   { "name": "Bulldog", "espId": 2 },
   { "name": "Poodle", "espId": 2 },
   { "name": "Beagle", "espId": 2 },
   { "name": "Rottweiler", "espId": 2 },
   { "name": "Yorkshire Terrier", "espId": 2 },
   { "name": "Boxer", "espId": 2 },
   { "name": "Dachshund", "espId": 2 },
   { "name": "Shih Tzu", "espId": 2 },
   { "name": "Siberian Husky", "espId": 2 },
   { "name": "Doberman Pinscher", "espId": 2 },
   { "name": "Great Dane", "espId": 2 },
   { "name": "Chihuahua", "espId": 2 },
   { "name": "Border Collie", "espId": 2 },
   { "name": "Cocker Spaniel", "espId": 2 },
   { "name": "Miniature Schnauzer", "espId": 2 },
   { "name": "Pug", "espId": 2 },
   { "name": "Australian Shepherd", "espId": 2 },
   { "name": "Basset Hound", "espId": 2 },
   { "name": "Pomeranian", "espId": 2 },
   { "name": "Shiba Inu", "espId": 2 },
   { "name": "Bichon Frise", "espId": 2 },
   { "name": "Cavalier King Charles Spaniel", "espId": 2 },
   { "name": "Papillon", "espId": 2 },
   { "name": "Bull Terrier", "espId": 2 },
   { "name": "Alaskan Malamute", "espId": 2 },
   { "name": "Samoyed", "espId": 2 },
   { "name": "Pastor Suíço", "espId": 2 },
   { "name": "Spaniel Japonês", "espId": 2 },
   { "name": "Springer Spaniel Inglês", "espId": 2 },
   { "name": "Mastin", "espId": 2 },
   { "name": "Benese", "espId": 2 },
   { "name": "Poodle Champ", "espId": 2 },
   { "name": "Airdale Terrier", "espId": 2 },
   { "name": "Samoyeda", "espId": 2 },
   { "name": "Bichon Frisè", "espId": 2 },
  { "name": "Setter Irlandês", "espId": 2 },
  { "name": "Mini Shnauzer", "espId": 2 },
  { "name": "Dobermman", "espId": 2 },
  { "name": "Starforshire Terrier", "espId": 2 },
  { "name": "West Highlander White Terrier", "espId": 2 },
   { "name": "Basset Pelo Longo", "espId": 2 },
   { "name": "Tenerife", "espId": 2 },
   { "name": "Pastor de Shettland", "espId": 2 },
   { "name": "Cani Corso", "espId": 2 },
   { "name": "Poodle Micro Toy", "espId": 2 },
   { "name": "Afghan Hound", "espId": 2 },
   { "name": "Sheep Dog Alemão", "espId": 2 },
   { "name": "Bull Dog Francês", "espId": 2 },
   { "name": "Rott Weiller", "espId": 2 },
   { "name": "American Pit Bull", "espId": 2 },
   { "name": "Golden", "espId": 2 },
   { "name": "Dog Agentino", "espId": 2 },
   { "name": "Pastor de Buceron", "espId": 2 },
   { "name": "Pequinês Alemão", "espId": 2 },
   { "name": "Splinter", "espId": 2 },
   { "name": "Malamute", "espId": 2 },
   { "name": "Malamute Alaska", "espId": 2 },
   { "name": "Minie Collie", "espId": 2 },
   { "name": "York Shire", "espId": 2 },
   { "name": "Cocker Americano", "espId": 2 },
   { "name": "Schnauzer", "espId": 2 },
   { "name": "Bull Dog", "espId": 2 },
   { "name": "Starforshire Bull Terrier", "espId": 2 },
   { "name": "Boxer Inglês", "espId": 2 },
   { "name": "Americano", "espId": 2 },
   { "name": "Lhasa-Apso", "espId": 2 },
   { "name": "Dálmata", "espId": 2 },
   { "name": "Poodle Toy", "espId": 2 },
   { "name": "Mini Pinscher", "espId": 2 },
   { "name": "Sheep Dog", "espId": 2 },
   { "name": "Cairn Terrier", "espId": 2 },
   { "name": "Cristado Chinês", "espId": 2 },
   { "name": "Fox Terrier Pelo Curto", "espId": 2 },
   { "name": "Blue Riller", "espId": 2 }
  ];
  

  try {
    await prisma.user.createMany({ data: userData });
    await prisma.customer.createMany({ data: customerData });
    await prisma.exams.createMany({ data: examsData });
    await prisma.vaccines.createMany({ data: vaccinesData });
    await prisma.surgeries.createMany({ data: surgeriesData });
    await prisma.autorizations.createMany({ data: autorizationsData });
    await prisma.especies.createMany({ data: especiesData })
  
    for (const data of racesData) {
      await prisma.races.create({
        data: {name: data.name, Especies: {connect: {id: data.espId}}}
      })
    }
    
    console.log("BANCO POPULADO!!");
  } catch (error) {
    console.log(error);
  }
}

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//     process.exit(1);
//   })
//   .catch(async (error) => {
//     console.log(error);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
