import { Page, Text, View, Document, StyleSheet, PDFViewer} from '@react-pdf/renderer';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../lib/axios';
import { CharacProps, ExamDetailsProps } from './examsDetails';


interface PdfProps {
  customerName?: string;
  title?: string;
  description?: string;
}

export function ExamsResultPdfView ({customerName, description, title}: PdfProps ) {
    const { examId } = useParams<{ examId: string }>();
    const [examDetails, setExamDetails] = useState({} as ExamDetailsProps);
    const [examCharacs, setExamCharacs] = useState({} as CharacProps)
    const navigate = useNavigate();
  
    async function getExamDetails() {
      try {
        const response = await api.get(`/labexam/${examId}`);
        setExamDetails(response.data.examDetails);
        setExamCharacs(response.data.examRefs)
      } catch (error) {
        console.log(error);
      }
    }
  
    useEffect(() => {
      getExamDetails();
    }, []);

    const tableRefs:any = examCharacs?.characteristics ?  examCharacs?.characteristics.map((charac) => {
        return charac?.especie.find((data: any) => data.name === examDetails?.medicine?.pet?.especie)
       }) : null

  // Create styles
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

let viewPdf;
switch(true) {
    case examDetails?.isOnePart === true: 
    viewPdf = (
<Document>
    <Page style={{width: '100%'}} >
      <View style={styles.table}> 
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{examDetails.medicine.pet.name}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Resultado</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Unidades</Text> 
          </View> 
         
         
          {
          tableRefs[0]?.refIdades?.map((ref: any) => ( <View style={styles.tableCol}> <Text style={styles.tableCell}>{`@VAL. REF ${tableRefs[0]?.name ? tableRefs[0]?.name : ""} ${ref.maxAge ? ref.maxAge: "1"}`}</Text> </View> ))
          }
    
         
        </View>
        <View style={styles.tableRow}> 
        <View style={styles.tableCol}> 
        {examCharacs.characteristics?.map((charac, index) => (
        <Text style={styles.tableCell}>{charac.name}</Text> 
                             
        ))}
             </View>        
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>3 User </Text> 
          </View> 
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>5€</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>5€</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>5€</Text> 
          </View> 
        </View> 
      </View>
    </Page>
  </Document>
    )
}




  return (
    <ChakraProvider>
      <Flex width="100vw" height="100vh" >
    
      <PDFViewer style={{width: '100%', height: '100%'}}>
            { viewPdf}
      
    </PDFViewer>
      </Flex>
  
    </ChakraProvider>
    
    
  )
}

