import { Badge } from "react-bootstrap";

interface ThemeBadgesProps {
  themes: string[] | undefined;
}

export const ThemeBadges: React.FC<ThemeBadgesProps> = ({ themes }) => {
  return (
    <>
      {themes &&
        themes.map((theme, index) => <Badge key={index}>{theme}</Badge>)}
    </>
  );
};
