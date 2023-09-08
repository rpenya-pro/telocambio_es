import axios from "axios";

const BASE_URL = `http://localhost:9000`; // URL del endpoint

export const userService = {
  async getUserById(id: any) {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener el usuario.");
    }
  },

  async updateUser(
    id: string,
    user: {
      firstName: string;
      lastName: string;
      address: {
        street: string;
        postalCode: string;
        city: string;
        state: string;
        country: string;
      };
    }
  ) {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, user);
      return response.data;
    } catch (error) {
      throw new Error("Error al actualizar el usuario.");
    }
  },

  async deleteUser(id: any) {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error al eliminar el usuario.");
    }
  },
};
