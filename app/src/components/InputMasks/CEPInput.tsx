import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import InputMask from "react-input-mask";
import { string } from "yup";

export interface PropsInputs {
  value: string;
  onChange: any;
  onBlur: any;
  id: string;
  name: string;
}

export function CEPInput({ value, onChange, onBlur, id, name }: PropsInputs) {
  return (
    <InputMask
      style={{
        width: "100%",
        height: "40px",
        border: "1px solid black",
        borderRadius: "5px",
        paddingLeft: "15px",
        transition: "border-color 0.3s ease",
      }}
      onFocus={(e) => {
        (e.target.style.backgroundColor = "#F7FAFC"),
          (e.target.style.transition = "0.3s"),
          (e.target.style.borderColor = "#68D391");
      }}
      onBlur={(e) => {
        (e.target.style.backgroundColor = "white"),
          (e.target.style.borderColor = "black");
        onBlur();
      }}
      mask="99999-999"
      value={value}
      onChange={onChange}
      placeholder="CEP do Cliente"
      id={id}
      name={name}
    />
  );
}
