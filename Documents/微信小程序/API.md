
* wx.canIUse 判断小程序的API，回调，参数，组件等是否在当前版本可用
* wx.base64ToArrayBuffer 将 Base64 字符串转成 ArrayBuffer 对象
* wx.arrayBufferToBase64 将 Base64 字符串转成 ArrayBuffer 对象
* wx.getSystemInfoSync() 获得设备相关信息
* wx.getSystemInfo(Object object) 获取系统信息
* wx.getLaunchOptionsSync() 小程序启动参数
* wx.onPageNotFound(function callback)  页面不存在事件
* wx.onAppShow(function callback) 监听小程序切前台事件
* wx.onAppHide(function callback) 监听小程序切后台事件

# 路由

* wx.switchTab(Object object) 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
* wx.reLaunch(Object object) 关闭所有页面，打开到应用内的某个页面
* wx.redirectTo(Object object) 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
* wx.navigateTo(Object object) 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
* wx.navigateBack(Object object) 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层

# 交互

* wx.showToast(Object object) wx.hideToast 显示消息提示框
* wx.showModal(Object object) 显示模态对话框
* wx.showLoading(Object object) 显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
* wx.showActionSheet(Object object) 显示操作菜单
* wx.showNavigationBarLoading(Object object) 在当前页面显示导航条加载动画
* wx.setNavigationBarTitle(Object object) 动态设置当前页面的标题
* wx.setNavigationBarColor(Object object) 设置页面导航条颜色
* wx.setBackgroundTextStyle(Object object) 动态设置下拉背景字体、loading 图的样式
* wx.setBackgroundColor(Object object) 动态设置窗口的背景色