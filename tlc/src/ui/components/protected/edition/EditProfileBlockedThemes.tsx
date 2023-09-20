import { FC } from "react";

import { ThemeBadges } from "../ThemeBadges";
import { Themes } from "../../../../interfaces/themes";
import { useUserBlockedThemes } from "../../../../services/useUserBlockedThemes";

interface ProfileBlockedProps {
  user: string | undefined;
}

export const EditProfileBlockedThemes: FC<ProfileBlockedProps> = ({ user }) => {
  const {
    themesblocked,
    isLoading,
    isUpdating,
    errorUpdating,
    allThemes,
    isLoadingAllThemes,
    errorAllThemes,
    noAvailableThemesMessage,
    addThemeToBlocked,
  } = useUserBlockedThemes(user);

  if (isLoading) return <p>Cargando...</p>;

  const handleDoubleClick = (event: React.MouseEvent<HTMLSelectElement>) => {
    const selectElement = event.target as HTMLSelectElement;
    const selectedTheme = selectElement.value;
    if (selectedTheme) {
      addThemeToBlocked(selectedTheme);
    }
  };

  return (
    <div className="row  edition">
      <div className="col-md-12">
        <div className="edition__preferences-title mb-4">
          <strong>Tus temas Bloqueados</strong>
        </div>
        <div className="row mb-1">
          <div className="col-md-12">
            <p>
              Estos son los temas que prefieres que aparezcan en tu timeline.
              Para bloquear un tema, debes eliminarlo de tus temas preferidos.
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
                section="blocked"
                user={user}
                themes={themesblocked}
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
