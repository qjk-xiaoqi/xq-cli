'use strict';

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = require('./webpack.config.js');

let build = () => {
    // 打包
    (0, _webpack2.default)(config, function (err, stats) {
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }));
        console.log(_logSymbols2.default.success, _chalk2.default.green(' 打包完成'));
        process.exit(1);
    });
};

module.exports = build;