var path = require('path');
var webpack = require('webpack');

module.exports = {
  name: 'vet4pet',
  target: 'web',
  version: "0.0.1",
  author: "Chipotle Software (c) 2016",
  license: 'MIT License',
  // the base path which will be used to resolve entry points
  context: __dirname,
  devtool: 'eval-source-map',
  // the main entry point for our application's frontend JS
  //entry: ['./app/assets/frontend/javascripts/entry.js'],
  entry: ['./entry.js'],
  output: {
    // this is our app/assets/javascripts directory, which is part of the Sprockets pipeline
    path: path.join(__dirname,  'built'),
    // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
    filename: 'bundle.js',
    // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
    publicPath: '/assets',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
  },
  resolve: {
    // tell webpack which extensions to auto search when it resolves modules. With this,
    // you'll be able to do `require('./utils')` instead of `require('./utils.js')`
    extensions: ['', '.js', '.jsx', '.less',  '.css', '.scss'],
    // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
    // Bower, we want it to look in there too
    // modulesDirectories: ['node_modules'],
    // avoids npm link loads react twice
    //alias: {
    //  'React': './node_modules/react/dist/react.min.js',
      //'ReactDOM': './node_modules/react-dom/dist/react-dom.min.js',
    // },
  },
  module: {
    loaders:  [
                // {test: require.resolve('react'), loader: 'expose?React', exclude: /node_modules/ },
                {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/,  query: {
                                 cacheDirectory: true,
                                 presets: ['react', 'es2015', 'stage-0', 'survivejs-kanban']
                                }, include: path.app
                },
                { test: /\.css$/, loader: 'style-loader!css-loader'},
                { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
                { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
                { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
                { test: /\.js$/, loader: 'babel', exclude: /node_modules/},
                { test: /\.less$/, loader: 'style!css!less' },
                { test: /\.scss$/, loader: 'style!css!sass' },
                { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
              ]
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
        })
    ]
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     React: "react",
  //     ReactDOM: "react-dom"
  //   })
  // ]
}
