var path = require('path');
var webpack = require('webpack');
// var fs = require('fs');
var GlobalizePlugin = require('globalize-webpack-plugin');

module.exports = {
  name: 'schnell_test',
  target: 'web',
  version: '0.0.1',
  author: 'Chipotle Software (c) 2016',
  license: 'MIT License',
  // the base path which will be used to resolve entry points
  context: __dirname,
  devtool: 'eval-source-map',
  // the main entry point for our application's frontend JS
    entry: path.join(__dirname, '/app/assets/frontend/javascripts/entry.js'),
  //entry: ['./entry.js'],
  output: {
    // this is our app/assets/javascripts directory, which is part of the Sprockets pipeline
    path: path.join(__dirname,  'app/assets/javascripts/'),
    // the filename of the compiled bundle, e.g.
    filename: 'bundle.js',
    // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
    publicPath: '/app/assets',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
    // libraryTarget: 'umd'
  },
  resolve: {
    root: path.resolve('./app/assets/frontend/'),
    // tell webpack which extensions to auto search when it resolves modules. With this,
    // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
    extensions: ['', '.js', '.jsx', '.less', '.css', '.scss', '.json'],
    // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
  },
  module: {
    loaders:  [
                {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/,  query: {
                                 cacheDirectory: true,
                                 presets: ['react', 'es2015', 'stage-0', 'survivejs-kanban']
                                }, include: path.app
                },
                { test: /\.css$/, loader: 'style-loader!css-loader'},
                // { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
                // { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
                // { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
                { test: /\.js$/, loader: 'babel', exclude: /node_modules/},
                { test: /\.less$/, loader: 'style!css!less' },
                { test: /\.scss$/, loader: 'style!css!sass' },
                // { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
                { test: /\.json$/, loader: "json-loader" },
                { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
                { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
                { test: /\.gif$/, loader: "url-loader?mimetype=image/png" }
              ]
  },
  exports: {
    entry: {
        helloWorld: [
            'webpack-dev-server/client?http://localhost:8080',
            path.join(__dirname, '/app/assets/frontend/javascripts/entry.js'),
        ]
    }
  },
  node: {
     fs: "empty"
  },
  //externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        // "node/npm module name": "name of exported library variable"
  //      "react": "React",
   //     "react-dom": "ReactDOM"
    // },
     plugins: [
        new webpack.ProvidePlugin({
            '$': "jquery",
            'jQuery': "jquery"
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en|es)$/),
        new GlobalizePlugin({
			    production: false,
			    developmentLocale: "en",
			    supportedLocales: ["en"],
			    // messages: "messages/[locale].json",
			    output: "i18n/[locale].[hash].js"
		    })
        // new ExtractTextPlugin("styles.css", {
        //     allChunks: true
        // })
    ]
}
