import { Badge } from "react-bootstrap";
import { useUserPreferredThemes } from "../../../services/useUserPreferredThemes";

interface ThemeBadgesProps {
  themes: string[] | undefined;
  isDeleting?: boolean;
  user?: string | undefined;
}

export const ThemeBadges: React.FC<ThemeBadgesProps> = ({
  themes,
  isDeleting,
  user,
}) => {
  const { removeThemeFromPreferred } = useUserPreferredThemes(user);

  const handleThemeRemoval = (theme: string) => {
    removeThemeFromPreferred(theme);
  };

  return (
    <>
      {themes &&
        themes.map((theme, index) => (
          <Badge key={index}>
            <div className="badge-content">
              {theme}{" "}
              {isDeleting ? (
                <button
                  onClick={() => handleThemeRemoval(theme)}
                  className="badge-close"
                >
                  X
                </button>
              ) : null}
            </div>
          </Badge>
        ))}
    </>
  );
};
