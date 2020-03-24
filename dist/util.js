'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 文件是否存在
let isExist = async name => {
    return new Promise(resolve => {
        if (_fs2.default.existsSync(name)) {
            console.log(_logSymbols2.default.error, _chalk2.default.red('文件夹名已被占用，请更换名字重新创建'));
        } else {
            resolve();
        }
    });
};

// 询问用户
let promptList = [{
    type: 'list',
    name: 'frame',
    message: 'please choose this project template',
    choices: ['vue', 'react']
}, {
    type: 'input',
    name: 'description',
    message: 'Please enter the project description:'
}, {
    type: 'input',
    name: 'author',
    message: 'Please enter the author name:'
}];

let prompt = () => {
    return new Promise(resolve => {
        // inquirer提供prompt函数来实现询问，其参数为数组，询问将按数组的顺序来
        _inquirer2.default.prompt(promptList).then(answer => {
            resolve(answer);
        });
    });
};

// 项目模块远程下载
let downLoadTemplate = async (ProjectName, api) => {
    return new Promise((resolve, reject) => {
        (0, _downloadGitRepo2.default)(api, ProjectName, { clone: true }, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// 更新json配置文件
let updateJsonFile = (fileName, obj) => {
    return new Promise(resolve => {
        if (_fs2.default.existsSync(fileName)) {
            // 读出模板下的package.json文件
            const data = _fs2.default.readFileSync(fileName).toString();
            // 转为json对象
            let json = JSON.parse(data);
            // 将用户输入的更新到模板package.json文件
            Object.keys(obj).forEach(key => {
                json[key] = obj[key];
            });
            // 重写模板下的package.json文件
            _fs2.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
            resolve();
        }
    });
};

module.exports = {
    isExist,
    prompt,
    downLoadTemplate,
    updateJsonFile
};