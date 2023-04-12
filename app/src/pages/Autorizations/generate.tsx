import {
    Box,
    ChakraProvider,
    Flex,
    Button,
  } from '@chakra-ui/react'
  import { Header } from '../../components/admin/Header'
  import { GenericLink } from '../../components/Sidebars/GenericLink'
  import { GenericSidebar } from '../../components/Sidebars/GenericSideBar'
  import { BsArrowLeft} from "react-icons/all"
  import { AdminContainer } from '../AdminDashboard/style'
  import { useContext, useState} from 'react'
import { DbContext } from '../../contexts/DbContext'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
  export function GeneratePdf() {
    const  { autorization, generateAut, setGenerateAut } = useContext(DbContext)
    const [value, setValue] = useState("")
    const autorizations = "Declaro que foi esclarecido ao ora subscritor que o paciente acima descrito não obteve alta médica e que há recomendação para manter o animal em internação em estabelecimento médico veterinário apropriado. Declaro ainda que estou ciente de que há riscos de agravamento da doença, inclusive morte, e que, por motivos pessoais, assumo inteira responsabilidade por esse ato. Observações de interesse a serem fornecidas pelo(a) tutor(a)/proprietário(a) /responsável"
    
    pdfMake.addVirtualFileSystem(pdfFonts);
    const docDefinition: TDocumentDefinitions = {
        content: [
            'First paragraph',
            autorizations,
        ],
    };
    const handleGeneratePDF =  () => {
     pdfMake.createPdf(docDefinition).open()
    }
  
    
    return (
        <ChakraProvider>
        <AdminContainer>
          <Flex direction="column" h="100vh">
            <Header title="Gerar PDF" />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
            <GenericSidebar>
            <GenericLink icon={BsArrowLeft}  name='Voltar' path="/Home"/>
            </GenericSidebar>
              <Box flex="1" borderRadius={8} bg="gray.200" p="8">
                <Flex mb="8" gap="8" direction="column" align="center">

        
                  <Flex  textAlign="center" justify="center">
                   <Button onClick={() => handleGeneratePDF()} >IMPRIMIR PDF</Button>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </AdminContainer>
      </ChakraProvider>
    )
  }