import React from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  Image,
} from "@react-pdf/renderer";
import path from "path";
import fs from "fs";

const imagePath = path.join(__dirname, "logoResults.jpeg");
const imageBuffer = fs.readFileSync(imagePath);
const imageBase64 = Buffer.from(imageBuffer).toString("base64");
const imageUrl = `data:image/jpeg;base64,${imageBase64}`;

interface ExamDetailsDTO {
  solicitedBy:string ;
  solicitedCrm: string;
  solicitedDate: Date;
  reportedBy: string;
  reportedByCrm: string;
    examName: string;
    petAge: string;
  petName: string
  petEspecie: string;
  petRace: string;
  petSex: string;
  petCod: number;
  petCustomer: string;
  result: any;
}

const PDF = ({
  examDetails,
}: {
  examDetails: ExamDetailsDTO;
}) => {
  return (
    <Document>
      <Page size="A4">
      { /* HEADER */}
      <View style={{display: 'flex', marginBottom: '8px', height: '74px'}}>
  <Image style={{ height: '100%'}} source={imageUrl} />

  </View>
  { /* HEADER END */}

  { /* EXAM DETAILS */}
  <View style={{width: '100%', alignItems: 'center'}}>
    <Text style={{fontSize: '12px', fontWeight: 'bold' }} >Resultado do exame</Text>

  <View  style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '24px' }}>
  <View style={{ display: 'flex', flexDirection: 'column', height: '120px', gap: '12px'}}>
    <Text style={{fontSize: '12px', fontWeight: 'bold'}}>Cliente:</Text>
    <Text style={{fontSize: '12px', fontWeight: 'bold'}}>Animal:</Text>
    <Text style={{fontSize: '12px', fontWeight: 'bold'}}>Data:</Text>
    <Text style={{fontSize: '12px', fontWeight: 'bold'}}>Exame:</Text>
    <Text style={{fontSize: '12px', fontWeight: 'bold'}}>Solicitante:</Text>
  </View>
    <View style={{ display: 'flex', flexDirection: 'column', height: '120px', gap: '12px', marginLeft: '18px'}}>
    <Text style={{fontSize: '12px', fontWeight: 'bold'}}>{examDetails.petCustomer}</Text>
    <Text style={{fontSize: '12px', fontWeight: 'bold', width: '100%'}}>{`${examDetails.petName}, ${examDetails.petEspecie}, ${examDetails.petRace}, ${examDetails.petAge}, ${examDetails.petSex}, Código: ${examDetails.petCod}`}</Text>
    <Text style={{fontSize: '12px', fontWeight: 'bold'}}>{new Intl.DateTimeFormat('pt-BR').format(new Date(examDetails.solicitedDate ? examDetails.solicitedDate : Date.now()))}</Text>
    <Text style={{fontSize: '12px', fontWeight: 'bold'}}>{examDetails.examName}</Text>
    <Text style={{fontSize: '12px', fontWeight: 'bold'}}>{examDetails.solicitedBy},  crmv: {examDetails.solicitedCrm}</Text>
    </View>
  </View>
  </View>
  { /* EXAM END */}


  { /* EXAM RESULT */}
    <View style={{ marginLeft: '18px', marginRight:  '18px', height: 'auto' }}>

    <Text  style={{ fontSize: '13px', fontWeight: 'semibold' }} >
           {examDetails.result}
        </Text>
    </View>
       
        
           
        

     

    
  
  { /* EXAM END */}
  <View style={{display: 'flex', width: '100%' , flexDirection: "column", marginTop: '24px'}}>
  { /* EXAM FOOTER */}


  <View style={{display: 'flex', flexDirection: 'row', marginLeft: '18px',  marginRight: '18px', alignItems: 'center', gap: '8px', marginTop: '12px', textDecoration: 'underline'}}  >
        <Text style={{fontSize: '12px', fontWeight: 'bold'}}>Assinado eletrônicamente por Laboratório: </Text>
        <Text style={{fontSize: '12px', fontWeight: 'bold'}}>{examDetails?.reportedBy} - CRMV: {examDetails?.reportedByCrm}</Text>
      </View>

  { /* EXAM end */}
  </View>
       
        
       
      </Page>
    </Document>
  );
};

export default async ({
  examDetails,
}: {
  examDetails: ExamDetailsDTO;
}) => {
  return await ReactPDF.renderToStream(
    <PDF {...{ examDetails }} /> as any
  );
};
