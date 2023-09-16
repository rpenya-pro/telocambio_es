export function returnIsTypeOf(typeOfT: string) {
  switch (typeOfT) {
    case "isOther":
      return "Otros";
    case "isBook":
      return "Libros";
    case "isVynil":
      return "Vinilo";
    case "isComic":
      return "Cómics";
    case "isDress":
      return "Wear";
    default:
      return "Tipo de artículo no reconocido.";
  }
}
