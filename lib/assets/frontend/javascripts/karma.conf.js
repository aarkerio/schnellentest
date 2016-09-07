var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],  //run in PhantomJS
    singleRun: true,         //just run once by default
    frameworks: [ 'chai', 'mocha' ], //use the mocha test framework
    files: [
      'tests.webpack.js' // this file loads
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]     //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ],   //report results in this format
    webpack: {   //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' }
        ]
      }
    },
    webpackServer: {
      noInfo: true    //please don't spam the console when running in karma!
    }
  });
};
