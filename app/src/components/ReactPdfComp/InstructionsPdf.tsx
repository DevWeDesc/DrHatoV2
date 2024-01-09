import { useState, useEffect} from 'react'
import { Page, Text, Document, StyleSheet, PDFViewer, Image, View } from '@react-pdf/renderer';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import logo from '../../assets/logoResults.jpeg'
import { api } from '../../lib/axios';
import { useParams } from 'react-router-dom';


type InstructionProps = {
    id: number;
    name: string;
    description: string;
}

export function InstructionsPdf () {
    const { id } = useParams<{ id: string }>();
    const [instructions, setinstructions] = useState({} as InstructionProps)
    async function getinstructions() {
        const response  = await api.get(`/instructions/${id}`)
        setinstructions(response.data)
    }
    useEffect(() => {
        getinstructions()
    },[])




const Quixote = () => (
  <Document>
    <Page  >

    <Image style={{marginTop:'4px', height: '68px'}} source={logo} />
    <View style={{margin: '8px'}}>
    <Text style={{fontSize: '16px'}}>{instructions ?  instructions.name : ""}</Text>
        <Text style={{fontSize: '14px'}}>{instructions ?  instructions.description : ""}</Text>
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

