const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const autoprefixer = require('autoprefixer');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
    ],
  },
  devServer: {
    port: 666,
    hot: true,
  },
};
