var path = require('path');
var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
var GlobalizePlugin     = require('globalize-webpack-plugin');

module.exports = {
  entry: {
    app: ["./entry.js"] 
  },
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/build/",
    filename: "bundle.js"
  },
  module: {
    loaders:  [
                {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/,  query: {
                                 cacheDirectory: true,
                                 presets: ["react", "es2015", "stage-0"]
                                }, include: path.app
                },
                { test: /\.css$/, loader: 'style-loader!css-loader'},
                { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: {
                        presets: ["react", "es2015", "stage-0"]
                }},
                { test: /\.less$/, loader: 'style!css!less' },
                { test: /\.scss$/, loader: 'style!css!sass' },
                { test: /\.json$/, loader: "json-loader" },
                { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
                { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
                { test: /\.gif$/, loader: "url-loader?mimetype=image/png" }
              ]
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
