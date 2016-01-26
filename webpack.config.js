const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  test: path.join(__dirname, 'test')
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
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'eval-source-map'
  });
}
if (TARGET == 'build') {
  module.exports = merge(common, {});
}

if (TARGET == 'test' || TARGET == 'autotest') {
  module.exports = merge(common, {
    entry: {}, // karma will set this
    output: {}, // karma will set this
    devtool: 'inline-source-map',
    resolve: {
      alias: {
        'app': PATHS.app
      }
    },
    module: {
      preLoaders: [
        {
          test: /\.jsx?$/,
          loaders: ['isparta-instrumenter'],
          include: PATHS.app
        }
      ],
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel?cacheDirectory'],
          include: PATHS.test
        }
      ]
    }
  });    
}
