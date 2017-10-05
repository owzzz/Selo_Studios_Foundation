const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLINT_CONFIG = require('./eslint-config');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './dist/index.html',
  inject: 'body'
});

module.exports = {
    entry: "./src/scripts/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "main.min.js"
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: ESLINT_CONFIG
        },
        {
          test: /\.js$/,
          exclude: '/node_modules/',
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react']
            }
          }
        },
        {
          test: /\.css$/,
          loader: "style!css"
        },
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    plugins: [HtmlWebpackPluginConfig],

    resolve: {
      extensions: [' ', 'js']
    }
};
