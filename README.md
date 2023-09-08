# Telocambio - Micro Frontends

Este proyecto está construido usando una arquitectura de micro frontends.

## Requisitos previos

- Node.js v14 o superior
- Yarn v1.22 o superior

## Instalación

1. Clonar el repositorio:

    ```bash
    git clone https://github.com/tu-organizacion/telocambio.git
    ```

2. Instalar las dependencias en la raíz del proyecto host y del restro de aplicaciones:

    ```bash
    cd telocambio/host-app
    yarn install

    cd telocambio/app-navigation
    yarn install

    cd telocambio/app-landing
    yarn install

    cd telocambio/app-footer
    yarn install

    cd telocambio/app-shared
    yarn install
    ```
    ...y del resto de aplicaciones que se vayan añadiendo.

## Ejecutar todas las aplicaciones simultáneamente

Para iniciar todas las aplicaciones al mismo tiempo, puedes usar el siguiente comando en la raíz del proyecto:

```bash
cd telocambio/host-app
yarn start:all
```

Esto iniciará todas las aplicaciones y las ejecutará en sus respectivos puertos como se especifica en el package.json.

## Ejecutar aplicaciones de forma independiente (Standalone)
También puedes ejecutar cada aplicación de forma independiente. A continuación, se describen los comandos para iniciar cada una:

App de Navegación
Para iniciar la aplicación de navegación de forma independiente, ejecuta:
```
cd app-navigation //app-landing, app-footer, etc
yarn start:standalone
```

En el **caso de app-shared NO se puede ejectuar** en standalone porque **es una aplicacion repositorio** y no carga en el root-config.


**IMPORTANTE:** los estilos se hallan ubicados en **host-app**, en el archivo global que apunta al directorio **/scss**,  desde allí se realizarán todas las modificaciones y archivos de estilos.

Es **extremadamente importante** que cada aplicación tenga su archivo propio y que los estilos se marquen usando BEM (Block Element Modifier).


### Descripción de las aplicaciones:

- app-dashboard
- app-footer
- app-landing: app landing, gestiona la validacion de login
- app-navigation
- app-profile: app para gestionar el perfil de usuario
- app-shared: app- que contiene elementos para compartir qu eno incluyen lógica de datos
- host-app: aplicación host de todo el microfrontend
- nest-backend: backend eventual
- repo-hooks-yarn: cama de hooks para colgar en npmjs, todos los directorios que empiecen por repo- son para repositorio externo