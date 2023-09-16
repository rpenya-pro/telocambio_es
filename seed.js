"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var baseData = {
    threadTemathic: ["crypto", "social", "child"],
    owner: "",
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
    closedTransaction: false
};
var threadTypes = ["isBook", "isVynil", "isGame", "isOther", "isComic"];
var owners = [
    "64ffa546752cbedcd8aa03b1",
    "64ff59afd6cf3b1e946022de",
    "64f74f9143fcb90c5f12336c",
];
var getRandomOwner = function () {
    var randomIndex = Math.floor(Math.random() * owners.length);
    return owners[randomIndex];
};
var randomImageNames = [
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
var generateRandomImage = function () {
    var randomIndex = Math.floor(Math.random() * randomImageNames.length);
    return randomImageNames[randomIndex];
};
var generateSpecificData = function (typeOfThread) {
    var randomImages = Array.from({ length: 3 }, function () { return generateRandomImage(); });
    // Agrega una validación para asegurarte de que haya al menos una imagen
    if (randomImages.length === 0) {
        // Puedes agregar una imagen predeterminada o tomar otras medidas aquí
        randomImages.push("imagen_predeterminada.jpg");
    }
    var owner = getRandomOwner();
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
                owner: owner
            };
        case "isVynil":
            return {
                vynilTitle: "Título del Vinilo",
                artist: "Artista del Vinilo",
                discography: "Discografía del Artista",
                threadDescription: "Descripción del Vinilo",
                threadImages: randomImages,
                owner: owner
            };
        case "isGame":
            return {
                gameTitle: "Título del Juego",
                threadItemCategory: "Categoría del Juego",
                pegy: "PEGI 18",
                distribuitor: "Distribuidora del Juego",
                threadDescription: "Descripción del Juego",
                threadImages: randomImages,
                owner: owner
            };
        case "isComic":
            return {
                comicTitle: "Título del Cómic",
                threadDescription: "Descripción del Cómic",
                threadImages: randomImages,
                owner: owner
            };
        case "isOther":
            return {
                otherTitle: "Título del Otro Elemento",
                threadDescription: "Descripción del Otro Elemento",
                threadImages: randomImages,
                owner: owner
            };
        default:
            return {};
    }
};
var generateDummyData = function () {
    var dummyData = [];
    for (var i = 1; i <= 25; i++) {
        var typeOfThread = threadTypes[Math.floor(Math.random() * threadTypes.length)];
        var specificData = generateSpecificData(typeOfThread);
        var owner = getRandomOwner();
        var newData = __assign(__assign(__assign({}, baseData), { typeOfThread: typeOfThread, description: "Registro de prueba " + i, owner: owner, threadImages: specificData.threadImages }), specificData);
        dummyData.push(newData);
    }
    return dummyData;
};
console.log(JSON.stringify(generateDummyData(), null, 2));
