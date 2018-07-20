# PostCSS

[https://github.com/postcss/postcss](https://github.com/postcss/postcss)

PostCSS 是一个允许使用 JS 插件转换样式的工具。 这些插件可以检查（lint）你的 CSS，支持 CSS Variables 和 Mixins， 编译尚未被浏览器广泛支持的先进的 CSS 语法，内联图片，以及其它很多优秀的功能。

PostCSS 的 `Autoprefixer` 插件是最流行的 CSS 处理工具之一。

> 使用方法

你可以通过简单的两步便开始使用 PostCSS：

* 在你的构建工具中查找并添加 PostCSS 拓展。
* 选择插件并将它们添加到你的 PostCSS 处理队列中。

> 应用 Webpack

  [`点击查看 postcss-loader`](https://github.com/postcss/postcss-loader) 

```js
//webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  }
}
```

```js
//postcss.config.js
module.exports = {
  plugins: [
    require('precss'),
    require('autoprefixer')
  ]
}
```



> 应用 Gulp

> 应用 浏览器

如果你想编译浏览器里的 CSS 字符串（例如像 CodePen 一样的在线编辑器）， 只需使用 Browserify 或 webpack。它们会把 PostCSS 和插件文件打包进一个独立文件。

如果想要在 React 内联样式／JSS／Radium／其它 CSS-in-JS 里使用 PostCSS， 你可以用 postcss-js 然后转换样式对象。

```js
var postcss  = require('postcss-js')
var prefixer = postcss.sync([ require('autoprefixer') ])

prefixer({ display: 'flex' }) //=> { display: ['-webkit-box', '-webkit-flex', '-ms-flexbox', 'flex'] }
```