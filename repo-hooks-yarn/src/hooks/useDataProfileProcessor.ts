import React from "react";
import { userService } from "../services/userService";

export const useDataProfileProcessor = () => {
  const processData = async (validatedData: {
    identUser: string;
    firstName: string;
    lastName: string;
    street: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
  }): Promise<boolean> => {
    console.log("Datos validados:", validatedData);

    // Preparamos los datos para enviar al servicio
    const updatedUser = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      address: {
        street: validatedData.street,
        postalCode: validatedData.postalCode,
        city: validatedData.city,
        state: validatedData.state,
        country: validatedData.country,
      },
      // Puedes agregar más campos si es necesario
    };

    try {
      // Usamos el método updateUser para enviar la actualización
      await userService.updateUser(validatedData.identUser, updatedUser);
      return true;
    } catch (error) {
      throw error;
    }
  };

  return { processData };
};
