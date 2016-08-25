var path = require('path');
var webpack = require('webpack');

var GlobalizePlugin = require('globalize-webpack-plugin');

module.exports = {
  entry: {
    app: ["./entry.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/app/assets/",
    filename: "bundle.js"
  },
   module: {
    loaders:  [
                {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/,  query: {
                                 cacheDirectory: true,
                                 presets: ['react', 'es2015', 'stage-0', 'survivejs-kanban']
                                }, include: path.app
                },
                { test: /\.css$/, loader: 'style-loader!css-loader'},
                { test: /\.js$/, loader: 'babel', exclude: /node_modules/},
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
  }
};

