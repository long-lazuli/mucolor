const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './_sources/µColor.ts',
  devtool: 'source-map',
  devServer: {
    contentBase: './_dist'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.ts' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '_dist')
  },
  plugins: [
    new webpack.ProvidePlugin({
      'window.µColor': path.resolve(path.join(__dirname, '_sources/index.ts'))
    })
  ]
};