 import program from 'commander';
 import symbol from 'log-symbols';
 import chalk from 'chalk';

 import create from './create'; // 项目创建

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
                    // create(...process.argv.slice(3));
                    console.log('hhhhh');
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
    
