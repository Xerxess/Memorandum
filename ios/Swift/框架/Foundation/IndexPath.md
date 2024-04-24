# IndexPath

一种表示索引路径的一个节点的类型。

索引路径中的每个索引表示从树中的一个节点到另一个更深节点的子节点数组的索引。

UIKit 和 AppKit 为前两个索引路径节点提供专用名称，以便在处理表视图和集合视图时使用。  
常用于表视图、集合视图
表视图: [section,row]
集合视图: [section,item]

注意： 如果 IndexPath 对象的元素多于或少于 2 个，则调用 row、item 和section 将使应用程序崩溃。

```swift
let index = IndexPath(indexes: [1,2])
print(index.section,index.item) // 1 2

let index = IndexPath(indexes: [1,2,3])
print(index) // [1,2,3]
print(index.section,index.item) // 程序报错
```

初始化

```swift
let a0= IndexPath(row: 4, section: 9)

let a1 = IndexPath(arrayLiteral: 9, 4)

let a2: IndexPath = [9, 4]

let a3 = IndexPath(item: 4, section: 9)

let a4 = IndexPath(index: 9)

let a5 = IndexPath(indexes: [9,4,8])

let a6 = IndexPath(indexes: 9…11)
```
