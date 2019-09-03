const path = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import our plugin -> ADDED IN THIS STEP
// Constant with our paths
const NODE_ENV = process.env.NODE_ENV || "development";
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
};
// Webpack configuration
// module.exports = {
//   entry: path.join(paths.JS, 'app.js'),
//   output: {
//     path: paths.DIST,
//     filename: 'app.bundle.js',
//   },
//   // Tell webpack to use html plugin -> ADDED IN THIS STEP
//   // index.html is used as a template in which it'll inject bundled app.
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.join(paths.SRC, 'index.html'),
//     }),
//   ],
// };

const browserConfig = {
    mode: 'development',
    entry: "./src/browser/index.js",
    output: {
      path: __dirname,
      filename: "./public/bundle.js"
    },
    devtool: "cheap-module-source-map",
    module: {
      rules: [
        {
          test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: "file-loader",
          options: {
            name: "public/media/[name].[ext]",
            publicPath: url => url.replace(/public/, "")
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader",
                options: { importLoaders: 1 }
              },
              {
                loader: "postcss-loader",
                options: { plugins: [autoprefixer()] }
              }
            ]
          })
        },
        {
          test: /js$/,
          exclude: /(node_modules)/,
          loader: "babel-loader",
          query: { presets: ["react-app"] }
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: "public/css/[name].css"
      }),
      new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify(NODE_ENV)
        }
    })
    ]
  };
  const serverConfig = {
    mode: 'development',
    entry: "./src/server/index.js",
    target: "node",
    output: {
      path: __dirname,
      filename: "server.js",
      libraryTarget: "commonjs2"
    },
    devtool: "cheap-module-source-map",
    module: {
      rules: [
        {
          test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: "file-loader",
          options: {
            name: "public/media/[name].[ext]",
            publicPath: url => url.replace(/public/, ""),
            emit: false
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "css-loader"
            }
          ]
        },
        {
          test: /js$/,
          exclude: /(node_modules)/,
          loader: "babel-loader",
          query: { presets: ["react-app"] }
        }
      ]
    }
  };
  
  module.exports = [browserConfig, serverConfig];