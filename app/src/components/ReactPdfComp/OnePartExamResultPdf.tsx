import { useState, useEffect} from 'react'
import { Page, Text, Document, StyleSheet, PDFViewer, Image, View } from '@react-pdf/renderer';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { api } from '../../lib/axios';
import { useParams } from 'react-router-dom';
import logo from '../../assets/logoResults.jpeg'


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
		result:  {
        obs: string;
        refs: Array<{
          abs:  string;
          rel: string;
          charac: string;
        }>
    } 
  }

interface ExamRefDTO {
  id: string;
  partName: string;
  examsDetails: Array<{
    caracteristic: string;
    relativeUnit: string;
    absoluteUnit: string;
    minAgesOne: string;
    maxAgesOne: string;
    minAgesTwo: string;
    maxAgesTwo: string;

    agesOne: string;
    agesTwo: string;

  }>
}


export function OnePartExamResultPdf () {
    const { examId } = useParams<{ examId: string }>();
    const [examDetails, setExamDetails] = useState({} as ExamDetailsDTO);
    const [examCharacs, setExamCharacs] = useState<ExamRefDTO[]>([])

    async function getExamDetails() {
      try {
        const response = await api.get(`/lab/onepart/${examId}`);

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
        setExamCharacs(response.data.petExamRefs)
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getExamDetails()
    },[])



   let refByEsp:  Array<{
    refName: string;
    refMin: string;
    refMax: string;
   }>;
   switch(true) {
    case examDetails?.petEspecie === "Felina":
      refByEsp = examCharacs[0]?.examsDetails?.map((ref) => {
        let data = {
          refName: ref?.agesTwo,
          refMin: ref?.minAgesTwo,
          refMax: ref?.maxAgesTwo
        }
        return data
      })
     break; 
     case examDetails?.petEspecie === "Canina":
      refByEsp = examCharacs[0]?.examsDetails?.map((ref) => {
        let data = {
          refName:ref?.agesOne,
          refMin: ref?.minAgesOne,
          refMax: ref?.maxAgesOne
        }
        return data
      })
     break; 
     default: 
      refByEsp = examCharacs[0]?.examsDetails?.map((ref) => {
        let data = {
          refName: "@Val. Ref - Até 7 meses",
          refMin: ref?.minAgesOne,
          refMax: ref?.maxAgesOne
        }
        return data
      })
     break; 
     
   }


   console.log(refByEsp)


const Quixote = () => (
  <Document>
    <Page  style={{display: 'flex', flexDirection: 'column'}} >
      { /* HEADER */}
      <View style={{display: 'flex', marginBottom: '8px', height: '74px'}}>
  <Image  source={logo}  style={{ height: '100%'}} />

  </View>
  { /* HEADER END */}

  { /* EXAM DETAILS */}
  <View style={{width: '100%', alignItems: 'center'}}>
    <Text style={{fontSize: '12px', fontWeight: 'bold' }} >Resultado do Exame</Text>

  <View  style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '24px' }}>
  <View style={{ display: 'flex', flexDirection: 'column', height: '120px', gap: '8px'}}>
    <Text style={{fontSize: '12px', fontWeight: 'bold'}}>Cliente:</Text>
    <Text style={{fontSize: '12px', fontWeight: 'bold'}}>Animal:</Text>
    <Text style={{fontSize: '12px', fontWeight: 'bold'}}>Data:</Text>
    <Text style={{fontSize: '12px', fontWeight: 'bold'}}>Exame:</Text>
    <Text style={{fontSize: '12px', fontWeight: 'bold'}}>Solicitante:</Text>
  </View>
    <View style={{ display: 'flex', flexDirection: 'column', height: '120px', gap: '8px', marginLeft: '8px'}}>
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
  <View style={{ display: 'flex', flexDirection: 'column', width: 'auto',  borderTop: '1px', borderColor: 'gray'}} >
    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '18px', marginRight:  '18px', marginTop: '8px', gap: '12px', textAlign: 'center'}}>
      <Text style={{ fontSize: '12px', fontWeight: 'bold', width: '100px' }}>{examCharacs[0]?.partName}</Text>
      <Text style={{ fontSize: '12px', fontWeight: 'bold', width: '120px' }}>Resultados</Text>
      <Text style={{ fontSize: '12px', fontWeight: 'bold', width: '150px' }}>Unidades</Text>
        <Text style={{ fontSize: '12px', fontWeight: 'bold', width: '150px' }}>{refByEsp ? refByEsp[0]?.refName : "@Ref Padrão"}</Text>
    </View>
    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '18px', marginRight:  '18px', marginTop: '12px', gap: '12px'}}>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>Característica</Text>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', fontSize: '12px', fontWeight: 'semibold', width: '120px'}} >
              <Text>Absoluto</Text>
              <Text>Relativo</Text>
            </View>


            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', fontSize: '12px', fontWeight: 'semibold', width: '150px'}} >
            <Text style={{ fontSize: '12px', fontWeight: 'semibold',}}>Uni. Abs</Text>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold',}}>Uni. Rel</Text>
            </View>


            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', fontSize: '12px', fontWeight: 'semibold', width: '150px'}} >
            <Text style={{ fontSize: '12px', fontWeight: 'semibold'}}>Absoluto.</Text>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold'}}>Relativo.</Text>
          
            </View>
           
          
     </View>

    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '18px', marginRight:  '18px', marginTop: '12px', gap: '8px'}}>
      <View    style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '100px' }}>
        {
          examCharacs[0]?.examsDetails?.map((ref) => <Text key={ref?.caracteristic}  style={{ fontSize: '12px', fontWeight: 'semibold', }}>{ref?.caracteristic}</Text>)
        }
      </View>


      <View  style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '120px', fontSize: '12px' }}>
    
        {
          examDetails?.result?.refs.map((ref) => (
            <View key={ref.charac} style={{display: 'flex', flexDirection: 'row', width: '100%',  justifyContent: 'space-evenly', fontSize: '12px'}}> 
            <Text  style={{ fontSize: '12px', fontWeight: 'semibold' }}>{ref.abs}</Text>
             <Text  style={{ fontSize: '12px', fontWeight: 'semibold'}}>{ref.rel}</Text> 
             </View>
          ))
        }
      
      </View>
  
     <View style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '150px'}}>
     {
          refByEsp ?  refByEsp.map((ref) => (
            <View key={ref?.refMin} style={{display: 'flex', flexDirection: 'row', gap: '8px', width: '100%',justifyContent: 'space-evenly' }}>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}>{ref?.refMin.replace(/&#8804/g, '<=')}</Text>
             <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}>{ref?.refMax.replace(/&#8804/g, '<=')}</Text>
         </View>
          )) : (<h1>carregando...</h1>)
        }

     </View>
     <View    style={{display: 'flex', flexDirection: 'column', gap: '8px', width: '150px',justifyContent: 'space-between'}}>
  
        {
          examCharacs[0]?.examsDetails?.map((ref) => (
            <View key={ref?.caracteristic}  style={{display: 'flex', flexDirection: 'row', gap: '12px', width: '100%',justifyContent: 'space-evenly'
          }} >
            <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}>{ref?.minAgesOne.replace(/&#8804/g, '<=')}</Text>
            <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}>{ref?.maxAgesOne.replace(/&#8804/g, '<=')}</Text>
            </View>
          ))
        }
      
      </View>
    
   

    </View>

  </View>
  { /* EXAM END */}
  <View style={{display: 'flex', width: '100%' , flexDirection: "column", marginTop: '8px'}}>
  { /* EXAM FOOTER */}
  <View style={{display: 'flex', flexDirection: 'row', marginLeft: '18px',  marginRight: '18px', alignItems: 'center', gap: '8px', border: '2px', padding: '2px'}}  >
        <Text style={{fontSize: '12px', fontWeight: 'bold'}}>Observações:</Text>
        <Text style={{fontSize: '12px', fontWeight: 'bold'}}>{examDetails?.result?.obs}</Text>
      </View>

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

