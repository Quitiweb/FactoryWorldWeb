const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './game.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'index.html', to: 'index.html' },
        { from: 'assets/favicon.ico', to: 'favicon.ico' },
        { from: 'assets/hex-pack/PNG/Objects/', to: 'assets/hex-pack/PNG/Objects/' },
        { from: 'assets/hex-pack/PNG/Tiles/Terrain/Grass/', to: 'assets/hex-pack/PNG/Tiles/Terrain/Grass/' },
        { from: 'assets/icons/', to: 'assets/icons/' },
        { from: 'assets/music/', to: 'assets/music/' },
      ],
    }),
  ],
};
