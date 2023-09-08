/**
 * Declara un módulo para archivos .html.
 * Permite importar archivos .html como cadenas de texto en TypeScript.
 */
declare module "*.html" {
  const rawHtmlFile: string;
  export = rawHtmlFile;
}

/**
 * Declara un módulo para archivos .bmp.
 * Permite importar archivos .bmp y recibir su ruta como una cadena de texto.
 */
declare module "*.bmp" {
  const src: string;
  export default src;
}

/**
 * Declara un módulo para archivos .gif.
 * Permite importar archivos .gif y recibir su ruta como una cadena de texto.
 */
declare module "*.gif" {
  const src: string;
  export default src;
}

/**
 * Declara un módulo para archivos .jpg.
 * Permite importar archivos .jpg y recibir su ruta como una cadena de texto.
 */
declare module "*.jpg" {
  const src: string;
  export default src;
}

/**
 * Declara un módulo para archivos .jpeg.
 * Permite importar archivos .jpeg y recibir su ruta como una cadena de texto.
 */
declare module "*.jpeg" {
  const src: string;
  export default src;
}

/**
 * Declara un módulo para archivos .png.
 * Permite importar archivos .png y recibir su ruta como una cadena de texto.
 */
declare module "*.png" {
  const src: string;
  export default src;
}

/**
 * Declara un módulo para archivos .webp.
 * Permite importar archivos .webp y recibir su ruta como una cadena de texto.
 */
declare module "*.webp" {
  const src: string;
  export default src;
}

/**
 * Declara un módulo para archivos .svg.
 * Permite importar archivos .svg y recibir su ruta como una cadena de texto.
 */
declare module "*.svg" {
  const src: string;
  export default src;
}

interface Window {
  React: typeof import("react");
  ReactDOM: typeof import("react-dom");
}

// declare namespace NodeJS {
//   interface ProcessEnv {
//     REACT_APP_API_URL: string;
//     REACT_APP_SECRET_KEY: string;
//     REACT_APP_URL: string;
//   }
// }

// declare module "@telocambio/root-config" {
//   const REACT_APP_API_URL: string;
//   const REACT_APP_SECRET_KEY: string;
//   const REACT_APP_URL: string;
// }
