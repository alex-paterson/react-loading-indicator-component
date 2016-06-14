var webpack = require('webpack');

module.exports = {
  entry: [
    './app/app.jsx'
  ],
  output: {
    path: 'public',
    filename: 'bundle.js',
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      './node_modules'
    ],
    alias: {
      applicationStyles: 'app/styles/app.scss'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2016', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};
