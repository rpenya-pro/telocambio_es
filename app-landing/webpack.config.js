const { merge } = require("webpack-merge");
const webpack = require("webpack"); // Importar webpack
const path = require("path");
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
      alias: {
        "@app-shared/react-shared": path.resolve(
          __dirname,
          "../app-shared/src/components/"
        ),
      },
    },
    plugins: [
      // Añadir DefinePlugin para hacer disponibles las variables de entorno
      new webpack.DefinePlugin({
        "process.env.REACT_APP_MONGODB_URI": JSON.stringify(
          process.env.REACT_APP_MONGODB_URI
        ),
        "process.env.JWT_SECRET": JSON.stringify(process.env.JWT_SECRET),
      }),
    ],
  });
};
