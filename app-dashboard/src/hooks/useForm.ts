import { useState } from "react";
import { UserDocument, UserBase } from "../interfaces/usuario";

type Errors<T> = Partial<Record<keyof T, string>>;

type OnValidSubmit<T> = (validatedData: {
  identUser: string;
  firstName: string;
  lastName: string;
  street: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
}) => Promise<boolean>;

const useForm = <T extends UserBase>(
  initialState: T,
  onValidSubmit: OnValidSubmit<T>,
  identUser
) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [formProcessed, setFormProcessed] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValid = () => {
    const errs = validateForm();
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isValid()) {
      const validatedData = {
        identUser: identUser,
        firstName: values.firstName,
        lastName: values.lastName,
        street: values.address?.street || "",
        postalCode: values.address?.postalCode || "",
        city: values.address?.city || "",
        state: values.address?.state || "",
        country: values.address?.country || "",
      };
      onValidSubmit(validatedData)
        .then((processed) => {
          if (processed) {
            setFormProcessed(true);
          }
        })
        .catch((error) => {
          console.error("Hubo un error al procesar los datos:", error);
        });
    }
  };

  const validateForm = () => {
    let errs: Errors<T> = {};

    if (!values.firstName || values.firstName.length < 2) {
      errs.firstName = "El nombre debe tener al menos 2 caracteres";
    }

    if (!values.lastName || values.lastName.length < 2) {
      errs.lastName = "Los apellidos deben tener al menos 2 caracteres";
    }

    return errs;
  };

  return { handleChange, handleSubmit, values, errors, formProcessed };
};

export default useForm;
