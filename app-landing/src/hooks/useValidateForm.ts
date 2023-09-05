import { useState, useEffect } from "react";
import { UserDocument } from "../interfaces/usuario"; // Asegúrate de que la ruta sea la correcta

interface RegisterFields extends Partial<UserDocument> {
  repeat?: string; // Campo para repetir la contraseña
}

const useValidateForm = (
  initialState: RegisterFields,
  isCheckboxChecked: boolean
) => {
  const [values, setValues] = useState<RegisterFields>(initialState);
  const [errors, setErrors] = useState<Partial<RegisterFields>>({});
  const [isValid, setIsValid] = useState(false);

  const validate = () => {
    let tempErrors: Partial<RegisterFields> = {};

    // Validación del email
    if (
      values.email &&
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(values.email)
    ) {
      tempErrors = { ...tempErrors, email: "El email no es válido" };
    }

    // Validación de la contraseña
    if (values.password && values.password.length <= 4) {
      tempErrors = {
        ...tempErrors,
        password: "La contraseña debe tener más de 4 caracteres",
      };
    }

    // Validación de la repetición de la contraseña
    if (values.repeat !== values.password) {
      tempErrors = { ...tempErrors, repeat: "Las contraseñas no coinciden" };
    }

    // Verifica si todos los campos están llenos y el checkbox está marcado
    setIsValid(
      Object.keys(tempErrors).length === 0 &&
        isCheckboxChecked &&
        values.email !== "" &&
        values.password !== "" &&
        values.repeat !== ""
    );

    setErrors(tempErrors);
  };

  const handleChange = (name: keyof RegisterFields, value: string) => {
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    validate();
  }, [values, isCheckboxChecked]); // Añadido isCheckboxChecked aquí

  return {
    values,
    errors,
    isValid,
    handleChange,
  };
};

export default useValidateForm;
