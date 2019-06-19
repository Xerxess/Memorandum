
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
* wx.stopPullDownRefresh(Object object) 下拉刷新
* wx.startPullDownRefresh(Object object) 下拉刷新
* wx.pageScrollTo(Object object) 滚动页面
* wx.setTopBarText(Object object) 动态设置置顶栏文字内容。
* wx.nextTick(function callback) 下一贞执行

# 设备

* wx.scanCode(Object object) 扫码
* wx.vibrateShort(Object object) 长震动15ms
* wx.vibrateLong(Object object) 长震动400ms
* wx.onMemoryWarning(function callback) 内存警告
* wx.makePhoneCall(Object object) 拨打电话
* wx.onNetworkStatusChange(function callback) 监听网络
* wx.setClipboardData(Object object) 剪切板
* wx.getClipboardData(Object object) 剪切板

# Request

https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html

* wx.request(Object object) 发网络请求
* DownloadTask wx.downloadFile(Object object) 下载
* UploadTask wx.uploadFile(Object object) 上传

# Storage

https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html

# Map

https://developers.weixin.qq.com/miniprogram/dev/api/media/map/wx.createMapContext.html

* MapContext wx.createMapContext(string mapId, Object this)

* MapContext.getCenterLocation(Object object) 获取当前地图中心的经纬度。返回的是 gcj02 坐标系，可以用于 wx.openLocation()
* MapContext.getRegion(Object object) 获取当前地图的视野范围
* MapContext.getScale(Object object) 获取当前地图的缩放级别
* MapContext.includePoints(Object object) 缩放视野展示所有经纬度
* MapContext.moveToLocation() 将地图中心移动到当前定位点。需要配合map组件的show-location使用
* MapContext.translateMarker(Object object) 平移marker，带动画

# 位置

* wx.openLocation(Object object) 使用微信内置地图查看位置
* wx.getLocation(Object object) 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用
* wx.chooseLocation(Object object) 打开地图选择位置

# 图片

* wx.previewImage(Object object) 新页面中全屏预览图片
* wx.compressImage(Object object) 压缩图片
* wx.chooseImage(Object object) 从本地相册选择图片或使用相机拍照。

# 相机

* CameraContext wx.createCameraContext()

* CameraFrameListener CameraContext.onCameraFrame(function callback) 获取 Camera 实时帧数据
* CameraContext.takePhoto(Object object) 拍摄照片

# 文件处理(保存、删除、查看、文件内容修改)

 https://developers.weixin.qq.com/miniprogram/dev/api/file/wx.saveFile.html

# 开放接口

* wx.login(Object object) 调用接口获取登录凭证（code）。
* Object wx.getAccountInfoSync() 获取当前帐号信息
* wx.getUserInfo(Object object) 获取用户信息
* wx.getWeRunData(Object object) 获取用户过去三十天微信运动步数。

# WXML

* SelectorQuery wx.createSelectorQuery()
* NodesRef SelectorQuery.exec(function callback) 执行所有的请求。请求结果按请求次序构成数组，在callback的第一个参数中返回
* SelectorQuery SelectorQuery.in(Component component) 将选择器的选取范围更改为自定义组件 component 内。
* NodesRef SelectorQuery.select(string selector)  在当前页面下选择第一个匹配选择器 selector 的节点
* NodesRef SelectorQuery.selectAll(string selector) 在当前页面下选择匹配选择器 selector 的所有节点
* NodesRef SelectorQuery.selectViewport() 选择显示区域。可用于获取显示区域的尺寸、滚动位置等信息

selector 语法：

* ID选择器：#the-id
* class选择器（可以连续指定多个）：.a-class.another-class
* 子元素选择器：.the-parent > .the-child
* 后代选择器：.the-ancestor .the-descendant
* 跨自定义组件的后代选择器：.the-ancestor >>> .the-descendant
* 多选择器的并集：#a-node, .some-other-nodes

NodesRef：

* SelectorQuery NodesRef.boundingClientRect(function callback) 添加节点的布局位置的查询请求。相对于显示区域，以像素为单位。其功能类似于 DOM 的 getBoundingClientRect。返回 NodesRef 对应的 SelectorQuery。
* SelectorQuery NodesRef.context(function callback) 添加节点的 Context 对象查询请求。目前支持 VideoContext、CanvasContext、LivePlayerContext 和 MapContext 的获取
* NodesRef.fields(Object fields) 获取节点的相关信息。需要获取的字段在fields中指定。返回值是 nodesRef 对应的 selectorQuery
* SelectorQuery NodesRef.scrollOffset(function callback) 添加节点的滚动位置查询请求。以像素为单位。节点必须是 scroll-view 或者 viewport，返回 NodesRef 对应的 SelectorQuery

IntersectionObserver:

* IntersectionObserver.relativeTo(string selector, Object margins) 使用选择器指定一个节点，作为参照区域之一。
* IntersectionObserver.relativeToViewport(Object margins) 指定页面显示区域作为参照区域之一
* IntersectionObserver.observe(string targetSelector, IntersectionObserver.observeCallback callback) 指定目标节点并开始监听相交状态变化情况
* IntersectionObserver.disconnect() 停止监听。回调函数将不再触发