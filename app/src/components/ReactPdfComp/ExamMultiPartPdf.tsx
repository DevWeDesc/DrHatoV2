import { useState, useEffect} from 'react'
import { Page, Text, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import logo from '../../assets/logoPadronizada.png'
import { api } from '../../lib/axios';
import { useParams } from 'react-router-dom';


type AutorizationProps = {
    id: number;
    name: string;
    text: string;
}

export function ExamMultiPartPdf () {
    const { id } = useParams<{ id: string }>();
    const [autorization, setAutorization] = useState({} as AutorizationProps)
    async function getAutorization() {
        const response  = await api.get(`/autorizations/${id}`)
        setAutorization(response.data)
    }
    useEffect(() => {
        getAutorization()
    },[])


  // Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#faf6f6',

  },
  section: {
    margin: 10,
    padding: 10,
    size: 'A4',
  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol: { 
    width: "25%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 10 
  }
});


const Quixote = () => (
  <Document>
    <Page  >

    <Image style={{ width: 150}} source={logo} />
    <Text>{autorization ?  autorization.name : ""}</Text>
        <Text>{autorization ?  autorization.text : ""}</Text>
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

