 import program from 'commander';
 import symbol from 'log-symbols';
 import chalk from 'chalk';

 import create from './create'; // 项目创建
 import init from './init'; //  项目初始哈
 import dev from './dev'; //  项目启动
 import build from './build'; //  项目打包

 /**
  * xq-cli 命令列表
  */
 let actionMap = {
    // 项目创建
    create: {
        description: "创建一个新项目",
        usages: [
            'xq-cli create ProjectName',
            'xqc create ProjectName'
        ],
        alias: 'c' // 命令简写
    },
    // 项目初始化
    init: {
        description: '初始化项目',
        usages: [
            'xq-cli init',
            'xqc init'
        ],
        alias: 'i',
    },
    // 启动项目
    dev: {
        description: '本地启动项目',
        usages: [
            'xq-cli dev',
            'xqc dev'
        ],
        options: [
            {
            flags: `-p --port <prot>`,
            description: '端口',
            defaultValue: 3000
            }
        ],
        alias: 'd',
    },
    // 打包： 
    build: {
        description: '服务器项目打包',
        usages: [
            'xq-cli build',
            'xqc build'
        ],
        alias: 'b'
    }
 }


 // 添加create、init、dev命令
 Object.keys(actionMap).forEach(action => {
    if(actionMap[action].options) {
        Object.keys(actionMap[action].options).forEach(option => {
            let obj =  actionMap[action].options[option];
            program.option(obj.flags, obj.description, obj.defaultValue);
        })
    }
 
    program
        .command(action)
        .description(actionMap[action].description)
        .alias(actionMap[action].alias)
        .action(()=>{
            switch (action) {
                case 'create':
                    create(...process.argv.slice(3));
                    break;
                case 'init':
                    init();
                    break;
                case 'dev': 
                    dev(program.port);
                    break;
                case 'build': 
                    build();
                    break;
                default:
                    break;
            }
        })
 });
// 项目版本
program
    .version(require('../package.json').version, '-v --version')
    .parse(process.argv);

    
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
    
