import { useState, useEffect} from 'react'
import { Page, Text, Document, StyleSheet, PDFViewer, Image, View } from '@react-pdf/renderer';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import logo from '../../assets/logoPadronizada.png'
import { api } from '../../lib/axios';
import { useParams } from 'react-router-dom';
import { CharacProps, ExamDetailsProps } from '../../pages/Vets/WorkSpaceVets/examsDetails';


export function OnePartExamResultPdf () {
    const { examId } = useParams<{ examId: string }>();
    const [examDetails, setExamDetails] = useState({} as ExamDetailsProps);
    const [examCharacs, setExamCharacs] = useState({} as CharacProps)

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
    <Page  >

    <Image style={{ width: 150}} source={logo} />
      <View style={styles.table}> 
       { /* COLUNA INFOS */}
      <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{examDetails?.name}</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Resultado</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Unidades</Text> 
          </View> 
      
        </View>
        { /* COLUNA INFO VALUES */}
        <View style={styles.tableRow}> 
        <View style={styles.tableCol}> 
        {examCharacs.characteristics?.map((charac, index) => (
        <Text style={styles.tableCell}>{charac.name}</Text> 
                             
        ))}
             </View>   
          <View style={styles.tableCol}> 
          {
            examDetails?.reportExams[0]?.report?.map((ref: any) => (
              <>
              <Text >{ref?.abs}</Text> 
              <Text style={styles.tableCell}>{ref?.rel}</Text> 
              </>
              
            ))
          }
            <Text style={styles.tableCell}>Type</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Period</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>Price</Text> 
          </View> 
        </View>
        <View style={styles.tableRow}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>React-PDF</Text> 
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

