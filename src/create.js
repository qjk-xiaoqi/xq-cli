import symbol from 'log-symbols';
import chalk from 'chalk';
import ora from 'ora';

import { 
    isExist,
    prompt,
    downLoadTemplate,
    updateJsonFile
} from './util';

let create = async(ProjectName) => {
    // 项目名不能为空
    if(ProjectName === undefined) {
        console.log(symbol.error, chalk.red('请输入项目名'));
    }else{
        // 如果文件名不存在，继续执行
        isExist(ProjectName).then(()=>{
            // 询问用户
            prompt().then((answer) => {
                // 目前只有vue模块，先跳过react模块
                if(answer.frame === 'react') {
                    console.log(symbol.warning, chalk.yellow('react模板在路上'));
                    process.exit(1);
                }
         
                // 根据用户输入的配置信息下载模板 & 更新模板配置，下载模板比较耗时，这里通过ora插入下载loading
             
                let loading = ora('模板下载中...');
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
                downLoadTemplate(ProjectName, api)
                .then(()=>{
                    loading.succeed('模板下载完成');
                    // 下载完成后，根据用户输入配置文件
                    const fileName = `${ProjectName}/package.json`;
                    answer.name = ProjectName;
                    updateJsonFile(fileName, answer)
                    .then(() => {
                    console.log(symbol.success, chalk.green('配置文件更新完成'));
                     })
                },()=>{
                    loading.fail('模板下载失败');
                });  
            })
        });
    }
};

module.exports = create;