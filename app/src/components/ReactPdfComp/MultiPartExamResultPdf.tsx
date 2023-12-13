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
		result: {
            id: number;
            report: Array<{
                name: string;
                refs: Array<{
                    abs: string;
                    rel: string;
                    charac: string;
                }>
            }>
        }
}

interface ExamRefDTO {
  codexam: number;
  name: string;
  price: number;
  partExams: Array<{
  id: number;
	codpart: number;
	oldExamsCodexam: number;
	partName: string;
	isFirst: boolean;
  examsDetails: Array<{
  id: number,
	codDetalhe: number,
	partExamsCodpart: number,
	caracteristic: string;
	relativeUnit: string;
	absoluteUnit: string;
	agesOne: string;
	minAgesOne:string;
	maxAgesOne: string;
	agesTwo: string;
	minAgesTwo:string;
	maxAgesTwo:string;
	agesThree:string;
	minAgesThree: string;
	maxAgesThree: string;
	parts: number;
  }>
  }>
}


export function MultiPartExamResultPdf () {
    const { examId } = useParams<{ examId: string }>();
    const [examDetails, setExamDetails] = useState({} as ExamDetailsDTO);
    const [examCharacs, setExamCharacs] = useState({} as ExamRefDTO)

    async function getExamDetails() {
      try {
        const response = await api.get(`/lab/multipart/${examId}`);
        setExamDetails(response.data.petExamResult);
        setExamCharacs(response.data.examRefs)
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
  <View style={{display: 'flex'}}>
  <Image style={{ width: '100%', height: '68px'}} source={logo} />

  </View>
  { /* HEADER END */}

  { /* EXAM DETAILS */}
  <View style={{width: '100%', alignItems: 'center'}}>
    <Text style={{fontSize: '12px', fontWeight: 'bold' }} >EXAME</Text>

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

    {
     examDetails?.result?.report?.map((charac, index) => {
      return (
        <View  key={charac.name} style={{ display: 'flex', flexDirection: 'column', width: 'auto',  borderTop: '1px', borderColor: 'gray' }}>
          {
            /*  Header Sub */
          }
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '18px', marginRight:  '18px', marginTop: '8px', gap: '12px'}}>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>{charac.name}</Text>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '150px' }}>Resultados</Text>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>Unidades</Text>
              <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '120px' }}>Acima de 5 Meses</Text>
          </View>
          {
            /*  Header Sub */
          }
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '18px', marginRight:  '18px', marginTop: '12px', gap: '12px'}}>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>Característica</Text>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'semibold', width: '150px'}} >
              <Text>Absoluto</Text>
              <Text>Relativo</Text>
            </View>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px',justifyContent: 'space-between' }}>Uni. abs.    Uni.rel.</Text>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '120px', justifyContent: 'space-between' }}>Absoluto.      Relativo.</Text>
          </View>

          
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '18px', marginRight:  '18px', marginTop: '12px', gap: '8px', }}>
              <View  style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100px' }}>

                {
                  charac.refs.map((charac) => 
                  <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}>{charac.charac}</Text>
                  )
                }
                 
                </View>
     
      


            <View    style={{display: 'flex', flexDirection: 'column', gap: '4px', width: '150px', fontSize: '12px' 
        }}>
                   {
                    charac.refs.map((result) => (
                      <View     style={{display: 'flex', flexDirection: 'row', width: '100%',  justifyContent: 'space-evenly',  fontSize: '12px' }}>
                      <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}  >{result.abs}</Text>
                      <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}  > {result.rel} </Text>
                      </View>
                    ))
                   }
               
            </View>
            
            <View    style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100px'}}>

                      {
                        examCharacs.partExams[index].examsDetails.map((refs) => (
                          <View style={{display: 'flex', flexDirection: 'row', gap: '8px', width: '100px',justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}>{refs.absoluteUnit}</Text>
                             <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}>{refs.relativeUnit}</Text>
                          </View>
                        ))
                      }
                  
          
            </View>
         
         
            <View style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '120px',justifyContent: 'space-between',}}>

   
                <View  style={{display: 'flex', flexDirection: 'row', gap: '12px', width: '120px',justifyContent: 'space-between',}}   >
                <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}></Text>
                <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}></Text>
                </View>
           
           </View>
          
              
      
          </View>
        </View>
      )
          
      })
    }

     

    
  
  { /* EXAM END */}
  <View style={{display: 'flex', width: '100%' , flexDirection: "column", marginTop: '8px'}}>
  { /* EXAM FOOTER */}
      <View style={{display: 'flex', flexDirection: 'row', marginLeft: '24px', alignItems: 'center', gap: '18px'}}  >
        <Text style={{fontSize: '12px', fontWeight: 'bold'}}>Observações:</Text>
        <Text style={{fontSize: '14px', fontWeight: 'bold'}}>-------- Todo --------</Text>
      </View>

      <View style={{display: 'flex', flexDirection: 'row', marginLeft: '24px', alignItems: 'center', gap: '8px', marginTop: '12px'}}  >
        <Text style={{fontSize: '14px', fontWeight: 'bold'}}>Assinado eletrônicamente por Laboratório -</Text>
        <Text style={{fontSize: '14px', fontWeight: 'bold'}}>{examDetails.reportedBy} - CRMV: {examDetails.reportedByCrm}</Text>
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

