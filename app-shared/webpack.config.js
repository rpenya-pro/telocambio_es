const { merge } = require("webpack-merge");

const path = require("path");
const webpack = require("webpack");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "app-shared",
    projectName: "react-shared",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 9004,
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
        "@app-shared/react-hooks": path.resolve(
          __dirname,
          "../app-shared/src/hooks/"
        ),
      },
    },

    plugins: [
      new ModuleFederationPlugin({
        name: "app_shared",
        remotes: {
          hostApp: "hostApp@http://localhost:9000/remoteEntry.js",
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
