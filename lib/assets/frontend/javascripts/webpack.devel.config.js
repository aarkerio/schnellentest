"use strict";
var path = require('path');
var webpack = require('webpack');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
//const GlobalizePlugin   = require('globalize-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['bootstrap-loader', 'jquery', 'jquery-ujs', './libs/index', './entry'],
  devtool: 'inline-source-map', // For production, use cheap-module-source-map.
  output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: 'build',
      filename: 'bundle.js',
      chunkFilename: 'styles.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
      rules:  [
          { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
          { test:/\.(js|jsx)$/,
              exclude: /node_modules/,
              use: [ {
                  loader: 'babel-loader',
                   query: {
                     cacheDirectory: true,
                     presets: ['es2015', 'react-hmre', 'react', 'stage-2' ]
                   }
                }]
          },
          { test: /\.css$/,
               loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    loader: [
                          {
                            loader: 'css-loader',
                            query: {
                               modules: true,
                               importLoaders: 2,
                               sourceMap: true
                            }
                          },
                          {
                            loader: 'autoprefixer-loader',
                            query: { browsers: 'last 2 version' }
                          },
                          {
                            loader: 'sass-loader',
                            query: {
                               outputStyle: 'expanded',
                                sourceMap: true,
                                sourceMapContents: true
                            }
                          }
                        ]
               })
          },
          { test: /\.less$/, loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader',   loader: ['style-loader', 'css-loader', 'less-loader'],}) },
          { test: /\.scss$/,
               use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    loader: [
                          {
                            loader: 'css-loader',
                            query: {
                               modules: true,
                               importLoaders: 2,
                               sourceMap: true
                            }
                          },
                          {
                            loader: 'autoprefixer-loader',
                            query: { browsers: 'last 2 version' }
                          },
                          {
                            loader: 'sass-loader',
                            query: {
                               outputStyle: 'expanded',
                                sourceMap: true,
                                sourceMapContents: true
                            }
                          }
                        ]
               })
          },
          { test: /\.sass$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader',   loader: ['style-loader', 'css-loader', 'sass-loader'],}) },
          { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,      use: ExtractTextPlugin.extract({ fallback: 'style-loader', loader: "url-loader?mimetype=application/font-woff" }) },
          { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', loader:"file-loader?name=[name].[ext]" }) },
          { test: /\.json$/, use: [ { loader: 'json-loader' }]  },
          { test: /\.gif$/, use: [ { loader:"url-loader?mimetype=image/png"}] }
        ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "./"),
    compress: true,
    port: 8080
  },
   plugins: [
       new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        // Globalize modules are wrapped by UMD offering AMD, CJS and global choices. Webpack tries to use AMD (the one that appears first)
        // and can't resolve paths correctly. globalize-webpack-plugin makes webpack to use CJS over AMD in globalize packages,
        // new GlobalizePlugin({
        //    production: false,
        //    messages: "messages/[locale].json", // messages (not optional)
        //    developmentLocale: "en",
        //    supportedLocales: ["en"],
        //    output: "i18n/[locale].[hash].js"
        // }),
        // extract CSS
        new ExtractTextPlugin("./styles/schnell.scss"),
        // resolve each dependency separately from one another
		    new webpack.optimize.CommonsChunkPlugin({ name: "styles", filename: "styles.js" })
    ]
};
