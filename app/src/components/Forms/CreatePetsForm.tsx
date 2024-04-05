import {
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Button,
  VStack,
  Select,
  HStack,
  RadioGroup,
  Radio,
  Checkbox,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { QueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";
import { Input } from "../admin/Input";
import { WeightPetInput } from "../InputMasks/WeightPetInput";



export function CreatePetsForm() {
  const { register, handleSubmit } = useForm();
  const { id } = useParams<{ id: string }>();
  const [especieState, setEspecie] = useState("");
  const [raceState, setRace] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<string | number>("");
  const [selectSex, setSelectedSex] = useState("");
  const years = Array.from({ length: 21 }, (_, i) => i);
  const months = Array.from({ length: 13 }, (_, i) => i);


  const handleYearChange = (e: any) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e: any) => {
    setSelectedMonth(e.target.value);
  };

 


  return (
    <ChakraProvider>
      
    </ChakraProvider>
  );
}
