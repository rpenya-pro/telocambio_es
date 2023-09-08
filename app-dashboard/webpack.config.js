const { merge } = require("webpack-merge");
const path = require("path");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "app-dashboard",
    projectName: "react-dashboard",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 9005,
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
      alias: {
        "@app-shared/react-shared": path.resolve(
          __dirname,
          "../app-shared/src/components/"
        ),
      },
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "app_dashboard",
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
    ],
  });
};
