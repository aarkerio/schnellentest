var path = require('path');
var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
var GlobalizePlugin     = require('globalize-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    "./entry.jsx" 
  ],
  debug: true,
  devtool: 'cheap-module-eval-source-map', // For production, use cheap-module-source-map.
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "http://localhost:8080/build/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders:  [
                {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/,  query: {
                                 cacheDirectory: true,
                                 presets: ['es2015', 'react-hmre', 'react', 'stage-2' ]
                                }, include: path.app
                },
                { test: /\.css$/, loader: 'style-loader!css-loader'},
                { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: {
                        presets: [ 'es2015', 'react', 'react-hmre' ]
                }},
                { test: /\.less$/, loader: 'style!css!less' },
                { test: /\.scss$/, loader: 'style!css!sass' },
                { test: /\.json$/, loader: "json-loader" },
                { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
                { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
                { test: /\.gif$/, loader: "url-loader?mimetype=image/png" }
              ]
  },
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  node: {
     fs: "empty"
  },
  plugins: [
       new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        // Globalize modules are wrapped by UMD offering AMD, CJS and global choices. Webpack tries to use AMD (the one that appears first) 
        // and can't resolve paths correctly. globalize-webpack-plugin makes webpack to use CJS over AMD in globalize packages, 
        new GlobalizePlugin({
           production: false,
           messages: "messages/[locale].json", // messages (not optional)
           developmentLocale: "en",
           supportedLocales: ["en"],
           output: "i18n/[locale].[hash].js"
    })
    ]
};
