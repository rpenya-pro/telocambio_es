import React from "react";
import { useService } from "../services";

export const useDataProfileProcessor = () => {
  const { updateUser } = useService(); // Usamos el hook dentro de esta función

  const processData = async (validatedData: {
    identUser: string;
    firstName: string;
    lastName: string;
    address: {
      street: string;
      postalCode: string;
      city: string;
      state: string;
      country: string;
    };
  }): Promise<boolean> => {
    // Preparamos los datos para enviar al servicio
    const updatedUser = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      address: {
        street: validatedData.address.street,
        postalCode: validatedData.address.postalCode,
        city: validatedData.address.city,
        state: validatedData.address.state,
        country: validatedData.address.country,
      },
      // Puedes agregar más campos si es necesario
    };

    try {
      await updateUser(validatedData.identUser, updatedUser);
      return true;
    } catch (error) {
      throw error;
    }
  };

  return { processData };
};
