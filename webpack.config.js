require('dotenv').config()
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const {
  anvilBaseURL,
  apiBaseURL,
  environment,
  devServerPort,
} = require('./src/config')

const outputDirectory = 'dist'

module.exports = {
  mode: environment,
  entry: ['@babel/polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    publicPath: environment === 'development' ? `http://localhost:${devServerPort}` : '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // global css
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
            },
          },
        ],
        exclude: /\.module\.css$/,
      },
      // css modules
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              esModule: false,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 100000
        }
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
    devMiddleware: {
      writeToDisk: (filePath) => {
        return /index\.html$/.test(filePath)
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.png',
      anvilBaseURL: JSON.stringify(anvilBaseURL),
      environment: JSON.stringify(environment),
    }),
  ],
}
