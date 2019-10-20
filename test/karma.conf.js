/**
 * @file karma.conf.js
 * @description Karma config file.
 * @author Zero Zhang
 */

const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');


module.exports = (config) => {
    config.set({
        // Relative directory, files and exclude will based on it if it is set. The directory of karma.conf.js is the default value.
        basePath: path.resolve(ROOT_PATH),
        // Assert directory, directories can be used: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],
        // Test reporter, reporters can be used: https://npmjs.org/browse/keyword/karma-reporter
        // spec: Print each test case.
        // progress: Print test progress.
        // coverage-istanbul: Print code coverage.
        reporters: ['spec', 'coverage-istanbul'],
        // Files need be used when testing.
        files: [
            'test/cases.js'     // Test entry file.
        ],
        // Files need be preprocessed before testing, preprocressors can be used: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/cases.js': ['webpack']
        },
        // Files need be excluded when testing.
        exclude: [],
        // Config for webpack.
        webpack: {
            mode: 'development',
            devtool: 'inline-source-map',
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        enforce: 'pre',
                        use: 'istanbul-instrumenter-loader',    // Code coverage loader.
                        include: [SRC_PATH]     // Directory of source files.
                    }
                ]
            }
        },
        webpackMiddleware: {
            noInfo: true
        },
        // Config for code coverage.
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly', 'text-summary'],
            dir: path.resolve(ROOT_PATH, 'coverage'),
            fixWebpackSourcePaths: true,
            'report-config': {
                html: {
                    subdir: 'html'
                }
            }
        },
        // Plugins used by karma when testing.
        plugins: [
            require('karma-chrome-launcher'),   // Chrome launcher.
            require('karma-mocha'),             // mocha API is used in test cases.
            require('karma-chai'),              // chai API is used in test cases.
            require('karma-webpack'),           // Webpack API can be invoked by karma with karma-webpack.
            require('karma-spec-reporter'),     // Print test result.
            require('karma-coverage-istanbul-reporter')     // Print code coverage.
        ],
        /**
         * log level
         * config.LOG_DISABLE   // No info.
         * config.LOG_ERROR     // Print error info.
         * config.LOG_WARN      // Print warning info.
         * config.LOG_INFO      // Print all info.
         * config.LOG_DEBUG     // Print debug info.
         */
        logLevel: config.LOG_ERROR,
        // Browser used in testing, browsers can be used: IE, Chrome, ChromeCanary, FireFox, Opera, Safari, PhantomJS
        browsers: ['Chrome'],
        // Enable or disable continuous integration. When true is set, browser will be closed when finishing testing.
        singleRun: true,
        colors: true,
        autoWatch: true,
        // The numbers of browser to run cases in the same time.
        concurrency: Infinity
    });
};
