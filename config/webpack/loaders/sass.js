
const path = require('path');

module.exports = {
  test: /\.s[ac]ss$/i,
  use: [{
    loader: 'style-loader'
  },
  {
    loader: 'css-loader'
  },
  {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        includePaths: [
          './',
          'node_modules',
          path.join(path.dirname(module.filename), 'node_modules')
        ]
      }
    }
  }]
};
