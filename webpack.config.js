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
        { from: 'factory-world.html', to: 'factory-world.html' },
        { from: 'tic-tac-toe.html', to: 'tic-tac-toe.html' },
        { from: 'dungeon-sprint.html', to: 'dungeon-sprint.html' },
        { from: 'pixel-drift.html', to: 'pixel-drift.html' },
        { from: 'neon-arena.html', to: 'neon-arena.html' },
        { from: 'assets/favicon.ico', to: 'favicon.ico' },
        { from: 'assets/covers/', to: 'assets/covers/' },
        { from: 'assets/hex-pack/PNG/Objects/', to: 'assets/hex-pack/PNG/Objects/' },
        { from: 'assets/hex-pack/PNG/Tiles/Terrain/Grass/', to: 'assets/hex-pack/PNG/Tiles/Terrain/Grass/' },
        { from: 'assets/icons/', to: 'assets/icons/' },
        { from: 'assets/music/', to: 'assets/music/' },
      ],
    }),
  ],
};
