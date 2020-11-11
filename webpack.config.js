require('dotenv').config()
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const {
  anvilBaseURL,
  apiBaseURL,
  environment,
  devServerPort,
} = require('./src/config')

const outputDirectory = 'dist'

module.exports = {
  entry: ['@babel/polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src', 'client'),
      path.join(__dirname, 'src'),
      __dirname,
      'node_modules',
    ],
    extensions: ['*', '.js', '.jsx'],
  },
  devServer: {
    port: devServerPort,
    open: false,
    historyApiFallback: true,
    proxy: {
      '/api': apiBaseURL,
    },
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',

      anvilBaseURL: JSON.stringify(anvilBaseURL),
      environment: JSON.stringify(environment),
    }),
  ],
}
