'use strict';

var path = require('path');
var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
//const GlobalizePlugin   = require('globalize-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['bootstrap-loader', 'jquery', 'jquery-ujs', './entry', './libs/index'],
  devtool: 'cheap-source-map',
    output: {
      publicPath: 'http://localhost:8080/build/',
      filename: 'bundle.js',
      chunkFilename: 'styles.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
      rules:  [
          { test: /bootstrap\/js\//, use: 'imports?jQuery=jquery' },
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
               use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ { loader: 'css-loader' }, { loader: 'postcss-loader' } ]
               })
          },
          { test: /\.less$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader',   use: ['style-loader', 'css-loader', 'less-loader'],}) },
          { test: /\.scss$/,
               use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [ {loader: 'css-loader'}, {loader: 'sass-loader' } ]
               })
          },
          { test: /\.sass$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['style-loader', 'css-loader', 'sass-loader'] } ) },
          { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, use: 'file-loader?name=fonts/[name].[ext]' },
          { test: /\.gif$/, use: [ { loader:"url-loader?mimetype=image/png"}] }
        ]
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 8080,
    headers: { 'Access-Control-Allow-Origin': '*' }
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
        new ExtractTextPlugin('styles.css'),
        // resolve each dependency separately from one another
		    new webpack.optimize.CommonsChunkPlugin({ name: 'styles', filename: 'styles.js' })
    ]
};
