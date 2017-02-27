"use strict";
var path = require('path');
var webpack = require('webpack');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
//const GlobalizePlugin   = require('globalize-webpack-plugin');
//const ExtractTextPlugin  = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['bootstrap-loader', 'jquery', 'jquery-ujs', './entry',  './libs/index'],
  devtool: 'inline-source-map', // For production, use cheap-module-source-map.
  output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: "http://localhost:8080/build/",
      filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
      rules:  [
          {
           test: /\.jsx?$/,
           exclude: /node_modules/,
           use: [ {
                   loader: 'babel-loader',
                   query: {
                     cacheDirectory: true,
                     presets: ['es2015', 'react-hmre', 'react', 'stage-2' ]
                   }
                }]
          },
          {
           test: /\.js?$/,
           exclude: /node_modules/,
           use: [ {
                   loader: 'babel-loader',
                   query: {
                     cacheDirectory: true,
                     presets: ['es2015', 'react-hmre', 'react', 'stage-2' ]
                   }
                }]
          },
          { test: /\.css$/,  use: [ { loader: 'style-loader', loader:'css-loader' }]  },
          { test: /\.less$/, use: [ { loader: 'style-loader', loader:'css-loader' }]  },
          { test: /\.scss$/, use: [ { loader: 'style-loader', loader:'css-loader' }]  },
          { test: /\.sass$/, use: [ { loader: 'style-loader', loader:'css-loader!sass-loader' } ]  },
          { test: /\.json$/, use: [ { loader: 'json-loader' }]  },
          { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, use: [ { loader: "url-loader?mimetype=application/font-woff" }] },
          { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, use: [ { loader:"file-loader?name=[name].[ext]" } ] },
          { test: /\.gif$/, use: [ { loader:"url-loader?mimetype=image/png"}] },
          { test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, use:[ { loader: 'imports-loader?jQuery=jquery'}] },
          { test: /bootstrap\/dist\/js\/umd\//, use: [ { loader:'imports?jQuery=jquery' } ] }
        ]
  },
  devServer: {
    hot: true,
    inline: true,
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
        // new ExtractTextPlugin("./styles/schnell.scss"),
        // resolve each dependency separately from one another
		    //new webpack.optimize.CommonsChunkPlugin({ name: "styles", filename: "styles.js" })
    ]
};
