'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 项目创建

/**
 * xq-cli 命令列表
 */
let actionMap = {
    // 项目创建
    create: {
        description: "创建一个新项目",
        usages: ['xq-cli create ProjectName', 'xqc create ProjectName'],
        alias: 'c' // 命令简写
    }

    // 添加create、init、dev命令
};Object.keys(actionMap).forEach(action => {
    if (actionMap[action].options) {
        Object.keys(actionMap[action].options).forEach(option => {
            let obj = actionMap[action].options[option];
            _commander2.default.option(obj.flags, obj.description, obj.defaultValue);
        });
    }

    _commander2.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(() => {
        switch (action) {
            case 'create':
                // create(...process.argv.slice(3));
                console.log('hhhhh');
                break;
            default:
                break;
        }
    });
});
// 项目版本
_commander2.default.version(require('../package.json').version, '-v --version').parse(process.argv);

if (!process.argv.slice(2).length) {
    _commander2.default.outputHelp();
}