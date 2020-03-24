# 脚手架基本功能
- 询问：询问用户新建项目的基本信息
- 下载模板：下载指定项目模板
- 生成配置文件：根据用户输入生成配置文件
- 复制：将模板拷贝到目标文件

# 脚手架运行项目功能
- 本地启动预览
- 热更新
- 语法、代码规范检查

# 部署脚手架项目距
- 代码推送至仓库


# 依赖分析
* babel-cli/babel-env: es6语法转换工具
* commander: 命令行工具
* inquirer: 负责询问
* download-git-repo: 下载远程模板的工具，负责下载仓库模板项目
* chalk: 颜色插件，用来修改命令行输出样式，通过颜色区分info、error日志
* ora: 用于显示加载效果，loading效果
* log-symbols：日志彩色符号，显示√ 或 × 等的图标
# 第一步： npm init 

# 第二步：修改package.json 
* 新建一个bin文件夹，在里面建一个无后缀名的`cmd`文件。这个文件是整个脚手架的入口文件，我们首先对它进行编写。
* 修改bin参数，指定上面`cmd`文件的位置。专门放置用户的自定义命令
* 修改package.json文件的script参数，指定可执行的命令

# 第三步：新建.babelrc配置文件，支持es6语法

# 执行npm link
将bin命令软链接到全局,方便地对模块进行调试和测试

# 项目启动
* 在src/ main.js随意写点东西： console.log('kkk');
* npm run watch 开启实时监控
* 执行xq-cli    终端打印kkk

# 处理命令行
使用commander API来设置不同的命令 
+ command --- 定义命令行指令，后面接一个name
+ alias --- 定义一个更短的命令行指令
+ description --- 描述
+ option --- 定义参数
+ action  --- 注册一个callback函数
+ parse --- 解析命令行

# 项目思路
脚手架支持用户4种命令：项目创建、项目初始化、项目启动、项目打包。下面一一实现
## 创建项目 create命令
* 检测文件夹是否被占用
* 询问用户新建项目的基本信息
* 下载指定模板
* 根据用户输入更新配置文件
执行xq-cli/xqc c ProjectName就可以下载模板到本地
## 项目初始化 init命令
* 初始化git仓库，方便代码提交管理
* 进入项目目录安装依赖
进入项目目录，执行xq-cli/xqc init 完成项目的初始化
## 项目启动 dev -p <port>命令
可以让我们的项目在本地运行，使用webpack来实现项目的本地启动
依赖分析：
* webpack webpack-cli
* webpack-dev-server： 支持热更新
* html-webpack-plugin: 将打包文件插入模板文件
* open-browser-webpack-plagin：项目启动后自动打开浏览器
* vue-loader、vue-template-compiler: 解析vue
* style-loader、css-loader、less-loader、sccs-loader: 解析style、css、sccs、less
* ts-loader: 解析typescript

编写webpack.config.js文件后，执行xq-cli dev -p <port>来启动项目。

## 项目打包  build命令
输入打包命令时，直接执行webpack(config, ()=>{})













