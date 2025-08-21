const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: {
      main: './src/client/index.js',
      chat: './src/client/chat.js',
      classic: './src/client/classic.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash].js',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|mp3|wav)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[hash][ext][query]'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/client/index.html',
        filename: 'index.html',
        chunks: ['main']
      }),
      new HtmlWebpackPlugin({
        template: './src/client/chat.html',
        filename: 'chat.html',
        chunks: ['chat']
      }),
      new HtmlWebpackPlugin({
        template: './src/client/classic.html',
        filename: 'classic.html',
        chunks: []  // Disable JS for now since it's broken
      }),

      new HtmlWebpackPlugin({
        template: './src/client/simple-xat.html',
        filename: 'simple-xat.html',
        chunks: []  // Self-contained
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css'
      }),
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser'
      })
    ],
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'vendors'
      }
    },
    resolve: {
      fallback: {
        "buffer": require.resolve("buffer"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util"),
        "url": require.resolve("url"),
        "zlib": require.resolve("browserify-zlib"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "assert": require.resolve("assert"),
        "os": require.resolve("os-browserify/browser"),
        "path": require.resolve("path-browserify")
      }
    }
  };
};