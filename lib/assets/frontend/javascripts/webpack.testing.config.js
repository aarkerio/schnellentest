var path = require('path');
var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
var GlobalizePlugin     = require('globalize-webpack-plugin');

const DEV_BUILD = (process.env.NODE_ENV !== 'production')

module.exports = {
  entry: {
    app: ["./entry.jsx"] 
  },
  target: 'web',
  debug: DEV_BUILD,
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
                        presets: ["es2015", "stage-0"]
                }},
                { test: /\.less$/, loader: 'style!css!less' },
                { test: /\.scss$/, loader: 'style!css!sass' },
                { test: /\.json$/, loader: "json-loader" },
                { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
                { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
                { test: /\.gif$/, loader: "url-loader?mimetype=image/png" }
              ]
  },
   externals: [
     {
       'isomorphic-fetch': {
         root: 'isomorphic-fetch',
         commonjs2: 'isomorphic-fetch',
         commonjs: 'isomorphic-fetch',
         amd: 'isomorphic-fetch'
       },
       'cheerio': 'window',
       'react/addons': true,
       'react/lib/ExecutionEnvironment': true,
       'react/lib/ReactContext': true
     }
   ],
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
       }),
       new webpack.IgnorePlugin(/ReactContext|react\/addons/),
    //   new webpack.ProvidePlugin({
    //     'Promise': 'es6-promise',
    //     'fetch': 'imports?this=>self!exports?self.fetch!isomorphic-fetch'
       // }),
       new webpack.optimize.DedupePlugin()
    ]
};

   // 'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
   //         'fetch': 'exports?self.fetch!whatwg-fetch'
