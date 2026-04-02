
# React Native 的模块

## 社区模块推荐

- react-native-safe-area-context 一种在 JS 中灵活处理安全区域内边距的方法。也适用于 Android 和 Web！
- @react-navigation/native React Native 集成，用于 React Navigation
- expo-constants 提供在应用程序生命周期内保持不变的系统信息。
- react-native-screens 适用于 React Native 应用的原生导航基元。
- @react-native-async-storage/async-storage 用于 React Native 的异步、持久化键值存储系统。
- expo-file-system 提供对设备上本地文件系统的访问权限。
- @react-native-community/datetimepicker 提供对系统 UI 的访问以选择日期和时间的组件。
- @react-native-community/slider 一个 React Native 组件库，提供对系统 UI 的访问，用于滑块控件。
- @react-native-picker/picker 一个跨平台组件，提供对系统用户界面的访问，以便在多个选项之间进行选择。
- @react-native-segmented-control/segmented-control 一个 React Native 库，提供一个组件来渲染来自 iOS 的 UISegmentedControl。
- @shopify/flash-list 一个 React Native 组件，提供快速高效的列表渲染方式。可直接替代 React Native 的 <FlatList> 组件。
- react-native-gesture-handler 一个提供用于处理复杂手势的 API 的库。
- react-native-keyboard-controller 一个提供键盘管理器的库，该管理器在 Android 和 iOS 上的工作方式完全相同。
- react-native-pager-view 一个组件库，提供类似轮播图的视图，用于滑动浏览内容页面。
- react-native-reanimated 一个提供 API 的库，可以大大简化创建流畅、强大且易于维护的动画的过程。
- react-native-safe-area-context 一个提供灵活 API 的库，用于访问设备的安全区域内嵌信息。
- react-native-screens 一个提供原生原语来表示屏幕的库，以实现更好的操作系统行为和屏幕优化。
- react-native-svg 一个允许在应用程序中使用 SVG 的库。
- react-native-view-shot 一个可以捕获 React Native 视图并将其保存为图像的库。
- react-native-webview 提供 WebView 组件的库。

## Expo 

- expo-video 一个提供 API 的库，用于在应用程序中实现视频播放。
- expo-status-bar 一个提供与 React Native StatusBar API 相同接口的库，但默认值略有不同，以便在 Expo 环境中完美运行。
- expo-screen-orientation 用于管理设备屏幕方向的通用库。
- expo-screen-capture 一个可以保护应用程序屏幕不被捕获或录制的库。
- expo-notifications 一个提供 API 的库，用于获取推送通知令牌，以及显示、安排、接收和响应通知。
- expo-media-library 提供对设备媒体库访问权限的库。
- expo-location 提供从设备读取地理位置信息、轮询当前位置或订阅位置更新事件的库。
- expo-image-picker 个提供对系统用户界面进行访问的库，用于从手机图库中选择图像和视频，或使用相机拍照。
- expo-image 一个跨平台、高性能的 React 组件，用于加载和渲染图像。
- expo-haptics 一个库，可提供对 Android 系统振动效果、iOS 触觉引擎和 Web 振动 API 的访问。
- expo-glass-effect 使用 iOS 原生 UIVisualEffectView 渲染液态玻璃效果的 React 组件。
- expo-device 提供对物理设备的系统信息的访问，例如其制造商和型号。
- expo-clipboard 提供了一个用于在 Android、iOS 和 Web 上获取和设置剪贴板内容的界面。
- expo-battery 一个提供物理设备电池信息以及相应事件监听器的库。
- expo-camera 一个 React 组件，用于渲染设备前置或后置摄像头的预览。

## 核心内置模块

- 基础组件：View (容器)、Text (文本)、Image (图片)、TextInput (输入框)。
- 列表组件：FlatList (高性能长列表) 和 SectionList (分组列表)。
- 交互与反馈：TouchableOpacity / Pressable (点击交互)、ScrollView (滚动视图)。
- 功能模块
    - Alert：调起系统弹窗
    - StyleSheet：类似 CSS 的样式定义
    - Platform：用于编写平台差异化代码（iOS/Android）
    - Dimensions / useWindowDimensions：获取屏幕尺寸
    - Linking：处理深度链接（Deep Linking）和外部跳转

## 导航与路由 (Navigation)

- React Navigation：社区标准库，支持堆栈导航 (Stack)、底部标签 (Tab) 和侧边栏 (Drawer)。

## 数据交互与存储

- 网络请求：官方推荐使用标准的 Fetch API；开发者也常配合使用 Axios。
- 本地存储：内置的 AsyncStorage 已从核心库移出，现在常用 @react-native-async-storage/async-storage (简单键值对) 或 Realm / SQLite (复杂数据库)。
- 状态管理：Redux (配合 Redux Toolkit) 或轻量级的 Zustand。

## 设备功能与硬件

- 图标库：react-native-vector-icons (包含 AntDesign, FontAwesome 等)。
- 设备信息：react-native-device-info (获取版本号、电量、机型等)。
- 多媒体
    - react-native-image-picker：相册选择与拍照。
    - react-native-video：视频播放。

## UI 组件库 (提高开发效率)

- Lottie for React Native：解析并渲染高质量的 Adobe After Effects 动画。
- NativeBase / React Native Paper：提供现成的 Material Design 组件。

## 开发工具框架

- Expo：一个功能强大的工作流套件，内置了上述绝大多数常用模块（如相机、传感器、通知等），非常适合快速原型开发和中小规模应用