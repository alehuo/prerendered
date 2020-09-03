#!/usr/bin/env node
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("prerendered_cli", [], factory);
	else if(typeof exports === 'object')
		exports["prerendered_cli"] = factory();
	else
		root["prerendered_cli"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
var fs_1 = __importDefault(__webpack_require__(2));
var path_1 = __importDefault(__webpack_require__(0));
var inquirer_1 = __importDefault(__webpack_require__(3));
var webpack_1 = __importDefault(__webpack_require__(4));
var commander_1 = __webpack_require__(5);
var webpack_prerendered_1 = __webpack_require__(6);
commander_1.program.version('0.0.1');
commander_1.program
    .option('--debug, -d', 'Enable debug printing');
commander_1.program.command('init').description('Initialize prerendered')
    .action(function (_source, _destination) {
    if (fs_1.default.existsSync(path_1.default.join(process.cwd(), 'prerendered.json'))) {
        throw new Error('Error! prerendered.json already exists. Please delete it before proceeding.');
    }
    console.log('Thank you for using prerendered. I will now ask a few questions about your app.');
    console.log('A configuration file will be created to the project root which is used by the build command.');
    console.log("The folder I will use as a base will be " + process.cwd());
    var questions = [
        {
            type: 'input', name: 'entrypoint',
            message: "What is your client entrypoint? (Current working dir: " + process.cwd() + ")",
        },
    ];
    inquirer_1.default
        .prompt(questions)
        .then(function (answers) {
        if (answers.entrypoint === '') {
            throw new Error('Error! No entrypoint given');
        }
        if (!fs_1.default.existsSync(path_1.default.join(process.cwd(), answers.entrypoint))) {
            throw new Error('Error! Entrypoint does not exist');
        }
        var data = {
            client: {
                entryPoint: answers.entrypoint,
            },
        };
        fs_1.default.writeFileSync(path_1.default.join(process.cwd(), 'prerendered.json'), JSON.stringify(data, null, 2));
        console.log('Created prerendered.json');
    });
});
commander_1.program.command('build').description('Build prerendered')
    .action(function (_source, _destination) {
    if (!fs_1.default.existsSync(path_1.default.join(process.cwd(), 'prerendered.json'))) {
        throw new Error('Error! prerendered.json not found. Please run `prerendered init`');
    }
    console.log('Bunding app');
    var cfgPath = path_1.default.join(process.cwd(), 'prerendered.json');
    console.log('prerendered.json location: %s', cfgPath);
    var cfg = JSON.parse(fs_1.default.readFileSync(cfgPath).toString('utf-8'));
    var webpackConfig = webpack_prerendered_1.createConfig(cfg.client.entryPoint, commander_1.program.debug);
    webpack_1.default(webpackConfig, function (err, stats) {
        if (err !== null || stats.hasErrors()) {
            if (err !== null && err.message) {
                console.error(err.message);
            }
            if (stats.hasErrors()) {
                var info_1 = stats.toJson();
                info_1.errors.map(console.error);
            }
            throw new Error('Error! Webpack: Failed to compile');
        }
        var info = stats.toJson();
        if (stats.hasErrors()) {
            info.errors.map(console.error);
        }
        if (stats.hasWarnings()) {
            info.warnings.map(console.warn);
        }
        console.log('Webpack: Done!');
    });
});
commander_1.program.parse(process.argv);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("inquirer");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = void 0;
var path_1 = __webpack_require__(0);
var terser_webpack_plugin_1 = __importDefault(__webpack_require__(7));
var clean_webpack_plugin_1 = __webpack_require__(8);
var webpack_manifest_plugin_1 = __importDefault(__webpack_require__(9));
exports.createConfig = function (entry, debug) {
    if (debug === void 0) { debug = false; }
    var pathPrefix = 'static';
    var tsConfigPath = path_1.resolve(__dirname, 'tsconfig.prr.json');
    var config = {
        mode: 'production',
        entry: path_1.resolve(process.cwd(), entry),
        output: {
            path: path_1.resolve(process.cwd(), '.prerendered', pathPrefix),
            filename: '[name].[contenthash].js',
            chunkFilename: '[id]-[chunkhash].js',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: [
                        /node_modules/,
                    ],
                    include: [path_1.resolve(process.cwd(), path_1.dirname(entry))],
                    loader: 'ts-loader',
                    options: {
                        configFile: tsConfigPath,
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        devtool: 'source-map',
        target: 'web',
        optimization: {
            minimize: true,
            minimizer: [
                new terser_webpack_plugin_1.default({
                    parallel: true,
                    terserOptions: {
                        compress: false,
                        ecma: 6,
                        mangle: true,
                    },
                    sourceMap: true,
                    test: /\.js(\?.*)?$/i,
                }),
            ],
        },
        node: {
            net: 'empty',
            fs: 'empty',
        },
        plugins: [
            new clean_webpack_plugin_1.CleanWebpackPlugin(),
            new webpack_manifest_plugin_1.default({
                publicPath: pathPrefix + "/",
                fileName: path_1.resolve(process.cwd(), '.prerendered', 'manifest.json'),
            }),
        ],
    };
    if (debug) {
        console.log('tsconfig.prr.json: %s', tsConfigPath);
        console.log('Path prefix: %s', pathPrefix);
        console.log('Webpack configuration: %s', JSON.stringify(config, null, 2));
    }
    return config;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("terser-webpack-plugin");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("clean-webpack-plugin");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("webpack-manifest-plugin");

/***/ })
/******/ ]);
});
//# sourceMappingURL=cli.js.map