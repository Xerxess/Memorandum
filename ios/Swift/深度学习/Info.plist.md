<!-- TOC -->

- [Info.plist](#infoplist)
    - [主用户界面](#%E4%B8%BB%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2)
    - [Application Scene Manifest 场景配置](#application-scene-manifest-%E5%9C%BA%E6%99%AF%E9%85%8D%E7%BD%AE)
    - [状态栏](#%E7%8A%B6%E6%80%81%E6%A0%8F)
    - [摄像头和麦克风](#%E6%91%84%E5%83%8F%E5%A4%B4%E5%92%8C%E9%BA%A6%E5%85%8B%E9%A3%8E)
    - [Face ID](#face-id)
    - [定位](#%E5%AE%9A%E4%BD%8D)
    - [网络](#%E7%BD%91%E7%BB%9C)
    - [Photos](#photos)

<!-- /TOC -->

https://developer.apple.com/documentation/bundleresources/information_property_list

# Info.plist

信息属性列表文件是一个结构化文本文件，其中包含捆绑可执行文件的基本配置信息。

## 主用户界面

## Application Scene Manifest 场景配置

- [application scene manifest]: Dictionary -
  - [enable multiple windows]: Boolean -
- [scene configuration]: Dictionary -

## 状态栏

## 摄像头和麦克风

- [privacy - camera usage description]: String 需要相机权限
- [Privacy - Microphone Usage Description]:String 需要麦权限

## Face ID

- [Privacy - Face ID Usage Description]:String 一条消息，告诉用户为什么应用程序请求能够使用 Face ID 进行身份验证。

## 定位

- [Privacy - Location Usage Description]:String 告诉用户应用程序为何请求访问用户的位置信息
- [Privacy - Location Always and When In Use Usage Description]:String 告诉用户为什么应用程序始终请求访问用户的位置信息
- [Privacy - Location When In Use Usage Description]:String 告诉用户应用程序在前台运行时应用程序请求访问用户位置信息的原因
- [Privacy - Location Default Accuracy Reduced]:Bool 是否默认请求降低位置精度

## 网络

- [Privacy - Local Network Usage Description]:String 告诉用户应用程序请求访问本地网络的原因
- [app transport security settings]: Dictionary
  - [Allow Arbitrary Loads]:Boolean 指示是否为所有网络连接禁用应用程序传输安全限制。解决 http 访问
  - [Allows Local Networking]:Boolean 是否允许加载本地资源

## Photos

- [Privacy - Photo Library Additions Usage Description]:String 告诉用户为什么应用程序请求对用户的照片库进行仅添加访问
- [Privacy - Photo Library Usage Description]:String 告诉用户应用程序为何请求访问用户的照片库
