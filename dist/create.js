'use strict';

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let create = async ProjectName => {
    // 项目名不能为空
    if (ProjectName === undefined) {
        console.log(_logSymbols2.default.error, _chalk2.default.red('请输入项目名'));
    } else {
        // 如果文件名不存在，继续执行
        (0, _util.isExist)(ProjectName).then(() => {
            // 询问用户
            (0, _util.prompt)().then(answer => {
                // 目前只有vue模块，先跳过react模块
                if (answer.frame === 'react') {
                    console.log(_logSymbols2.default.warning, _chalk2.default.yellow('react模板在路上'));
                    process.exit(1);
                }

                // 根据用户输入的配置信息下载模板 & 更新模板配置，下载模板比较耗时，这里通过ora插入下载loading

                let loading = (0, _ora2.default)('模板下载中...');
                loading.start('模板下载中...');

                let api = '';
                switch (answer.frame) {
                    case 'vue':
                        api = 'direct:https://github.com/For-Article/vue-temlate.git';
                        break;
                    case 'react':
                        api = 'direct:https://github.com/For-Article/react-temlate.git';
                        break;
                    default:
                        break;
                }
                // 下载模板
                (0, _util.downLoadTemplate)(ProjectName, api).then(() => {
                    loading.succeed('模板下载完成');
                    // 下载完成后，根据用户输入配置文件
                    const fileName = `${ProjectName}/package.json`;
                    answer.name = ProjectName;
                    (0, _util.updateJsonFile)(fileName, answer).then(() => {
                        console.log(_logSymbols2.default.success, _chalk2.default.green('配置文件更新完成'));
                    });
                }, () => {
                    loading.fail('模板下载失败');
                });
            });
        });
    }
};

module.exports = create;