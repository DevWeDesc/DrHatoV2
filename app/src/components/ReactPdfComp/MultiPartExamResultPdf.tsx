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
      id: number;
	    name: string;
      characteristics: Array<{
        id: number;
        name: string;
        refs: Array<{
            name: string;
            refIdades: Array<{
                maxAge: number;
				absoluto: string;
				relativo: string;
            }>
        }>
      }>
}


export function MultiPartExamResultPdf () {
    const { examId } = useParams<{ examId: string }>();
    const [examDetails, setExamDetails] = useState({} as ExamDetailsDTO);
    const [examCharacs, setExamCharacs] = useState<ExamRefDTO[]>([])

    async function getExamDetails() {
      try {
        const response = await api.get(`/lab/multipart/${examId}`);
        setExamDetails(response.data.petExamResult);
        setExamCharacs(response.data.filteredRefIdades)
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
  <View style={{display: 'flex', marginBottom: '8px'}}>
  <Image style={{ width: '100%', height: '68px'}} source={logo} />

  </View>
  { /* HEADER END */}

  { /* EXAM DETAILS */}
  <View style={{width: '100%', alignItems: 'center'}}>
    <Text style={{fontSize: '14px', fontWeight: 'bold' }} >EXAME</Text>

  <View  style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '24px' }}>
  <View style={{ display: 'flex', flexDirection: 'column', height: '150px', gap: '12px'}}>
    <Text style={{fontSize: '14px', fontWeight: 'bold'}}>Cliente:</Text>
    <Text style={{fontSize: '14px', fontWeight: 'bold'}}>Animal:</Text>
    <Text style={{fontSize: '14px', fontWeight: 'bold'}}>Data:</Text>
    <Text style={{fontSize: '14px', fontWeight: 'bold'}}>Exame:</Text>
    <Text style={{fontSize: '14px', fontWeight: 'bold'}}>Solicitante:</Text>
  </View>
    <View style={{ display: 'flex', flexDirection: 'column', height: '150px', gap: '12px', marginLeft: '18px'}}>
    <Text style={{fontSize: '14px', fontWeight: 'bold'}}>{examDetails.petCustomer}</Text>
    <Text style={{fontSize: '14px', fontWeight: 'bold', width: '100%'}}>{`${examDetails.petName}, ${examDetails.petEspecie}, ${examDetails.petRace}, ${examDetails.petAge}, ${examDetails.petSex}, Código: ${examDetails.petCod}`}</Text>
    <Text style={{fontSize: '14px', fontWeight: 'bold'}}>{new Intl.DateTimeFormat('pt-BR').format(new Date(examDetails.solicitedDate ? examDetails.solicitedDate : Date.now()))}</Text>
    <Text style={{fontSize: '14px', fontWeight: 'bold'}}>{examDetails.examName}</Text>
    <Text style={{fontSize: '14px', fontWeight: 'bold'}}>{examDetails.solicitedBy},  crmv: {examDetails.solicitedCrm}</Text>
    </View>
  </View>
  </View>
  { /* EXAM END */}


  { /* EXAM RESULT */}

    {
     examDetails?.result?.report?.map((charac, index) => {
      return (
        <View  key={charac.name} style={{ display: 'flex', flexDirection: 'column', width: '100%', borderTop: '1px', borderColor: 'gray' }}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '18px', marginRight:  '18px', marginTop: '22px', gap: '8px'}}>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>{charac.name}</Text>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '155px' }}>Resultados</Text>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>Unidades</Text>
              <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>Acima de 5 Meses</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '18px', marginRight:  '18px', marginTop: '22px', gap: '8px'}}>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>Característica</Text>
            <View style={{display: 'flex', flexDirection: 'row', padding: '2px', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'semibold', width: '125px'}} >
              <Text>Absoluto</Text>
              <Text>Relativo</Text>
            </View>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px', padding: '2px',justifyContent: 'space-between' }}>Uni. abs.    Uni.rel.</Text>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '120px' }}>Absoluto.      Relativo.</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '18px', marginRight:  '18px', marginTop: '22px', gap: '8px', }}>
            <View    style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            
            
            {examCharacs[index].characteristics.map((ref) => (
                  <View key={ref.name} style={{ display: 'flex', flexDirection: 'row', gap: '12px', width: '100px', padding: '2px' }}>
                  <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}>{ref.name}</Text>
               
                </View>
            ))}
            </View>


            <View    style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          
                  {
                      charac.refs.map((ref) => (
                          <View  key={ref.charac}   style={{display: 'flex', flexDirection: 'row', width: '125px',padding: '2px',justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}  >{ref.abs}</Text>
                          <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}  >  {ref.rel}</Text>
                          </View>
                      ))
                  }
      
            </View>
        
           <View style={{display: 'flex', flexDirection: 'row', gap: '12px', width: '100px', padding: '2px',justifyContent: 'space-between' }}>
           <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}>-</Text>
                          <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}>%</Text>
           </View>
        
            <View style={{display: 'flex', flexDirection: 'column', gap: '12px', width: '100px',  padding: '2px',justifyContent: 'space-between',}}>
            {examCharacs[index].characteristics.map((ref) => {
              return ref.refs.map((ref) => (
                <View  style={{display: 'flex', flexDirection: 'row', gap: '12px', width: '100px',  padding: '2px',justifyContent: 'space-between',}}   >
                <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}>{ref.refIdades[0].absoluto}</Text>
                <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}>{ref.refIdades[0].relativo}</Text>
                </View>
              ))
            })}
           </View>
          
              
      
          </View>
        </View>
      )
          
      })
    }

     

    
  
  { /* EXAM END */}
  <View style={{display: 'flex', width: '100%' , flexDirection: "column", marginTop: '24px'}}>
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

