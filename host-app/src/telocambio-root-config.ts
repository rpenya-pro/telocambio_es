// Importa las funciones necesarias de la librería single-spa.
import { registerApplication, start } from "single-spa";
// Importa las funciones de construcción de single-spa-layout.
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
// Importa el layout HTML del microfrontend.
import microfrontendLayout from "./microfrontend-layout.html";
// Importa estilos globales.
import "./global-styles.scss";

/**
 * Construye las rutas a partir del layout del microfrontend.
 * @see https://single-spa.js.org/docs/layout-overview/
 */
const routes = constructRoutes(microfrontendLayout);

/**
 * Construye las aplicaciones que se registrarán.
 * Utiliza 'System.import' para cargar dinámicamente cada aplicación.
 * @see https://single-spa.js.org/docs/configuration/#loading-function
 */
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

/**
 * Construye y activa el motor de layout de single-spa.
 * Este motor posicionará y montará/desmontará aplicaciones de acuerdo con las rutas.
 * @see https://single-spa.js.org/docs/layout-overview/#constructlayoutengine
 */
const layoutEngine = constructLayoutEngine({ routes, applications });

/**
 * Registra cada aplicación microfrontend con single-spa.
 */
applications.forEach(registerApplication);

/**
 * Activa el motor de layout.
 */
layoutEngine.activate();

/**
 * Inicia la aplicación single-spa, permitiendo que las aplicaciones se monten.
 */
start();
