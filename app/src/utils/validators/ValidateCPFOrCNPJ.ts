import { ValidateCNPJ } from "./ValidateCNPJ";
import { ValidateCPF } from "./ValidateCPF";

export const ValidateCPFOrCNPJ = (value: string) => {
  value = value.replace(/\D/g, "");

  if (value.length === 11) {
    return ValidateCPF(value);
  } else if (value.length === 14) {
    return ValidateCNPJ(value);
  } else {
    return false;
  }
};
