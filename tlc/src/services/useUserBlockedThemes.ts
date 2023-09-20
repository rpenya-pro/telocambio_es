import { useQuery, useMutation } from "react-query";
import { Usuario } from "../interfaces/user";
import { Themes } from "../interfaces/themes";
import { axiosInstance } from "../infrastructure/api/axios";

const fetchBlockedThemes = async (
  userId: string | undefined
): Promise<string[]> => {
  const { data } = await axiosInstance.get<Usuario>(`/user/${userId}`);
  return data.themesblocked || [];
};

const fetchPreferredThemes = async (
  userId: string | undefined
): Promise<string[]> => {
  const { data } = await axiosInstance.get<Usuario>(`/user/${userId}`);
  return data.themesprefered || [];
};

const fetchAllThemes = async (): Promise<Themes[]> => {
  const { data } = await axiosInstance.get<Themes[]>(`/theme/all`);
  return data;
};

const updateBlockedThemes = async (
  userId: string | undefined,
  themes: string[]
): Promise<any> => {
  const res = await axiosInstance.put(`/user/${userId}`, {
    themesblocked: themes,
  });
  return res.data;
};

export const useUserBlockedThemes = (userId: string | undefined) => {
  const userThemesQuery = useQuery<string[]>(["themesblocked", userId], () =>
    fetchBlockedThemes(userId)
  );

  const preferredThemesQuery = useQuery<string[]>(
    ["themesprefered", userId],
    () => fetchPreferredThemes(userId)
  );

  const allThemesQuery = useQuery<Themes[]>("allThemes", fetchAllThemes);

  // Filtra los temas basándose en lo que el usuario ya ha bloqueado y prefiere
  const availableThemes = allThemesQuery.data?.filter(
    (theme) =>
      theme.theme &&
      !userThemesQuery.data?.includes(theme.theme) &&
      !preferredThemesQuery.data?.includes(theme.theme)
  );

  const noAvailableThemesMessage =
    availableThemes?.length === 0 ? "No hay más temas disponibles" : null;

  const mutation = useMutation<void, Error, string[]>((themes) =>
    updateBlockedThemes(userId, themes)
  );

  const addThemeToBlocked = async (theme: string) => {
    const updatedThemes = [...(userThemesQuery.data || []), theme];
    await updateBlockedThemes(userId, updatedThemes);
    userThemesQuery.refetch();
  };

  const removeThemeFromBlocked = async (theme: string) => {
    const updatedThemes = (userThemesQuery.data || []).filter(
      (t) => t !== theme
    );
    await updateBlockedThemes(userId, updatedThemes);
    userThemesQuery.refetch();
  };

  return {
    themesblocked: userThemesQuery.data,
    isLoading: userThemesQuery.isLoading,
    allThemes: availableThemes,
    noAvailableThemesMessage,
    isLoadingAllThemes: allThemesQuery.isLoading,
    updateThemes: mutation.mutate,
    addThemeToBlocked,
    removeThemeFromBlocked,
    errorAllThemes: allThemesQuery.error,
    isUpdating: mutation.isLoading,
    errorUpdating: mutation.error,
    refetchUserThemes: userThemesQuery.refetch,
    refetchAllThemes: allThemesQuery.refetch,
  };
};
