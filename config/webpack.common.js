const { resolve } = require('path')

const paths = {
  dist: resolve(__dirname, '..', 'dist'),
}

const commonConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',
  context: resolve(__dirname, '..', 'main'),
  output: {
    filename: '[name].js',
    path: paths.dist,
    publicPath: './',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
    mainFields: ['module', 'main'],
  },
}

module.exports = { commonConfig, paths }
