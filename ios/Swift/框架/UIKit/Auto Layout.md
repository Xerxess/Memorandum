<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Auto Layout](#auto-layout)
  - [自动调整视图大小](#自动调整视图大小)
  - [Layout Guides 布局指南](#layout-guides-布局指南)
  - [抗拉伸和抗压缩优先级](#抗拉伸和抗压缩优先级)
  - [动画自动布局约束](#动画自动布局约束)
  - [自适应布局](#自适应布局)
  - [Dynamic Type 动态类型](#dynamic-type-动态类型)

<!-- /code_chunk_output -->

# Auto Layout

## 自动调整视图大小

与 iOS 设备一样，当今内容的形状和尺寸比以往任何时候都要多，这给许多应用程序的布局带来了挑战。为了满足动态内容的需求，开发人员需要具有自调整大小功能的视图。

> 静态大小的视图弊端

- 内容截断
- 屏幕空间利用效率低
- 无法支持用户界面偏好

> `自动调整视图策略`

- 视图层次结构采用由内到外或由下到上的方法来确定容器视图的大小 -- 容器视图 `子视图` 具有`固有`尺寸，那么它将在考虑 "自动布局 "约束（如子视图周围的填充）的情况下增大和缩小，以容纳`子视图`。
- 视图层次结构采用由外到内或由上至下的方法来确定子视图的大小 -- `容器视`图有`固定`的宽度和/或高度，那么子视图就会根据容器视图的尺寸限制而增大或缩小

> `自动调整表格视图单元格大小`

- 表视图的 rowHeight 设置为 UITableView.automaticDimension
- estimatedRowHeight 设置为您想要的值，或者通过实现高度估计委托方法来实现同样的操作。
- `对单元格内的用户界面元素使用自动布局`。请记住，您必须在表格视图单元格的内容视图中创建约束。此外，还必须有一连串不间断的约束，这样才能发挥作用。

```swift

// Table
tableView.rowHeight = UITableView.automaticDimension

override func tableView(
  _ tableView: UITableView, 
  cellForRowAt indexPath: IndexPath
) -> UITableViewCell {
  let message = messages[indexPath.row]
  
  //1
  var cell: MessageBubbleTableViewCell
  if message.sentByMe {
    cell = tableView.dequeueReusableCell(
      withIdentifier: MessageBubbleCellType.rightText.rawValue,
      for: indexPath) as! RightMessageBubbleTableViewCell
  } else {
    cell = tableView.dequeueReusableCell(
      withIdentifier: MessageBubbleCellType.leftText.rawValue,
      for: indexPath) as! LeftMessageBubbleTableViewCell
  }
  
  //2
  cell.textLabel?.text = message.text

  return cell
}
```

```swift
// Table Cell
func configureLayout() {
  contentView.addSubview(messageLabel)
  
  NSLayoutConstraint.activate([
    messageLabel.topAnchor.constraint(
      equalTo: contentView.topAnchor, 
      constant: 10),
   
    messageLabel.rightAnchor.constraint(
      equalTo: contentView.rightAnchor, 
      constant: -10),
   
    messageLabel.bottomAnchor.constraint(
      equalTo: contentView.bottomAnchor, 
      constant: -10),
   
    messageLabel.leftAnchor.constraint(
      equalTo: contentView.leftAnchor, 
      constant: 10)
  ])
}
```

> `自动调整Collection View Cell`

- 手动调整 itemSize 集合视图单元格的大小,视图层次结构中从上到下的方法确定了内容视图`子视图的大小`
- 通过实施 UICollectionViewDelegateFlowLayout 的方法来实现集合视图项大小和内容嵌入

```swift
// MARK: - UICollectionViewDelegateFlowLayout
extension UserStoryViewController:
  UICollectionViewDelegateFlowLayout {
  // 1 返回集合视图框架大小
  func collectionView(
    _ collectionView: UICollectionView, 
    layout collectionViewLayout: UICollectionViewLayout, 
    sizeForItemAt indexPath: IndexPath
  ) -> CGSize {
    return collectionView.frame.size
  }
  // 2 内容嵌入
  func collectionView(
    _ collectionView: UICollectionView, 
    layout collectionViewLayout: UICollectionViewLayout, 
    insetForSectionAt section: Int
  ) -> UIEdgeInsets {
    return .zero
  }
  // 3 最小行距
  func collectionView(
    _ collectionView: UICollectionView, 
    layout collectionViewLayout: UICollectionViewLayout, 
    minimumLineSpacingForSectionAt section: Int
  ) -> CGFloat {
    return 0
  }
}
```

## Layout Guides 布局指南

- 安全区布局指南

## 抗拉伸和抗压缩优先级

- （CHCR 优先级）定义了当锚定在视图上的约束试图使视图小于或大于其固有尺寸时，视图的行为方式。
- Content-Hugging 抗拉伸优先级表示视图对超出其固有内容大小的阻力，值越大，越不容易拉伸
- Compression-Resistance 抗压缩优先级表示视图在缩小到超出其固有内容大小时的阻力，值越大，越不容易缩小

## 动画自动布局约束

- 通过改变约束的`常数`或`激活和停用约束`来制作约束的动画

## 自适应布局

- 适应性就是要保证在所有 iOS 设备和屏幕尺寸上都能获得良好的用户体验。

## Dynamic Type 动态类型

- 动态字体是 iOS 的一项功能，可使应用程序内容根据用户的字体大小偏好进行缩放。
