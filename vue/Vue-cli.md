# Vue CLI 3

[https://github.com/vuejs/vue-cli](https://github.com/vuejs/vue-cli)

环境要求：node.js 8.9+

建议：`nvm` + `nrm` 管理   
https://github.com/creationix/nvm   版本管理  
https://github.com/Pana/nrm 

>安装

```js
npm install -g @vue/cli

//检测安装结果
vue --version
```


>创建项目

```js
//创建项目
vue create hello-world

//获得帮助
vue create --help

//使用GUI
vue ui
```

> 插件和预设

Vue CLI使用基于插件的体系结构。如果您检查新创建的项目package.json，您将找到以之为开头的依赖项`@vue/cli-plugin-`。插件可以修改内部webpack配置并注入命令vue-cli-service。项目创建过程中列出的大多数功能都是作为插件实现的。

在现有项目中安装插件
```js
vue add @vue/eslint
```

> vue.config.js

vue.config.js是一个可选的配置文件，如果它存在于项目根目录（package.json旁边）中，它将由@ vue / cli-service自动加载。您也可以使用package.json中的vue字段，但请注意，在这种情况下，您将仅限于与JSON兼容的值。

* `baseUrl` 将部署应用程序的基本URL
* `outputDir` 默认`dist` 运行vue-cli-service构建时将生成生成构建文件的目录
* `assetsDir` 用于嵌套生成的静态资产（js，css，img，fonts）的目录。
* `pages` 以多页模式构建应用程序。
* `lintOnSave` 是否使用eslint-loader在开发期间执行lint-on-save。
* `runtimeCompiler` 是否使用包含运行时编译器的Vue核心的构建。
* `transpileDependencies` 默认情况下，babel-loader会忽略node_modules中的所有文件。
* `productionSourceMap` 如果您不需要源地图进行生产，则将此设置为false可以加快生产构建
* `configureWebpack` 如果值是Object，则它将使用webpack-merge合并到最终配置中。 如果值是函数，它将接收已解析的配置作为参数。该函数可以改变配置并返回任何内容，或者返回配置的克隆或合并版本。
* `chainWebpack` 一个函数，它将接收由webpack-chain提供支持的ChainableConfig实例。允许对内部webpack配置进行更细粒度的修改。
* `css.modules` 默认情况下，只有以* .module。[ext]结尾的文件才会被视为CSS模块。
* `css.extract` 是否将组件中的CSS提取到独立的CSS文件中（而不是在JavaScript中内联并动态注入）
* `css.sourceMap` 是否为CSS启用源映射。
* `css.loaderOptions` 将选项传递给与CSS相关的加载器。
* `devServer`  支持webpack-dev-server的所有选项。注意： 主机，端口和https等某些值可能会被命令行标志覆盖。 不应修改某些值，如publicPath和historyApiFallback，因为它们需要与baseUrl同步才能使dev服务器正常运行。 #devServer.proxy
* `devServer.proxy` 如果您的前端应用程序和后端API服务器未在同一主机上运行，​​则需要在开发期间将API请求代理到API服务器。
* `parallel` 是否使用线程加载器进行Babel或TypeScript转换
* `pwa` 将选项传递给PWA插件
* `pluginOptions` 这是一个没有经过任何模式验证的对象，因此它可以用于将任意选项传递给第三方插件。

> 环境变量和模式

您可以通过将以下文件放在项目根目录中来指定env变量：
```js
.env                # 在所有情况下加载
.env.local          # 在所有情况下加载，被git忽略
.env.[mode]         # 仅在指定模式下加载
.env.[mode].local   # 仅在指定模式下加载，被git忽略
```

env文件只包含环境变量的键=值对：
```js
FOO=bar
VUE_APP_SECRET=secret
```

`在客户端代码中使用Env变量`

只有以VUE_APP_开头的变量才会通过webpack.DefinePlugin静态嵌入到客户端软件包中。您可以在应用程序代码中访问它们：

```js
console.log(process.env.VUE_APP_SECRET)
```
两个特殊变量

`NODE_ENV` - 这将是“development”，“production”或“test”之一，具体取决于应用程序运行的模式。   
`BASE_URL` - 这对应于vue.config.js中的baseUrl选项，是部署应用程序的基本路径。
