const webpack = require("webpack");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "telocambio";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 9000, // Especifica que el puerto sea 9000
      open: true, // Abre automáticamente el navegador
    },
    module: {
      rules: [
        // ... (otras reglas que ya puedas tener)
        {
          test: /\.scss$/,
          use: [
            "style-loader", // Crea elementos de estilo en el DOM
            "css-loader", // Traduce CSS en CommonJS
            "sass-loader", // Compila Sass a CSS
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.REACT_APP_MONGODB_URI": JSON.stringify(
          process.env.REACT_APP_MONGODB_URI
        ),
        "process.env.JWT_SECRET": JSON.stringify(process.env.JWT_SECRET),
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
  });
};
