/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const path = require('path')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const { NODE_ENV = 'production' } = process.env

module.exports = {
  entry: 'src/index.ts',
  target: 'node',
  mode: NODE_ENV,
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
}
