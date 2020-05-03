<!-- TOC -->

- [沙盒](#沙盒)
- [关于NSBundle](#关于nsbundle)
- [mainBundle和bundleForClass](#mainbundle和bundleforclass)
  - [mainBundle](#mainbundle)
  - [在捆绑中查找资源](#在捆绑中查找资源)
  - [搜索模式](#搜索模式)
- [实战demo](#实战demo)
  - [读取plist文件](#读取plist文件)

<!-- /TOC -->

https://developer.apple.com/documentation/foundation/nsbundle

# 沙盒

iOS应用程序只能在为该改程序创建的文件系统中读取文件，不可以去其它地方访问，此区域被成为沙盒，所以所有的非代码文件都要保存在此，例如图像，图标，声音，映像，属性列表，文本文件等。

# 关于NSBundle

存储在磁盘上捆绑目录中的代码和资源的表示。

可以理解为一个捆绑包，个人理解bundle为一个独立的空间，而我们的可执行（executable）工程，打包完之后，也是一个捆绑包，我们称之为主bundle，这个主bundle包含了可执行代码，如各个viewcontroller的可执行代码，和相关资源例如图片资源等。

* 为所需的捆绑软件目录创建捆绑软件对象。
* 使用捆绑对象的方法来查找或加载所需的资源。
* 使用其他系统API与资源进行交互。

某些类型的经常使用的资源无需捆绑即可定位和打开

# mainBundle和bundleForClass

mainBundle和bundleForClass都是返回一个NSBundle对象。

## mainBundle

* 主包代表包含当前执行代码的包目录。因此，对于应用程序，主捆绑对象使您可以访问应用程序随附的资源。
* 表示正在运行的app中所包含的code和resources。

```c++
mainBundle = [NSBundle mainBundle];

// 获取其他
NSBundle *goodBundle;
goodBundle = [NSBundle bundleWithPath:@"~/.myApp/Good.bundle"];
```

## 在捆绑中查找资源

```c++
NSBundle *main = [NSBundle mainBundle];
NSString *resourcePath = [main pathForResource:@"Seagull" ofType:@"jpg"];
```

## 搜索模式

# 实战demo 

## 读取plist文件

```c++
NSString *plistPath = [[NSBundle mainBundle] pathForResource:@"address" ofType:@"plist"];
//当数据结构为数组时
NSArray *array = [[NSArray alloc] initWithContentsOfFile:plistPath];
//当数据结构为非数组时
NSDictionary *dictionary = [[NSDictionary alloc] initWithContentsOfFile:plistPath];
```