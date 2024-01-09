import { useState, useEffect} from 'react'
import { Page, Text, Document, StyleSheet, PDFViewer, Image, View } from '@react-pdf/renderer';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import logo from '../../assets/logoResults.jpeg'
import { api } from '../../lib/axios';
import { useParams } from 'react-router-dom';


type AutorizationProps = {
    id: number;
    name: string;
    text: string;
}

export function AutorizationsPdf () {
    const { id } = useParams<{ id: string }>();
    const [autorization, setAutorization] = useState({} as AutorizationProps)
    async function getAutorization() {
        const response  = await api.get(`/autorizations/${id}`)
        setAutorization(response.data)
    }
    useEffect(() => {
        getAutorization()
    },[])


const Quixote = () => (
  <Document>
    <Page  >

    <Image style={{ marginTop: '4px', height: '68x'}} source={logo} />
    <View style={{ margin: '8px'}}>
    <Text style={{fontSize: '16px', fontWeight:'bold'}}>{autorization ?  autorization.name : ""}</Text>
        <Text style={{fontSize: '14px'}} >{autorization ?  autorization.text : ""}</Text>
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

