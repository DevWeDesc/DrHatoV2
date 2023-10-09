import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Checkbox, Flex, FormControl, HStack, Select, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {useForm} from 'react-hook-form'
import { FieldValues, SubmitHandler } from "react-hook-form/dist/types";
import { toast } from "react-toastify";
import { api } from "../../../lib/axios";
import { Input } from "../../admin/Input";

interface RefIdadeProps {
  index: any;
  especie: any
}

export function NewCharacteristics() {
  const { register, handleSubmit } = useForm();
  const [especiesArray, setEspeciesArray] = useState([] as any)
  const [characName, setCharacName] = useState("")
  const [allEspeciesArray, setAllEspeciesArray] = useState([])

  useEffect(() => {
    getAllEspecies() 
  }, [])

  async function getAllEspecies() {
    const res = await api.get('/pets/especie')
    setAllEspeciesArray(res.data)
  }


  const handleNewCharacter: SubmitHandler<FieldValues> = async (values) => {
    const especie = especiesArray.flatMap((especie: any) => {
          let data = {
            name: especie,
            refIdades: [
             {
              maxAge: 0.5,
              relativo: values[`rel5${especie}`],
              absoluto: values[`abs5${especie}`],
             },
             {
              maxAge: 1,
              relativo: values[`rel10${especie}`],
              absoluto: values[`abs10${especie}`],
             },
             {
              maxAge: 2,
              relativo: values[`rel20${especie}`],
              absoluto: values[`abs20${especie}`],
             },
             
            ]
          }
          return data
        })
      
    
    try {
      if(!especie) {
        toast.error('Falha ao cadastrar nova característica')
        return 
      } else {
        const fullData = {
          name: characName,
          jsonData: especie
        }
        await api.post('examcharac', fullData)

        toast.success("Cadastro efetuado com sucesso!")
      }
    } catch (error) {
      toast.error("Falha no cadastro!")
      console.log(error)
    }
    setCharacName("")
  }

  function removeEspecie(itemToRemove: string ) {
  const indice = especiesArray.indexOf(itemToRemove);
  if (indice !== -1) {
    especiesArray.splice(indice, 1);
  }
  }
  
  useEffect(() => {
    console.log(especiesArray)
  },[especiesArray])

  const RefAges = ({especie, index}: RefIdadeProps) => {
    return (
      <Flex align="center" key={index} direction="column">
      <h1>Especie:{especie}</h1>
      <h2>referências por idade:</h2>
      <Flex align="center" w="100%" gap="2">
        <Flex  align="center" direction="column" w="100%">
        <Text fontWeight="bold" fontSize="lg">Até 5 meses</Text>
        <HStack>
        <Input  {...register(`rel5${especie}`)}  maxWidth={320} label="relativo" name={`rel5${especie}`} />
        <Input   {...register(`abs5${especie}`)} maxWidth={320} label="absoluto" name={`abs5${especie}`} />
        
        </HStack>
        </Flex>
        <Flex  align="center" direction="column" w="100%">
        <Text fontWeight="bold" fontSize="lg">Até 1 ano</Text>
        <HStack>
        <Input  {...register(`rel10${especie}`)}  maxWidth={320} label="relativo" name={`rel10${especie}`} />
        <Input   {...register(`abs10${especie}`)} maxWidth={320} label="absoluto" name={`abs10${especie}`} />
        
        </HStack>
        </Flex>
        <Flex  align="center" direction="column" w="100%">
        <Text fontWeight="bold" fontSize="lg">Até 2 anos +</Text>
        <HStack>
        <Input  {...register(`rel20${especie}`)}  maxWidth={320} label="relativo" name={`rel20${especie}`} />
        <Input   {...register(`abs20${especie}`)} maxWidth={320} label="absoluto" name={`abs20${especie}`} />
        
        </HStack>
        </Flex>
      
      </Flex>
    </Flex>
    )
  }

  return (
    <Flex w="1100px" h="800px" direction="column" overflowY="auto">
  <Accordion w="100%">
  <AccordionItem>
    <h2>
      <AccordionButton _expanded={{ bg: 'tomato', color: 'white' }}>
        <Box as="span" flex='1' textAlign='left'>
          SELECIONE AS ESPECIES QUE ESSA CARACTERISTICA FICARA DISPONIVEL.
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel>
        <Flex wrap="wrap" gap="2">
         {
          allEspeciesArray?.map((especie: {name: string, id: number;}) => <Checkbox onChange={(ev) =>
            ev.target.checked === true
              ? setEspeciesArray([...especiesArray, especie.name])
              :   removeEspecie(especie.name)
          } borderColor="black" size="lg" key={especie.id}>{especie.name}</Checkbox> )
         }
        </Flex>
    </AccordionPanel>
  </AccordionItem>
  </Accordion>
  <FormControl as='form' onSubmit={handleSubmit(handleNewCharacter)} >
  <Input value={characName} onChange={(ev) => setCharacName(ev.target.value)} mb="2" label="Nome da caractéristica" name="name" />
          {
            especiesArray?.map((especie: any, index: any) => (
              <RefAges key={index} especie={especie} index={index}/>
            ))
          }

      <Button  mt="4"  type="submit"  w="100%" colorScheme="whatsapp">Gravar</Button>    
  </FormControl>

    </Flex>
  )
}