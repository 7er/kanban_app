const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

const common = {
  // path to stuff to build
  entry: PATHS.app,
  // used for require/import without extension
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      
      { // css
        test: /\.css$/,
        loaders: ['style', 'css'],
        // include: (path|[path1,path2...,pathN])
        include: PATHS.app
      },
      { // js (to support ES6), jsx (to support React)
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Kanban app',
      //template: 'node_modules/html-webpack-template/index.html',
      //appMountId: 'app'
    })
  ]
};

if (TARGET == 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map'
  });
}
if (TARGET == 'build') {
  module.exports = merge(common, {});
}
