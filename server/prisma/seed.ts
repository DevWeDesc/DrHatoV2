import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from "bcrypt";


async function main() {
  
    const userData = [{
        username: 'Daniel Hato',
        email: 'daniel@gmail.com',
        password: await bcrypt.hash('123456', 10),
        userType: "['admin']"
    }, {
        username: 'Danilo Scalia',
        email: 'danilo@gmail.com',
        password: await bcrypt.hash('123456', 10),
        userType: "['admin']"
    }, {
        username: 'Dilan Lopez',
        email: 'dilan@gmail.com',
        password:await bcrypt.hash('123456', 10),
        userType: "['admin']"
    }]

    const  customerData = [
        {
            name: "Daniel",
            adress: "Av. Martim Francisco, 802",
            district: "Santo André",
            state: "SP",
            neighbour: "Bairro Vila Alto",
            phone:  "11950441928",
            tell: "1140506090",
            cpf: "215661556",          
            rg: "546849616",           
            email: "daniel@gmail.com"  ,      
            birthday: "03/09/1978",     
            balance: 0 ,    
            kindPerson: "FÍSICA",    
            vetPreference: null, 
            howKnowUs: "Facebook"     
        },
        {
            name: "Danilo",
           adress: "Rua Adolfo Bastos, 597",
           district: "Santo André",
           state: "SP",
           neighbour: "Bairro Vila Alto",
           phone:  "11954541928",
           tell: "1140506090",
           cpf: "211511556",          
           rg: "544646616",           
           email: "danilo@gmail.com"  ,      
           birthday: "03/09/1988",     
           balance: 0 ,    
           kindPerson: "FÍSICA",    
           vetPreference: null, 
           howKnowUs: "Instagram"       
       },{
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
        howKnowUs: "SiteBusca"
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
        howKnowUs: "FachadaHospital"
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
        howKnowUs: "Indicação"
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
        howKnowUs: "PlacaRua"
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
        howKnowUs: "Twitter"
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
        howKnowUs: "Petshop"
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
        howKnowUs: "Outros"
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
        howKnowUs: "ClienteHato"
        }
    ]

    const examsData = [
        {
            name: "Consulta Clínica",
            price: 150.50,
            available: true,
            examsType: "['lab']"
            },
            {
            name: "Vacinação V8",
            price: 80.25,
            available: true,
            examsType: "['lab']"
            },
            {
            name: "Cirurgia de Esterilização",
            price: 300.00,
            available: true,
            examsType: "['lab']"
            },
            {
            name: "Raio-X",
            price: 250.75,
            available: true,
            examsType: "['image']"
            },
            {
            name: "Ultrassonografia",
            price: 180.90,
            available: true,
            examsType: "['image']"
            }
    ]

    const vaccinesData = [
            {
            name: "Anti Rábica",
            price: 215,
            description: "Aplicada para prevenção do vírus da raiva"
            },
            
            {
            name: "Vacina da Cinomose",
            price: 250.5,
            description: "Aplicada para prevenir a cinomose, uma doença viral que afeta os cães."
            },
            
            {
            name: "Vacina da Parvovirose",
            price: 180.75,
            description: "Utilizada para proteger cães contra a parvovirose, uma infecção viral grave."
            },
            
            {
            name: "Vacina da Tosse dos Canis",
            price: 150.25,
            description: "Aplicada para prevenir a tosse dos canis, uma doença respiratória altamente contagiosa em cães."
            },
            
            {
            name: "Vacina da Leptospirose",
            price: 290.35,
            description: "Utilizada para proteger cães contra a leptospirose, uma infecção bacteriana transmitida por animais selvagens e água contaminada."
            }
    ]

    const surgeriesData = [
         {
            name: "Cirurgia de Castração",
            price: 200
            },
            
            {
            name: "Cirurgia de Remoção de Tumor",
            price: 280
            },
            
            {
            name: "Cirurgia de Correção de Luxação de Patela",
            price: 250
            },
            
            {
            name: "Cirurgia de Limpeza Dentária",
            price: 180
            },
            
            {
            name: "Cirurgia de Amputação de Membro",
            price: 300
            }
    ]

    const autorizationsData = [
        {
            name: "Autorização de Internação",
            text: "Permite a internação do animal no hospital veterinário para receber cuidados e tratamentos especializados."
            },
            
            {
            name: "Autorização de Cirurgia",
            text: "Permite a realização de uma cirurgia no animal, seguindo os procedimentos necessários para tratar uma condição específica."
            },
            
            {
            name: "Autorização de Exames Laboratoriais",
            text: "Permite a realização de exames laboratoriais no animal, como análises de sangue, urina ou imagem, para diagnóstico ou acompanhamento do estado de saúde."
            },
            
            {
            name: "Autorização de Tratamento Medicamentoso",
            text: "Permite o início ou continuidade de um tratamento medicamentoso para o animal, incluindo a prescrição e administração de medicamentos específicos."
            },
            
            {
            name: "Autorização de Eutanásia",
            text: "Permite a realização da eutanásia no animal, em casos de sofrimento irreversível ou condições médicas graves e incuráveis."
            }
    ]

    try {
        await prisma.user.createMany({ data: userData})
        await prisma.customer.createMany({data: customerData})
        await prisma.exams.createMany({data: examsData})
        await prisma.vaccines.createMany({data: vaccinesData})
        await prisma.surgeries.createMany({data: surgeriesData})
        await prisma.autorizations.createMany({data: autorizationsData})
        console.log("BANCO POPULADO!!")
    } catch (error) {
        console.log(error)
    }
}

main().then( async () => {
    await prisma.$disconnect()
    process.exit(1)
}).catch(async (error) => {
    console.log(error)
    await prisma.$disconnect()
    process.exit(1)
})