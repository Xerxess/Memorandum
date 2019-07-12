<!-- TOC -->

- [全局](#全局)
- [tabbar常见问题](#tabbar常见问题)
- [manifest.json](#manifestjson)

<!-- /TOC -->

# 全局

* globalStyle 窗口表现
* pages *页面路径及窗口表现
* tabBar  tab 的表现
* condition 启动模式配置
* subPackages 分包加载配置
* preloadRule 分包预下载规则 wx
* workers Worker 代码放置的目录 wx

# tabbar常见问题

* 如需 tabbar 中间凸起，App端可使用plus.nativeObj.view，参考。H5端可使用view自绘。
* 如果不使用原生tabbar，在前端自己实现tabbar，在小程序和App端的性能体验不如原生tabbar
* Android App上弹出键盘顶起tabbar的问题。如果是搜索框，建议点击后新开页面搜索（hello uni-app有例子）；也可以动态隐藏tabbar；也可以配置 manifest.json 中 app-plus->softinput->mode 设置为 adjustPan，注意仅打包后生效。详见manifest配置
* 原生的tabbar只有一个且在首页。二级页的tab，或者用前端实现，或者App端使用nvue。
* 如果是需要先登录、后进入tab页面，不需要把登陆页设为首页，首页仍然是tabbar页
* 前端弹出遮罩层挡不住tabbar的问题，跨端处理方式时动态隐藏tabbar。App端可以使用plus.nativeObj.view做弹出和遮罩.

# manifest.json

* 应用的配置文件，用于指定应用的名称、图标、权限等
* transformPx 是否转换项目的px，为true时将px转换为upx，为false时，px为传统的实际像素
* networkTimeout 网络超时时间
* app-plus 5+App 特有配置
* mp-weixin 微信小程序特有配置
  
注：
* 注意区分 uni-app 的 appid 与微信小程序、iOS 等其它平台分配的 appid，以及第三方 SDK 的 appid。