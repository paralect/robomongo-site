var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var port = 4111
module.exports = {
  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'eval',
  port: port,
  context: __dirname,
  entry: './src/pages/react-layout/index.js',
  output: {
    path: path.resolve('./src/static'),
    filename: '[name].js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.less/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader?strictMath&noIeCompat')
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jQuery'
    })
  ],

  resolve: {
    root: path.resolve('./src/'),
    extensions: ['', '.js', '.less'],
    modulesDirectories: ['pages', '../node_modules']
  }
}
