import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import InputMask, { ReactInputMask } from "react-input-mask";
import { PropsInputs } from "./CEPInput";

export function CPFInput({
  value,
  onChange,
  id,
  name,
  height,
  width,
}: PropsInputs) {
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
      onMouseOver={(e) => {
                  //@ts-ignore
        (e.target.style.backgroundColor = "#e6ebee"),
                    //@ts-ignore
          (e.target.style.transition = "0.3s");
      }}
      onMouseLeave={(e) => {
                  //@ts-ignore
        (e.target.style.backgroundColor = "#FFF"),
                    //@ts-ignore
          (e.target.style.transition = "0.3s"),
                    //@ts-ignore
          (e.target.style.borderColor = "#000");
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
      mask="999.999.999-99"
      value={value}
      onChange={onChange}
      placeholder="CPF do Cliente"
      id={id}
      name={name}
      width={width}
      height={height}
    />
  );
}
