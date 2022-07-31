<!-- TOC -->

- [NSDataAsset](#nsdataasset)
- [数据资产如何初始化](#数据资产如何初始化)
    - [Data Set Type](#data-set-type)
    - [Asset Catalog Format Reference](#asset-catalog-format-reference)
- [如何访问数据](#如何访问数据)
- [API](#api)
    - [Initializing the Data Asset](#initializing-the-data-asset)
    - [Accessing Data 访问数据](#accessing-data-访问数据)
    - [Getting Data Asset Information 获取数据资产信息](#getting-data-asset-information-获取数据资产信息)

<!-- /TOC -->

# NSDataAsset

存储在资产目录中的数据集类型的对象。

对象的内容存储为一组具有相关设备属性的一个或多个文件。这些集合也可以被标记为按需资源。

```swift
class NSDataAsset : NSObject
```

# 数据资产如何初始化

数据资产从资产目录中的命名数据集初始化。您可以在应用程序开发期间创建数据集。  
每个数据集包含一个或多个数据文件。每个文件都有设备功能的相关属性，包括最小内存量和Metal版本。  
当您初始化数据资产时，系统会选择与当前设备最匹配的数据文件。

## Data Set Type
https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_ref-Asset_Catalog_Format/DataSetType.html#//apple_ref/doc/uid/TP40015170-CH23

## Asset Catalog Format Reference
https://developer.apple.com/library/archive/documentation/Xcode/Reference/xcode_ref-Asset_Catalog_Format/index.html#//apple_ref/doc/uid/TP40015170

# 如何访问数据

您可以`使用数据属性访问数据文件`。  
由于该属性为NSData类型，因此它仅提供以字节和字节范围访问原始数据的方法。

要访问结构化数据，请将字节转换为适当的格式。  
系统可以为您转换一些数据类型。  
一个例子是使用XMLParser的initWithData：方法的XML数据。其他数据类型需要代码来解析和转换原始数据。您可能需要逐步转换较大的数据文件。

# API

## Initializing the Data Asset

```swift
// 初始化并返回引用资产目录中命名数据资产的对象。
init?(name: NSDataAssetName)

// 初始化并返回一个对象，该对象引用了指定捆绑包中资产目录中的命名数据资产。
init?(name: NSDataAssetName, bundle: Bundle)

```

## Accessing Data 访问数据

```swift
// 数据资产中的原始数据值。
var data: Data

```

## Getting Data Asset Information 获取数据资产信息

```swift
// 资产目录中数据集的名称。
var name: NSDataAssetName

// 数据资产的统一类型标识符。
var typeIdentifier: String

```