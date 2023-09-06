const { merge } = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "app-landing",
    projectName: "react-landing",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 9002,
      proxy: {
        "/api": "http://localhost:3000",
      },
    },

    resolve: {
      alias: {
        "@app-shared/react-shared": path.resolve(
          __dirname,
          "../app-shared/src/components/"
        ),
        "@app-shared/react-hooks": path.resolve(
          __dirname,
          "../app-shared/src/hooks/"
        ),
      },
      fallback: {
        process: require.resolve("process/browser"),
        buffer: require.resolve("buffer/"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util/"),
      },
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "app_landing",
        remotes: {
          host_app: "host_app@http://localhost:9000/remoteEntry.js", // Ajusta la URL y el puerto según tu configuración
        },
        shared: {
          react: { singleton: true, eager: true, requiredVersion: "^17.0.2" },
          "react-dom": {
            singleton: true,
            eager: true,
            requiredVersion: "^17.0.2",
          },
        },
      }),

      new webpack.DefinePlugin({
        "process.env.REACT_APP_MONGODB_URI": JSON.stringify(
          process.env.REACT_APP_MONGODB_URI
        ),
        "process.env.JWT_SECRET": JSON.stringify(process.env.JWT_SECRET),
        "process.env.NODE_ENV": JSON.stringify("development"), // o 'production'
      }),
    ],
  });
};
