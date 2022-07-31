<!-- TOC -->

- [UIImageAsset](#uiimageasset)
- [Registering an Image 注册图像](#registering-an-image-注册图像)
- [Retrieving an Image 找回图像](#retrieving-an-image-找回图像)
- [API](#api)
    - [Initializing an Image Asset 初始化图像资产](#initializing-an-image-asset-初始化图像资产)
    - [Registering and Unregistering Images  注册和取消注册图像](#registering-and-unregistering-images--注册和取消注册图像)

<!-- /TOC -->

# UIImageAsset

用于收集图像的容器，这些图像代表了描述单个艺术品的多种方式。

UIImageAsset的一个常见`用例是将同一项目的多个图像分组到不同的显示比例`。  
图像资产对象不会分配给UIImage的实例；当图像的多种表示可用时，UIImage会提供资产。使用init（named:）或init（named:in:compatibleWith:）方法从图像资产目录中检索的图像会`自动具有图像资产对象，允许访问目录中的其他图像`。

```swift
class UIImageAsset : NSObject
```

#  Registering an Image 注册图像

当您使用图像资产注册图像时，您将UITraitCollection对象与图像相关联。  
特征集合必须包含`displayScale`和`userInterfaceIdiom`特征属性。如果您没有在特征集合中定义这些特征，则分配以下默认值：

```
displayScale = 1.0
userInterfaceIdiom = UIUserInterfaceIdiom.unspecified
```

# Retrieving an Image 找回图像

当您从图像资产中检索或取消注册图像时，您将使用用于注册图像的特征集合进行检索或注销。  
为了确保检索正确的图像，使用的特征集合必须包含displayScale和userInterfaceIdiom特征。如果这些特征在特征集合中没有定义，则分配以下默认值：

```
displayScale = scale of the current device..
userInterfaceIdiom = the type of interface used on the current device.
```

# API

## Initializing an Image Asset 初始化图像资产

```swift
init()
// 创建一个新的图像资产对象。

// 从unarchiver中的数据创建图像资产。
init?(coder: NSCoder)

```

## Registering and Unregistering Images  注册和取消注册图像

```swift
// 使用指定的特征集合注册图像。
func register(UIImage, with: UITraitCollection)

// 使用指定的图像配置详细信息注册图像。
func register(UIImage, with: UIImage.Configuration)

// 使用图像资产中指定的特征集合取消注册图像。
func unregister(imageWith: UITraitCollection)

// 使用图像资产中指定的图像配置详细信息取消注册图像。
func unregisterImage(with: UIImage.Configuration)

```