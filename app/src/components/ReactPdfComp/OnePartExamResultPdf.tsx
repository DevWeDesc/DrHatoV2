import { useState, useEffect} from 'react'
import { Page, Text, Document, StyleSheet, PDFViewer, Image, View } from '@react-pdf/renderer';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import logo from '../../assets/logoPadronizada.png'
import { api } from '../../lib/axios';
import { useParams } from 'react-router-dom';


interface ExamDetailsDTO {
    solicitedBy:string ;
		solicitedCrm: string;
    solicitedDate: Date;

		  examName: string;
      petAge: string;
		petName: string
		petEspecie: string;
		petRace: string;
		petSex: string;
		petCod: number;
		petCustomer: string;
		result: Array< {
      abs:  string;
      rel: string;
      charac: string;
    }>
}

interface ExamRefDTO {
      id: number;
			name: string;
      especies: Array<{
        name: string;
        refIdades: Array<{
              maxAge: number;
							absoluto: string;
							relativo: string;
        }>
      }>
}


export function OnePartExamResultPdf () {
    const { examId } = useParams<{ examId: string }>();
    const [examDetails, setExamDetails] = useState({} as ExamDetailsDTO);
    const [examCharacs, setExamCharacs] = useState<ExamRefDTO[]>([])

    async function getExamDetails() {
      try {
        const response = await api.get(`/lab/onepart/${examId}`);
        setExamDetails(response.data.petExamResult);
        setExamCharacs(response.data.filteredRefIdades)
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getExamDetails()
    },[])



     const styles = StyleSheet.create({
      page: {
        flexDirection: 'row',
        backgroundColor: '#faf6f6',
    
      },
      section: {
        margin: 10,
        padding: 10,
        //@ts-ignore
        size: 'A4',
      },
      table: { 
         //@ts-ignore
        display: "table", 
        width: "auto", 
      }, 
      tableRow: { 
        width: '100%',
        margin: "auto", 
        flexDirection: "row" 
      }, 
      tableCol: { 
        width: "100%", 
        borderStyle: "solid", 
        borderWidth: 1, 
        borderLeftWidth: 0, 
        borderTopWidth: 0 
      }, 
      tableCell: { 
        margin: "4", 
        marginTop: 5, 
        fontSize: 10 
      },
      tableCellFlex: {
        display: 'flex',
        margin: "auto", 
        marginTop: 5, 
        fontSize: 10 
      }
    });

    





const Quixote = () => (
  <Document>
    <Page  style={{display: 'flex', flexDirection: 'column'}} >
      { /* HEADER */}
  <View style={{display: 'flex', gap: '8px', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
  <Image style={{ width: 180}} source={logo} />
  <View style={{display: 'flex', flexDirection: 'column', gap: '6px'}} >
      <Text style={{fontSize: '12px'}}>Baeta Neves 24h (11) 4336-7185</Text>
      <Text style={{fontSize: '12px'}}>Campestre 24h (11) 4428-1222</Text>
      <Text style={{fontSize: '12px'}}>Vila Alto de Santo André (11) 4428-1222</Text>
  </View>

  <View style={{display: 'flex', width: '80px', alignItems: 'center',  justifyContent: 'center',height: '55px',  flexDirection: 'column', flex: '1', border: '1px', borderColor: 'green', borderRadius: '999px'}} >
    <Text style={{fontSize: '14px', fontWeight: 'bold'}}>Acesse seu exame através</Text>
      <Text style={{fontSize: '14px', fontWeight: 'bold'}}>do nosso site drhato.com.br</Text>
  </View>
  </View>
  { /* HEADER END */}

  { /* EXAM DETAILS */}
  <View style={{width: '100%', alignItems: 'center'}}>
    <Text>EXAME</Text>

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
  <View  style={{ display: 'flex', flexDirection: 'column', width: '100%', borderTop: '1px', borderColor: 'gray' }}>
    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '18px', marginRight:  '18px', marginTop: '22px', gap: '8px'}}>
      <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>{examDetails.examName}</Text>
      <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '155px' }}>Resultados</Text>
      <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>Unidades</Text>
        <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>Acima de 5 Meses</Text>
    </View>
    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '18px', marginRight:  '18px', marginTop: '22px', gap: '8px'}}>
      <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>Característica</Text>
      <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '155px' }}>Absoluto   Relativo</Text>
      <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>Uni. abs.    Uni.rel.</Text>
      <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '120px' }}>Absoluto.      Relativo.</Text>
        

    </View>

    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', marginLeft: '18px', marginRight:  '18px', marginTop: '22px', gap: '8px'}}>
      <View    style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
      {
        examDetails?.result?.map((charac) =>  
        <Text key={charac.charac} style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>{charac.charac}</Text>)
      }
      </View>
      <View    style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
      {
        examDetails?.result?.map((charac) =>  (<View key={charac.charac} style={{display: 'flex', flexDirection: 'row', gap: '12px'}}> <Text key={charac.charac} style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>{charac.abs}</Text>
         <Text  style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>{charac.rel}</Text> </View>) )
      }
      </View>
  
     <View style={{display: 'flex', flexDirection: 'row', gap: '12px', width: '100px',}}>
     <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}>-</Text>
     <Text style={{ fontSize: '12px', fontWeight: 'semibold' }}>-</Text>
     </View>
     <View    style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
      {
        examCharacs.map((ref) =>  (<View  key={ref.name} style={{display: 'flex', flexDirection: 'row', gap: '12px'}} >
          <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>{ref?.especies[0]?.refIdades[0]?.absoluto}</Text>
          <Text style={{ fontSize: '12px', fontWeight: 'semibold', width: '100px' }}>{ref?.especies[0]?.refIdades[0]?.relativo}</Text>
          </View>))
      }
      </View>
    
        

    </View>

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

