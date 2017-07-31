const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  entry: './src/js/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'react-moment',
    libraryTarget: 'umd'
  },
  externals: [
    {
      'react': {
        root: 'react',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'react-dom',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      },
      'prop-types': {
        root: 'prop-types',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types'
      }
    }
  ],
  module: {
    rules: [
      {
        test: /\.less$/i,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        })
      },
      {
        test: /\.jsx?$/i,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('md-editor.css')
  ]
};

module.exports = config;
