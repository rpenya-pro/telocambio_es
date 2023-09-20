import { Badge } from "react-bootstrap";
import { useUserPreferredThemes } from "../../../services/useUserPreferredThemes";
import { useUserBlockedThemes } from "../../../services/useUserBlockedThemes";

interface ThemeBadgesProps {
  themes: string[] | undefined;
  isDeleting?: boolean;
  user?: string | undefined;
  section: string;
}

export const ThemeBadges: React.FC<ThemeBadgesProps> = ({
  themes,
  isDeleting,
  user,
  section,
}) => {
  const { removeThemeFromPreferred } = useUserPreferredThemes(user);
  const { removeThemeFromBlocked } = useUserBlockedThemes(user);

  const handleThemeRemoval = (theme: string) => {
    if (section === "preferred") {
      removeThemeFromPreferred(theme);
    } else {
      removeThemeFromBlocked(theme);
    }
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
