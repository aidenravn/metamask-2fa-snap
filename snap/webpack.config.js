const path = require('path');

module.exports = {
  entry: './src/index.js',
  target: 'web',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: { rules: [] },
  optimization: { minimize: false }
};
