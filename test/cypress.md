<!-- TOC -->

- [cypress](#cypress)
- [安装Cypress](#安装cypress)
    - [二进制缓存](#二进制缓存)
- [配置Cypress](#配置cypress)
- [编写第一个测试](#编写第一个测试)
    - [访问页面](#访问页面)
    - [查询一个元素](#查询一个元素)
    - [点击一个元素](#点击一个元素)
    - [写断言](#写断言)
    - [页面转变](#页面转变)
    - [特殊命令](#特殊命令)
- [元素](#元素)
    - [查询元素](#查询元素)
    - [元素交互](#元素交互)
    - [元素相关的断言](#元素相关的断言)
    - [断言](#断言)
    - [默认断言](#默认断言)
- [目录结构](#目录结构)
- [元素交互](#元素交互-1)
    - [可见性](#可见性)
    - [不可操作](#不可操作)
    - [元素覆盖](#元素覆盖)
    - [滚动](#滚动)
    - [坐标](#坐标)
    - [强制执行事件](#强制执行事件)
- [测试执行器](#测试执行器)
    - [选择定位器](#选择定位器)
- [网络请求](#网络请求)
    - [测试场景](#测试场景)
    - [代理响应](#代理响应)
    - [代理](#代理)
    - [路由](#路由)
    - [数据模拟](#数据模拟)
    - [强制等待相应](#强制等待相应)
- [Events](#events)
- [断言](#断言-1)
    - [编写断言](#编写断言)
- [浏览器常用的命令](#浏览器常用的命令)

<!-- /TOC -->

https://github.com/cypress-io/cypress

https://docs.cypress.io/zh-cn/guides/getting-started/installing-cypress.html

# cypress

* 完整的端到端测试
* Cypress建立在Mocha 和 Chai之上
* Chai的 BDD 和 TDD
* Mocha 提供了 describe()，context()，it()和specify()方法



# 安装Cypress

```cmd
npm install cypress --save-dev


./node_modules/.bin/cypress open
```

## 二进制缓存

* MacOS: ~/Library/Caches/Cypress
* Linux: ~/.cache/Cypress
* Windows: /AppData/Local/Cypress/Cache

# 配置Cypress

https://docs.cypress.io/guides/references/configuration.html#Options

* cypress.json
```json
//全局
baseUrl:
env
port

// 超时
defaultCommandTimeout
execTimeout
taskTimeout
// 页面加载事件的时间
pageLoadTimeout:60000 
// 等待cy.wait()命令发出XHR请求的时间(以毫秒为单位)
requestTimeout:5000 
// 等待响应的时间(以毫秒为单位)，直到cy.request()、cy.wait()、cy.fixture()、cy.getCookie()、cy.getCookies()、cy.setCookie()、cy.clearCookie()、cy.clearCookies()和cy.screenshot()中的一个返回响应。
responseTimeout:30000

// 截屏
// 截屏存放的文件夹路径
screenshotsFolder:'cypress/screenshots',
// 在使用cypress run运行测试之前，Cypress是否会清除screenshotsFolder和videosFolder中的资源
trashAssetsBeforeRuns:true

// 视频
// 测试之前，是否会清除screenshotsFolder和videosFolder中的资源
trashAssetsBeforeRuns:true
// 视频压缩的质量设置
videoCompression:32
// 
videosFolder:'cypress/videos'
// 
video:true

// 浏览器
// 是否启用跨域
chromeWebSecurity:true
// 
userAgent:''

// 视口
viewportHeight:600
viewportWidth:1000


```



# 编写第一个测试

## 访问页面

```js
describe('My First Test', function() {
  it('Visits the Kitchen Sink', function() {
    cy.visit('https://example.cypress.io')
  })
})
```

## 查询一个元素

```js
// 元素的内容
cy.contains('type')

// 通过css
cy.get('.action-email')

```

## 点击一个元素

```js
cy.contains('type').click()
```

## 写断言

```js
cy.url().should('include', '/commands/actions')
```

## 页面转变

Cypress自动检测诸如页面跳转事件, 并且将自动停止运行命令, 直到下一个页面加载完成

## 特殊命令

```js
// 类型断点,需要手动继续测试
cy.pause()
cy.debug()
```
# 元素

## 查询元素

```js

cy.get('.my-selector')

// 链式查找
cy.get('#main-content')
  .find('.article')
  .children('img[src^="/static"]')
  .first()
  
// then
cy.get('.my-selector').then(()=>{
    dosome();
})

// 文本内容查询
cy.contains('New Post')

// 设置timeout
cy.get('.my-slow-selector', { timeout: 10000 })
```

## 元素交互

```js
.blur() - 移开DOM元素上的焦点.
.focus() - 聚焦DOM元素.
.clear() - 清除输入或文本区域的值.
.check() - 选中复选框或者单选框.
.uncheck() - 取消选中复选框.
.select() - 选择一个含有 <option>属性的<select>元素.
.dblclick() - 双击DOM元素.
```

## 元素相关的断言

```js
cy.get(':checkbox').should('be.disabled')
cy.get('form').should('have.class', 'form-horizontal')
cy.get('input').should('not.have.value', 'US')
```

## 断言

```js
// 点击 <button>后,期望class=active
cy.get('button').click().should('have.class', 'active')
```

## 默认断言

```js
cy.visit() 预期这个页面是状态为200的 text/html内容页。
cy.request() 预期远程服务器存在并提供响应。
cy.contains() 预期包含内容的元素最终存在于DOM中。
cy.get() 预期元素最终存在于DOM中。
.find() 预期元素最终存在于DOM 中。
.type() 预期元素最终为 可输入 状态。
.click() 预期元素最终为 可操作 状态。
.its() 预期最终找到当前操作对象的一个属性。
```

# 目录结构

* fixtures 测试过程中需要用到的外部静态数据
* integration 测试文件
* plugins 插件文件
* support

# 元素交互

## 可见性

* width=0 或者 height =0  (不可见)
* visibility: hidden (不可见)
* display: none (不可见)
* position: fixed 并且它在屏幕外或被掩盖 (不可见)   

## 不可操作

* disabled 属性是否为 true

## 元素覆盖

* 检查元素是否被覆盖时，我总是检查其中心坐标

## 滚动

## 坐标

* 事件的坐标是在元素的中心被触发

```js
// 改变它被触发的位置
cy.get('button').click({ position: 'topLeft' })
```

## 强制执行事件

```js
// 强制点击这个元素
// 即使此元素‘不可操作’
cy.get('button').click({ force: true })
```

# 测试执行器

## 选择定位器

* 选择定位器是一个互动功能

https://docs.cypress.io/zh-cn/guides/core-concepts/test-runner.html#%E9%80%89%E6%8B%A9%E5%AE%9A%E4%BD%8D%E5%99%A8

# 网络请求

## 测试场景

* 主体进行断言
* 请求的url进行断言
* 请求的头部进行断言
* 响应的主体
* 响应的状态码
* 响应的头部
* 延迟响应
* 等待响应的发生

## 代理响应

代理响应使你能够控制响应的各个方面，包括响应body、status、headers，甚至网络delay。桩速度非常快，大多数响应将在小于20毫秒内返回。

## 代理

* cy.server()
*  cy.route()

## 路由

```js
cy.server()           // 使响应打桩
cy.route({
  method: 'GET',      // 路由所有GET请求
  url: '/users/*',    // url匹配'/users/*'
  response: []        // 强制响应为：[]
})
```

## 数据模拟

```js
cy.server()

// 我们将响应设置为activite.json固件
cy.route('GET', 'activities/*', 'fixture:activities.json')
cy.fixture('activities.json').as('activitiesJSON')
cy.route('GET', 'activities/*', '@activitiesJSON')
```

## 强制等待相应

```js
cy.server()
cy.route('activities/*', 'fixture:activities').as('getActivities')
cy.route('messages/*', 'fixture:messages').as('getMessages')

// 访问dashboard页面将发起与以上两条路由匹配的请求
cy.visit('http://localhost:8888/dashboard')

// 传递一个路由别名数组，迫使Cypress等待，直到它看到与每个别名匹配的请求的响应
cy.wait(['@getActivities', '@getMessages'])

// 这将生成XHR对象，其中包含请求、响应、url、方法等字段
cy.wait('@getSearch')
  .its('url').should('include', '/search?query=Book')

// 在上面的wait命令解析之前，这些命令不会运行
cy.get('h1').should('contain', 'Dashboard')
```

# Events

```js
// window:confirm

// window:alert

// window:before:load

// window:load

// window:before:unload

// window:unload

// url:changed

// viewport:changed

on
once
removeListener
removeAllListeners
```

# 断言

https://github.com/chaijs/chai-jquery

## 编写断言

* 隐式操作对象: 使用 .should() 或者 .and()
* 显示操作对象: 使用 expect

```js
// 隐式操作对象
cy.get('tbody tr:first').should('have.class', 'active')
// 显示操作对象
cy.get('tbody tr:first').should(($tr) => {
  expect($tr).to.have.class('active')
  expect($tr).to.have.attr('href', '/users')
})

// 显示操作对象
expect(true).to.be.true
```

# 浏览器常用的命令

```js
///// 控制应用程序的屏幕尺寸和方向
cy.viewport(width, height)

// 重新载入页面
cy.reload()

// 访问远程URL
cy.visit('http://localhost:3000')

// 等待数毫秒或等待别名资源解析，然后再继续执行下一个命令
cy.wait(500)

_________________________________________


///// 滚动交互

// 滚动到视图中
cy.get('footer').scrollIntoView()
cy.scrollTo(0, 500)
// https://docs.cypress.io/api/commands/scrollto.html#Arguments
cy.get('.sidebar').scrollTo('bottom')


——————————————————————————————————————————

///// 网络

// 发出HTTP请求
cy.request('http://dev.local/seed')

// 管理网络请求的行为
// https://docs.cypress.io/api/commands/route.html#Arguments
cy.route('/users/**')

// 启动服务器以开始将响应路由到cy.route（）并更改网络请求的行为
cy.server()

__________________________________________

///// 浏览器原生组件操作

// 选中复选框或单选
cy.get('[type="checkbox"]').check()
cy.get('.checkbox').check({ force: true })
cy.get('[type="checkbox"]').uncheck()

// 焦点
cy.get('input').first().focus()
cy.get('[type="email"]').type('me@email.com').blur()

// 清除输入或文本区域的值。
cy.get('[type="text"]').clear() 

// 获取一组DOM元素中每个DOM元素的子元素
cy.get('nav').children()

// 点击一个DOM元素
cy.get('.btn').click() 
cy.get('.hidden').click({ force: true })
cy.contains('Today').rightclick() 

// 双击
cy.get('button').dblclick()

// hover
cy.get('.menu-item').trigger('mouseover')

// 对先前产生的主题调用功能
cy.wrap({ animate: fn }).invoke('animate') // Invoke the 'animate' function
cy.get('.modal').invoke('show')            // Invoke the jQuery 'show' function

// 提交表单
cy.get('form').submit()

// 触发DOM元素上的事件
cy.get('a').trigger('mousedown')

// 输入
cy.get('input').type('Hello, World') 

// select
cy.get('select').select('user-1')

__________________________________________


///获取dom元素

cy.root() 

cy.get('.list > li')

// 获取当前活动页面的window.document
cy.document() 

// 获取与选择器匹配的第一个DOM元素（无论是它本身还是它的祖先之一）。
cy.get('td').closest('.filled')

// 获取包含文本的DOM元素。
cy.get('.nav').contains('About')

// 特定索引处获取DOM元素
cy.get('tbody>tr').eq(0)

// 获取与特定选择器匹配的DOM元素
cy.get('td').filter('.users')
cy.get('input').not('.required')

// 获取特定选择器的后代DOM元素
cy.get('.article').find('footer')
cy.get('nav a').first()  
cy.get('nav a').last()
cy.get('nav a:first').next()
cy.get('.active').nextAll()
cy.get('tr.highlight').prev()
cy.get('.active').prevAll()
cy.get('li').siblings('.active')

// 获取当前关注的DOM元素
cy.focused()

// 父级
cy.get('header').parent()
cy.get('aside').parents()
cy.get('p').parentsUntil('.article') // Yield parents of 'p' until '.article'

// 遍历类似结构的数组（具有length属性的数组或对象）
cy.get('ul>li').each(() => {...}) 

__________________________________________

/// 属性值

// 获取先前产生的主题的属性值
cy.wrap({ width: '50' }).its('width') // Get the 'width' property

cy.title() 
cy.url()  

__________________________________________

/// 本地全局功能

// 获取当前活动页面的全局window.location对象
cy.location('host') // Get the host of the location object
cy.location('port') // Get the port of the location object

cy.window()

// 获取当前活动页面的当前URL hash
cy.hash()

// 向后或向前浏览浏览器历史记录中的上一个或下一个URL
cy.go('back')

// 读取文件并产生其内容
cy.readFile('menu.json')
// 写入具有指定内容的文件
cy.writeFile('menu.json')

// 加载位于文件中的一组固定数据
cy.fixture('users').as('usersJson')  // load data from users.json

// colkie
cy.getCookie('auth_key')
cy.getCookies() 
cy.setCookie('auth_key', '123key')
cy.clearCookie('authId') // 清除特定的浏览器cookie
cy.clearCookies() //清除当前域和子域的所有浏览器cookie。
cy.clearLocalStorage()  // clear all local storage

// setTimeout clearTimeout setInterval clearInterval Date
cy.clock() // 创建一个时钟
cy.tick(500) // 使用cy.clock()覆盖本地时间函数后的移动时间

//设置调试器并记录上一命令产生的结果
cy.debug().getCookie('app')

// 执行系统命令
cy.exec('npm run build')
cy.log('created new user')
__________________________________________

///// 延长&叠加&附加 测试

// 创建一个断言。断言将自动重试，直到它们通过或超时。
cy.get('.err').should('be.empty').and('be.hidden')
// 创建一个断言。断言将自动重试，直到它们通过或超时。
cy.get('.error').should('be.empty')

// 结束命令链
cy.contains('ul').end()

// 暂停
cy.pause().getCookie('app')

// 屏幕快照
cy.get('.post').screenshot()

// 分配别名以供以后使用。


/////其他

// 将方法包装在间谍程序中，以记录对函数的调用和参数。
cy.spy(user, 'addFriend')

// 替换功能，记录其用法并控制其行为
cy.stub(user, 'addFriend')

// 通过任务插件事件在Node中执行代码
cy.task('log', 'This will be output to the terminal')

// 使您可以处理上一条命令产生的主题
cy.get('.nav').then(($nav) => {})
```