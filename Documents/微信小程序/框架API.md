# 框架API

* App(Object object) 注册小程序
* AppObject getApp(Object object) 获取到小程序全局唯一的 App 实例。
* Page(Object object) 注册小程序中的一个页面
* PageObject[] getCurrentPages() 获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面
* Component(Object object) 创建自定义组件
* Behavior(Object object) 注册一个 behavior(重用代码)
* any require(string path)
* Object module
* Object exports
* Object wx 小程序 API 全局对象，用于承载小程序能力相关 API。
* Object wx.env 小程序环境变量对象
* console
* 定时器 同 js 相同
