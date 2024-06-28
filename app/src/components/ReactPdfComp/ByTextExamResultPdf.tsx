import { useState, useEffect} from 'react'
import { Page, Text, Document, StyleSheet, PDFViewer, Image, View } from '@react-pdf/renderer';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import logo from '../../assets/logoResults.jpeg'
import { api } from '../../lib/axios';
import { useParams } from 'react-router-dom';
import _ from 'lodash';


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



export function ByTextExamResultPdf () {
    const { examId } = useParams<{ examId: string }>();
    const [examDetails, setExamDetails] = useState({} as ExamDetailsDTO);

    async function getExamDetails() {
      try {
        const response = await api.get(`/lab/bytext/${examId}`);
        
        if(response.data.petExamResult.resultPDF.length > 0){      
          const pdfs = response.data.petExamResult.resultPDF[0].externalReportIds;
          const result = await Promise.all(pdfs.map(async (pdf: string) => {
            const response = await api.get(`/lab/reportInserted/${pdf}`, { responseType: 'arraybuffer' });
            console.log(response.data, 'response')
            return response.data;
          }))
          
          result.forEach((pdfData) => {
            const blob = new Blob([pdfData], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
          });
        }

        setExamDetails(response.data.petExamResult);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getExamDetails()
    },[])

    

const Quixote = () => (
  <Document>
    <Page  style={{display: 'flex', flexDirection: 'column'}} >
      { /* HEADER */}
      <View style={{display: 'flex', marginBottom: '8px', height: '74px'}}>
  <Image style={{ height: '100%'}} source={logo} />

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


  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" >
    
      <PDFViewer style={{width: '100%', height: '100%'}}>
      
      <Quixote />
      
    </PDFViewer>
      </Flex>
  
    </ChakraProvider>
    
    
  )
}

