const baseData: Thread = {
  threadTemathic: ["crypto", "social", "child"],
  owner: "", // Dejamos el campo owner vacío para asignarlo aleatoriamente
  publishDate: new Date("2023-09-12T10:41:03.677Z"),
  description: "",
  isAdultContent: false,
  typeOfThread: "",
  bookTitle: "",
  author: "",
  isbn: "",
  editorial: "",
  numberEdition: "",
  yearEdition: "",
  threadDescription: "",
  threadImages: [],
  vynilTitle: "",
  artist: "",
  discography: "",
  gameTitle: "",
  threadItemCategory: "",
  pegy: "",
  distribuitor: "",
  comicTitle: "",
  otherTitle: "",
  content: "",
  comments: [],
  ownerResponsaCopy: "",
  qualityStatus: "",
  qualification: [],
  closedTransaction: false,
};

const threadTypes = ["isBook", "isVynil", "isGame", "isOther", "isComic"];
const owners = [
  "64ffa546752cbedcd8aa03b1",
  "64ff59afd6cf3b1e946022de",
  "64f74f9143fcb90c5f12336c",
];

const getRandomOwner = () => {
  const randomIndex = Math.floor(Math.random() * owners.length);
  return owners[randomIndex];
};

const randomImageNames = [
  "gratisography-walking-tv-free-stock-photo-800x525.jpg",
  "gratisography-happy-food-free-stock-photo-800x525.jpg",
  "gratisography-cool-colorful-door-free-stock-photo-1170x780.jpg",
  "gratisography-party-balloons-free-stock-photo-800x525.jpg",
  "gratisography-contemplating-clown-free-stock-photo-800x525.jpg",
  "gratisography-wave-crashing-free-stock-photo-800x525.jpg",
  "gratisography-extra-puffy-stock-photo-800x525.jpg",
  "gratisography-little-city-monster-free-stock-photo-800x525.jpg",
  "gratisogarphy-retro-camera-dial-free-stock-photo-800x525.jpg",
  "gratisography-colorful-boots-free-stock-photo-1164x780.jpg",
];

const generateRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * randomImageNames.length);
  return randomImageNames[randomIndex];
};

const generateSpecificData = (typeOfThread: string): Partial<Thread> => {
  const randomImages = Array.from({ length: 3 }, () => generateRandomImage());
  // Agrega una validación para asegurarte de que haya al menos una imagen
  if (randomImages.length === 0) {
    // Puedes agregar una imagen predeterminada o tomar otras medidas aquí
    randomImages.push("imagen_predeterminada.jpg");
  }

  const owner = getRandomOwner();

  switch (typeOfThread) {
    case "isBook":
      return {
        bookTitle: "Título del Libro",
        author: "Autor del Libro",
        isbn: "ISBN del Libro",
        editorial: "Editorial del Libro",
        numberEdition: "1ª Edición",
        yearEdition: "2023",
        threadDescription: "Descripción del Libro",
        threadImages: randomImages,
        owner,
      };
    case "isVynil":
      return {
        vynilTitle: "Título del Vinilo",
        artist: "Artista del Vinilo",
        discography: "Discografía del Artista",
        threadDescription: "Descripción del Vinilo",
        threadImages: randomImages,
        owner,
      };
    case "isGame":
      return {
        gameTitle: "Título del Juego",
        threadItemCategory: "Categoría del Juego",
        pegy: "PEGI 18",
        distribuitor: "Distribuidora del Juego",
        threadDescription: "Descripción del Juego",
        threadImages: randomImages,
        owner,
      };
    case "isComic":
      return {
        comicTitle: "Título del Cómic",
        threadDescription: "Descripción del Cómic",
        threadImages: randomImages,
        owner,
      };
    case "isOther":
      return {
        otherTitle: "Título del Otro Elemento",
        threadDescription: "Descripción del Otro Elemento",
        threadImages: randomImages,
        owner,
      };
    default:
      return {};
  }
};

const generateDummyData = () => {
  const dummyData: Thread[] = [];
  for (let i = 1; i <= 25; i++) {
    const typeOfThread =
      threadTypes[Math.floor(Math.random() * threadTypes.length)];
    const specificData = generateSpecificData(typeOfThread);
    const owner = getRandomOwner();
    const newData: Thread = {
      ...baseData,
      typeOfThread,
      description: `Registro de prueba ${i}`,
      owner, // Asigna un propietario aleatorio
      threadImages: specificData.threadImages, // Asigna las imágenes generadas
      ...specificData,
    };
    dummyData.push(newData);
  }
  return dummyData;
};

console.log(JSON.stringify(generateDummyData(), null, 2));

export interface Thread {
  _id?: string;
  threadTemathic?: string[];
  owner: string;
  publishDate?: Date;
  description?: string;
  isAdultContent?: boolean;
  typeOfThread: string;
  bookTitle?: string;
  author?: string;
  isbn?: string;
  editorial?: string;
  numberEdition?: string;
  yearEdition?: string;
  threadDescription?: string;
  threadImages?: string[];
  vynilTitle?: string;
  artist?: string;
  discography?: string;
  gameTitle?: string;
  threadItemCategory?: string;
  pegy?: string;
  distribuitor?: string;
  comicTitle?: string;
  otherTitle?: string;
  content?: string;
  comments?: string[];
  ownerResponsaCopy?: string;
  qualityStatus?: string;
  qualification?: { rating: number; date: Date }[];
  closedTransaction?: boolean;
}
