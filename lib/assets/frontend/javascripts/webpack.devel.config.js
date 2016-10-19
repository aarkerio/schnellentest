var path = require('path');
var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const GlobalizePlugin   = require('globalize-webpack-plugin');
const ExtractTextPlugin  = require("extract-text-webpack-plugin");

module.exports = {
  entry: ['./libs/index', 'jquery', 'jquery-ujs',
    './entry.jsx'],
  debug: true,
  devtool: 'eval', // For production, use cheap-module-source-map.
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "http://localhost:8080/build/",
    filename: "bundle.js",
    chunkFilename: "id.js"
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
                { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: {
                        presets: [ 'es2015', 'react', 'react-hmre' ]
                }},
                { test: /\.css$/, loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
                }) },
                { test: /\.less$/, loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!less-loader"
                }) },
                { test: /\.scss$/, loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!scss-loader"
                }) },
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
        }),
        new ExtractTextPlugin({
			      filename: "css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
			      disable: false,
			      allChunks: true
		    }),
		    new webpack.optimize.CommonsChunkPlugin({ name: "styles", filename: "styles.js" })
    ]
};
