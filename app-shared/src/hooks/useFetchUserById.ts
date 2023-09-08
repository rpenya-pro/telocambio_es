import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Usuario } from "../interfaces";

interface FetchUserResponse {
  user: Usuario | null;
  loading: boolean;
  error: string | null;
}

export const useFetchUserById = (id: string): FetchUserResponse => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse<Usuario> = await axios.get(
          `http://localhost:3000/user/${id}`
        );
        setUser(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  return { user, loading, error };
};
