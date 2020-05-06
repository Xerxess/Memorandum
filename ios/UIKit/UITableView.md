<!-- TOC -->

- [UITableView](#uitableview)
  - [deselectRowAtIndexPath](#deselectrowatindexpath)

<!-- /TOC -->

# UITableView

## deselectRowAtIndexPath

* 取消选择由索引路径标识的给定行，并带有使取消选择动画的选项。

```c++
 - (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
 {
     [tableView deselectRowAtIndexPath:indexPath animated:YES];
     // 不加此句时，在二级栏目点击返回时，此行会由选中状态慢慢变成非选中状态。
     // 加上此句，返回时直接就是非选中状态。
 }
```

# 编辑模式

## 编辑样式枚举

```c++
 typedef NS_ENUM(NSInteger, UITableViewCellEditingStyle) {
    UITableViewCellEditingStyleNone, 
    UITableViewCellEditingStyleDelete,
    UITableViewCellEditingStyleInsert
};
```

## 获取编辑样式

```c++
- (UITableViewCellEditingStyle)tableView:(UITableView *)tableView editingStyleForRowAtIndexPath:(NSIndexPath *)indexPath
```

##