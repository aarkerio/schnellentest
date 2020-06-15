const { environment } =  require('@rails/webpacker');
const typescript      =  require('./loaders/typescript');
const sass            =  require('./loaders/sass');

const webpack = require("webpack");

environment.loaders.prepend('typescript', typescript);

environment.loaders.prepend('sass', sass);

environment.plugins.append("Provide", new webpack.ProvidePlugin({
  $: 'jquery',
 jQuery: 'jquery',
 Popper: ['popper.js', 'default']
}));

module.exports = environment;


