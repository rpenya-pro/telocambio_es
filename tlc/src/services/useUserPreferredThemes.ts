import { useQuery, useMutation } from "react-query";
import { Usuario } from "../interfaces/user";
import { Themes } from "../interfaces/themes";
import { axiosInstance } from "../infrastructure/api/axios"; // Importamos la instancia que has creado

const fetchPreferredThemes = async (
  userId: string | undefined
): Promise<string[]> => {
  const { data } = await axiosInstance.get<Usuario>(`/user/${userId}`); // Usamos la instancia y no necesitamos el URL base
  return data.themesprefered || [];
};

const fetchAllThemes = async (): Promise<Themes[]> => {
  const { data } = await axiosInstance.get<Themes[]>(`/theme/all`);
  return data;
};

const updatePreferredThemes = async (
  userId: string | undefined,
  themes: string[]
): Promise<any> => {
  const res = await axiosInstance.put(`/user/${userId}`, {
    themesprefered: themes,
  });
  return res.data;
};

export const useUserPreferredThemes = (userId: string | undefined) => {
  const userThemesQuery = useQuery<string[]>(["themesprefered", userId], () =>
    fetchPreferredThemes(userId)
  );

  const allThemesQuery = useQuery<Themes[]>("allThemes", fetchAllThemes);

  // Filtra los temas basándose en lo que el usuario ya ha preferido
  const availableThemes = allThemesQuery.data?.filter(
    (theme) => theme.theme && !userThemesQuery.data?.includes(theme.theme)
  );

  const noAvailableThemesMessage =
    availableThemes?.length === 0 ? "No hay más temas disponibles" : null;

  const mutation = useMutation<void, Error, string[]>((themes) =>
    updatePreferredThemes(userId, themes)
  );

  // Añade la función para agregar un tema a los temas preferidos
  const addThemeToPreferred = async (theme: string) => {
    const updatedThemes = [...(userThemesQuery.data || []), theme];
    await updatePreferredThemes(userId, updatedThemes);
    userThemesQuery.refetch();
  };

  // Añade la función para eliminar un tema de los temas preferidos
  const removeThemeFromPreferred = async (theme: string) => {
    const updatedThemes = (userThemesQuery.data || []).filter(
      (t) => t !== theme
    );
    await updatePreferredThemes(userId, updatedThemes);
    userThemesQuery.refetch();
  };

  return {
    themesprefered: userThemesQuery.data,
    isLoading: userThemesQuery.isLoading,
    allThemes: availableThemes,
    noAvailableThemesMessage,
    isLoadingAllThemes: allThemesQuery.isLoading,
    updateThemes: mutation.mutate,
    addThemeToPreferred,
    removeThemeFromPreferred,
    errorAllThemes: allThemesQuery.error,
    isUpdating: mutation.isLoading,
    errorUpdating: mutation.error,
    refetchUserThemes: userThemesQuery.refetch,
    refetchAllThemes: allThemesQuery.refetch,
  };
};
