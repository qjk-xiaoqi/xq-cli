import child from 'child_process';
import symbol from 'log-symbols';
import chalk from 'chalk';
import {updateJsonFile} from './util.js';
import ora from 'ora';
// child.exec(`git init`, ()=> {
    //     console.log(symbol.success, chalk.green('git 初始化完成'));
    //     child.exec(`npm install`, (error, stdout, stderr) => {
    //         console.log(symbol.success, chalk.green(stdout));
    //         console.log(symbol.error, chalk.red(stderr));
    //         if(error !== null) {
    //             console.log(symbol.error, chalk.red(error));
    //         }else{
    //             console.log(symbol.success, chalk.green('npm依赖安装完成'));
    //         }
    //     }, (err)=>{
    //         console.log(err);
    //     });
    //     },(err) => {
    //         console.log(err);
    //     });
let init = async (username, token)=>{
    
    try {
        await loadCmd(`git init`,'git初始化');
        if(username === '' || token === '') {
            console.log(symbol.warning, chalk.yellow('缺少参数无法创建远程仓库'));
        }else {
            const projectName = process.cwd().split('\\').slice(-1)[0];
            await loadCmd(`curl -u qjk-xiaoqi:a97fc56cbefe4bdc092490067bb1a9727615a583 https://api.github.com/user/repos -d "{\"name\": \"kkk\"}"`, 'Github仓库创建');
            // curl -u qjk-xiaoqi:a97fc56cbefe4bdc092490067bb1a9727615a583 https://api.github.com/user/repos -d "{\"name\": \"auto\"}"
            await loadCmd(`git remote add origin https://github.com/${username}/${projectName}.git`, '关联远端仓库')
            let loading = ora();
            loading.start(`package.json更新repository：命令执行中...`);
            await updateJsonFile('package.json', {
                "repository": {
                    "type": "git",
                    "url": `https://github.com/${username}/${projectName}.git`
                }
            }).then(() => {
                loading.succeed(`package.json更新repository: 命令执行完成`);
            });
            await loadCmd(`git add .`,"执行 git add");
            await loadCmd(`git commit -a -m "init"`, '执行git commit')
            await loadCmd(`git push --set-upstream origin master`, '执行git push')           
        }
        await loadCmd(`npm install`,"安装依赖");
    }catch(err) {
        console.log(symbol.error, chalk.red('初始化失败'));
        console.log(symbol.error, chalk.red(err));
        process.exit(1);
    }

}

let loadCmd = async(cmd, text) =>{
    let loading = ora();
    loading.start(`${text}: 命令执行中...`);
    await child.exec(cmd);
    loading.succeed(`${text}: 命令执行完成`)
}
module.exports = init;