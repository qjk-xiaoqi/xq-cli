'use strict';

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let init = () => {
    _child_process2.default.exec(`git init`, () => {
        console.log(_logSymbols2.default.success, _chalk2.default.green('git 初始化完成'));
        _child_process2.default.exec(`npm install`, (error, stdout, stderr) => {
            console.log(_logSymbols2.default.success, _chalk2.default.green(stdout));
            console.log(_logSymbols2.default.error, _chalk2.default.red(stderr));
            if (error !== null) {
                console.log(_logSymbols2.default.error, _chalk2.default.red(error));
            } else {
                console.log(_logSymbols2.default.success, _chalk2.default.green('npm依赖安装完成'));
            }
        }, err => {
            console.log(err);
        });
    }, err => {
        console.log(err);
    });
};

module.exports = init;