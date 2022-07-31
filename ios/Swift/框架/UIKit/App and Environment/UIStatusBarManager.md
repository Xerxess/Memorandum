<!-- TOC -->

- [UIStatusBarManager](#uistatusbarmanager)
- [API](#api)
    - [Getting the status bar configuration 获取状态栏配置](#getting-the-status-bar-configuration-获取状态栏配置)
    - [Getting the frame rectangle  获得框架矩形](#getting-the-frame-rectangle--获得框架矩形)

<!-- /TOC -->

# UIStatusBarManager

描述状态栏配置的对象。

使用UIStatusBarManager对象获取其关联场景的状态栏的当前配置。
您`不会直接创建UIStatusBarManager`对象。可以从UIWindowScene对象的statusBarManager属性中检索现有对象。

`不应该使用此对象来修改状态栏`的配置。相反，可以为每个UIViewController对象单独设置状态栏配置。
例如，要修改状态栏的默认可见性，请覆盖视图控制器的prefersStatusBarHidden属性。

```swift
@MainActor class UIStatusBarManager : NSObject
```

# API

##  Getting the status bar configuration 获取状态栏配置

```swift
// 一个布尔值，指示状态栏当前是否隐藏。
var isStatusBarHidden: Bool

// 状态栏的当前外观。
// enum UIStatusBarStyle
// case `default` 根据用户界面样式自动选择浅色或深色内容的状态栏。
// case lightContent 浅色状态栏，用于深色背景。
// case darkContent 深色状态栏，用于浅色背景。
var statusBarStyle: UIStatusBarStyle

```

## Getting the frame rectangle  获得框架矩形

```swift
// 状态栏的框架矩形。
var statusBarFrame: CGRect

```