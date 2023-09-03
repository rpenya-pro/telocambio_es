const { merge } = require("webpack-merge");
const path = require("path"); // Añadir esta línea si aún no está presente
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "app-landing",
    projectName: "react-landing",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 9002, // Especifica que el puerto sea 9002
    },
    resolve: {
      // Añadir esta sección
      alias: {
        "@app-shared/react-shared": path.resolve(
          __dirname,
          "../app-shared/src/components/"
        ),
      },
    },
  });
};
