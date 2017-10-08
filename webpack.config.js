const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLINT_CONFIG = require('./eslint-config');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: './dist/index.html',
  inject: 'body'
});

module.exports = (options) => {
    entry: options.entry,
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
          test: /\.(png|jpg|gif|webp)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
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
    plugins: options.plugins.concat(
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: './dist/index.html',
        inject: 'body'
      }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(isProduction)
      })),

    resolve: {
      extensions: [' ', 'js']
    }
};
