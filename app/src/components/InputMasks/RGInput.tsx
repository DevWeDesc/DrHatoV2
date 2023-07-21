import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import InputMask, { Props } from "react-input-mask";
import { string } from "yup";
import { PropsInputs } from "./CEPInput";

export function RGInput({ value, onChange, name, id }: PropsInputs) {
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
      }}
      mask="99.999.999-9"
      value={value}
      onChange={onChange}
      placeholder="RG do Cliente"
      name={name}
      id={id}
    />
  );
}
