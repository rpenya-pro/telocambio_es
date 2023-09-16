import Cookies from "js-cookie";
export const findCookieKeyForArticle = (
  encodedValue: string
): string | null => {
  const allCookies = Cookies.get();
  for (const key in allCookies) {
    if (allCookies[key] === encodedValue) {
      return key;
    }
  }
  return null;
};
