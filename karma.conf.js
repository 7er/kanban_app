module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec', 'coverage'],
    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'test/unit/*.js'
    ],
    preprocessors: {'test/unit/*.js': ['webpack', 'sourcemap']},
    browsers: ['PhantomJS'],
    singleRun: true,
    coverageReporter: {
      dir: 'build/coverage',
      type: 'html'
    },
    webpack: require('./webpack.config'),
    webpackMiddleware: {
      noInfo: true
    }
  });
};
