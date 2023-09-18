import { FC } from "react";
import { useUserPreferredThemes } from "../../../../services/useUserPreferredThemes";
import { ThemeBadges } from "../ThemeBadges";
import { Themes } from "../../../../interfaces/themes";

interface ProfilePreferedProps {
  user: string | undefined;
}

export const EditProfilePreferedThemes: FC<ProfilePreferedProps> = ({
  user,
}) => {
  const {
    themesprefered,
    isLoading,
    updateThemes,
    isUpdating,
    errorUpdating,
    allThemes,
    isLoadingAllThemes,
    errorAllThemes,
    noAvailableThemesMessage,
    addThemeToPreferred,
  } = useUserPreferredThemes(user);

  const handleUpdateThemes = (newThemes: string[]) => {
    updateThemes(newThemes);
  };

  if (isLoading) return <p>Cargando...</p>;

  const handleDoubleClick = (event: React.MouseEvent<HTMLSelectElement>) => {
    const selectElement = event.target as HTMLSelectElement;
    const selectedTheme = selectElement.value;
    if (selectedTheme) {
      addThemeToPreferred(selectedTheme);
    }
  };

  return (
    <div className="row mt-5 mb-5 edition">
      <div className="col-md-12">
        <div className="edition__preferences-title mb-4">
          <strong>Tus temas preferidos</strong>
        </div>
        <div className="row mb-1">
          <div className="col-md-12">
            <p>
              Estos son los temas que prefieres que aparezcan en tu timeline.
              Puedes eliminar o añadir los que creas convenientes.
            </p>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-6">
            <label htmlFor="selector mb-2">
              Haz doble click para añadir los temas.
            </label>
            <hr />
            <select
              onDoubleClick={handleDoubleClick}
              multiple
              className="form-control mt-4 mb-5 multiple-select"
            >
              {noAvailableThemesMessage && (
                <optgroup label="No hay más temas disponibles"></optgroup>
              )}

              {isLoadingAllThemes ? (
                <option>Cargando temas...</option>
              ) : errorAllThemes ? (
                <option>Ha ocurrido un error</option>
              ) : (
                allThemes?.map((theme: Themes, index: number) => (
                  <option key={index} value={theme.theme}>
                    {theme.nameThemeES}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="col-md-6">
            <div className="edition__preferences-content thread-item">
              <label htmlFor="selector ">
                Puedes eliminar los que ya no necesites.
              </label>
              <hr />
              <ThemeBadges
                user={user}
                themes={themesprefered}
                isDeleting={true}
              />
              {isUpdating && <p>Actualizando...</p>}
              {errorUpdating && <p>Ha ocurrido un error al actualizar.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
