const { merge } = require("webpack-merge");
const path = require("path");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "app-dashboard",
    projectName: "react-dashboard",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 9005, // Especifica que el puerto sea 9002
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
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
