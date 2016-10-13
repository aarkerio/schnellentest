var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: ["./entry.jsx"]
  },
  target: 'web',
  debug: 'devel',
  devtool: 'eval',
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/build/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    "alias": {
       "request$": "xhr"
    }
  },
  module: {
    loaders:  [
                {test: /sinon.js$/, loader: "imports?define=>false" },
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
                { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
                { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' } // Bootstrap 3
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
       new webpack.IgnorePlugin(/ReactContext|react\/addons/),
       new webpack.optimize.DedupePlugin()
    ]
};

