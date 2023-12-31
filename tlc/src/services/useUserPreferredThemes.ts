import { useQuery, useMutation } from "react-query";
import { Usuario } from "../interfaces/user";
import { Themes } from "../interfaces/themes";
import { axiosInstance } from "../infrastructure/api/axios";

const fetchPreferredThemes = async (
  userId: string | undefined
): Promise<string[]> => {
  const { data } = await axiosInstance.get<Usuario>(`/user/${userId}`);
  return data.themesprefered || [];
};

const fetchBlockedThemes = async (
  userId: string | undefined
): Promise<string[]> => {
  const { data } = await axiosInstance.get<Usuario>(`/user/${userId}`);
  return data.themesblocked || [];
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
  const userPreferredThemesQuery = useQuery<string[]>(
    ["themesprefered", userId],
    () => fetchPreferredThemes(userId)
  );

  const userBlockedThemesQuery = useQuery<string[]>(
    ["themesblocked", userId],
    () => fetchBlockedThemes(userId)
  );

  const allThemesQuery = useQuery<Themes[]>("allThemes", fetchAllThemes);

  // Filtra los temas excluyendo los que el usuario ya ha preferido y los bloqueados
  const availableThemes = allThemesQuery.data?.filter(
    (theme) =>
      theme.theme &&
      !userPreferredThemesQuery.data?.includes(theme.theme) &&
      !userBlockedThemesQuery.data?.includes(theme.theme)
  );

  const noAvailableThemesMessage =
    availableThemes?.length === 0 ? "No hay más temas disponibles" : null;

  const mutation = useMutation<void, Error, string[]>((themes) =>
    updatePreferredThemes(userId, themes)
  );

  const addThemeToPreferred = async (theme: string) => {
    const updatedThemes = [...(userPreferredThemesQuery.data || []), theme];
    await updatePreferredThemes(userId, updatedThemes);
    userPreferredThemesQuery.refetch();
  };

  const removeThemeFromPreferred = async (theme: string) => {
    const updatedThemes = (userPreferredThemesQuery.data || []).filter(
      (t) => t !== theme
    );
    await updatePreferredThemes(userId, updatedThemes);
    userPreferredThemesQuery.refetch();
  };

  return {
    themesprefered: userPreferredThemesQuery.data,
    isLoading: userPreferredThemesQuery.isLoading,
    allThemes: availableThemes,
    noAvailableThemesMessage,
    isLoadingAllThemes: allThemesQuery.isLoading,
    updateThemes: mutation.mutate,
    addThemeToPreferred,
    removeThemeFromPreferred,
    errorAllThemes: allThemesQuery.error,
    isUpdating: mutation.isLoading,
    errorUpdating: mutation.error,
    refetchUserThemes: userPreferredThemesQuery.refetch,
    refetchAllThemes: allThemesQuery.refetch,
  };
};
