const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
//   target: 'node', // Add this line to set the target to Node.js
//   externalsPresets: { node: true }, // Add this line to ignore built-in modules like 'fs', 'path', etc.
//   externals: [nodeExternals()], // Add this line to ignore all modules from node_modules folder
  entry: './src/index.tsx',

  // Add module object
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    fallback: {
      "worker_threads": false,
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
  devServer: {
    static: './dist', // Update this line
    hot: true,
    open: true, // Add this line
  },
};
