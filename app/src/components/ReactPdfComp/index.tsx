import React from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import logo from '../../assets/logoPadronizada.png'


interface PdfProps {
  customerName?: string;
  title?: string;
  description?: string;
}

export function ReactPdfComponent ({customerName, description, title}: PdfProps ) {

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
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image style={{width: '200px'}} src={logo} />

        <Text>{customerName}</Text>
        <Text>{title}</Text>

        <Text>{description}</Text>
      </View>
    </Page>
  </Document>
);


  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" >
      <PDFViewer style={{width: '100%', height: '100%'}}>
      <MyDocument />
    </PDFViewer>
      </Flex>
  
    </ChakraProvider>
    
    
  )
}

