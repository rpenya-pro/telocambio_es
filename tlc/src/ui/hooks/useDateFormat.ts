import { useState } from "react";

type FormatType = "fullDate" | "customDate" | "time" | "shortDate";

const useDateFormat = () => {
  const [locale, setLocale] = useState<string>("es-ES"); // Cambia esto para establecer el idioma deseado

  const formatDate = (
    publishDate: Date | string,
    formatType: FormatType
  ): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };

    switch (formatType) {
      case "fullDate":
        return new Date(publishDate).toLocaleDateString(locale, options);
      case "customDate": {
        const date = new Date(publishDate);
        const day = date.getDate();
        const month = date.toLocaleDateString(locale, { month: "long" });
        const year = date.getFullYear();
        return `${day} de ${month} de ${year}`;
      }
      case "shortDate": {
        const date = new Date(publishDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 porque los meses en JavaScript van de 0 (enero) a 11 (diciembre)
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
      case "time":
        return new Date(publishDate).toLocaleTimeString(locale, timeOptions);
      default:
        return "";
    }
  };

  return { formatDate };
};

export default useDateFormat;
