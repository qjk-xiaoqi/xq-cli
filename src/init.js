import child from 'child_process';
import symbol from 'log-symbols';
import chalk from 'chalk';

let init = ()=>{
    child.exec('git init', ()=> {
        console.log(symbol.success, chalk.green('git 初始化完成'));
        child.exec('npm install', (error, stdout, stderr) => {
            console.log(symbol.success, chalk.green(stdout));
            console.log(symbol.error, chalk.red(stderr));
            if(error !== null) {
                console.log(symbol.error, chalk.red(error));
            }else{
                console.log(symbol.success, chalk.green('npm依赖安装完成'));
            }
        }, (err)=>{
            console.log(err);
        });
        },(err) => {
            console.log(err);
        });
    })
}

module.exports = init;