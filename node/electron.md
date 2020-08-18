<!-- TOC -->

- [electron](#electron)
- [Electron 应用架构](#electron-应用架构)
    - [Electron为主进程（ main process）和渲染器进程（renderer processes）通信](#electron为主进程-main-process和渲染器进程renderer-processes通信)
    - [Electron API](#electron-api)
    - [Node.js](#nodejs)
- [功能](#功能)
    - [通知](#通知)
- [BrowserWindow](#browserwindow)
- [app](#app)
- [Display对象](#display对象)
- [screen](#screen)

<!-- /TOC -->


# electron

# Electron 应用架构

* 主进程 - Electron 应用总是有且只有一个主进程
* 渲染进程 - web 页面运行在渲染进程,渲染进程相互独立的，只关心它所运行的 web 页面,无法操作原生的 GUI 资源

渲染进程必须与主进程进行通讯，请求主进程进行相关的 GUI 操作

## Electron为主进程（ main process）和渲染器进程（renderer processes）通信

* ipcRenderer 
* ipcMain模块
* remote模块进行RPC方式通信

## Electron API

* 只能在主进程
* 两种进程中使用

## Node.js

所有在Node.js可以使用的API，在Electron中同样可以使用

# 功能

## 通知

# BrowserWindow

https://www.electronjs.org/docs/api/browser-window

创建和控制浏览器窗口

# app

https://www.electronjs.org/docs/api/app

控制应用程序的事件生命周期

# Display对象

Display 对象表示一个连接到系统的物理显示。 一个伪 Display 可能存在于无图形界面（Gui）系统上, 或者 一个Display 可能与一个远程的虚拟显示相对应。

* id 数字-与显示相关联的唯一的标志符。
* rotation 数字 - 可以是 0, 90, 180, 270, 代表屏幕旋转角度。
* scaleFactor 数字-输出设备的像素比例因子。
* touchSupport 字符串--可以是 available 、unavailable 、unknown。
* monochrome 布尔值-表示display对象是否是一个单色的显示对象(monochrome display)
* accelerometerSupport 字符串-可以是 available、unavailable、unknown。
* colorSpace 字符串 - 表示用于颜色转换的颜色空间(包含可选颜色的三维对象)
* colorDepth 数字 - 表示Display对象对应于色彩空间的比特深度深度 数字 - 每个颜色组件的比例数。
* bounds 矩形
* size 尺寸
* workArea 矩形
* workAreaSize 尺寸
* internal 内部显示器为true，外部显示器为false

# screen

https://www.electronjs.org/docs/api/screen

* 检索有关屏幕大小、显示器、光标位置等的信息
* screen是EventEmitter

```js
const { screen } = require('electron')

// 当前鼠标的绝对位置
screen.getCursorScreenPoint()

// 返回主窗口Display
screen.getPrimaryDisplay()

// 返回一个窗口数组Display[]，表示当前可用的窗口
screen.getAllDisplays()

// 返回离指定点最近的一个窗口Display
screen.getDisplayNearestPoint(point)

// 返回离指定的图形最密切相交一个窗口Display
screen.getDisplayMatching(rect)
```