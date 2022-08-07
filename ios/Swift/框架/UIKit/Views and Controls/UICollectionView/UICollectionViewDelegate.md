<!-- TOC -->

- [UICollectionViewDelegate](#uicollectionviewdelegate)
- [继承自](#继承自)
- [API](#api)
    - [Managing the selected cells 管理所选单元格](#managing-the-selected-cells-管理所选单元格)
    - [Managing cell highlighting 管理单元格高亮显示](#managing-cell-highlighting-管理单元格高亮显示)
    - [Tracking the addition and removal of views 跟踪视图的添加和删除](#tracking-the-addition-and-removal-of-views-跟踪视图的添加和删除)
    - [Handling layout changes 处理布局更改](#handling-layout-changes-处理布局更改)
    - [Managing context menus 管理上下文菜单](#managing-context-menus-管理上下文菜单)
    - [Working with focus 专注地工作](#working-with-focus-专注地工作)
    - [Editing items 编辑项目](#editing-items-编辑项目)
    - [Managing actions for cells 管理单元格的操作](#managing-actions-for-cells-管理单元格的操作)
    - [Handling scene transitions 处理场景过渡](#handling-scene-transitions-处理场景过渡)
    - [Controlling the spring-loading behavior 控制弹簧加载行为](#controlling-the-spring-loading-behavior-控制弹簧加载行为)

<!-- /TOC -->

# UICollectionViewDelegate

您用于管理用户与集合视图中项目的交互的对象采用的方法。

集合视图委托管理用户与集合视图内容的交互，包括项目选择、高亮显示和对这些项目执行操作。该协议的方法都是可选的。
配置集合视图对象时，将委托对象分配给其委托属性。

```swift
@MainActor protocol UICollectionViewDelegate
```

# 继承自

UIScrollViewDelegate

# API

## Managing the selected cells 管理所选单元格

```swift
// 询问委托人是否应该选择指定的项目。
// 如果应该选择项目，则为true，如果不应该选择，则为false。
// 当用户尝试在集合视图中选择项目时，集合视图会调用此方法。
// 当您以编程方式设置选择时，它不会调用此方法。
// 没有实现此方法，则默认返回值为true。
func collectionView(UICollectionView, shouldSelectItemAt: IndexPath) -> Bool

// 告诉委托人，指定索引路径上的项已被选中。
// 当用户在集合视图中成功选择项目时，集合视图会调用此方法。
// 当您以编程方式设置选择时，它不会调用此方法。
func collectionView(UICollectionView, didSelectItemAt: IndexPath)

// 询问委托人是否应该取消选择指定的项目。
// 当用户尝试在集合视图中取消选择项目时，集合视图会调用此方法。
// 当您以编程方式取消选择项目时，它不会调用此方法。
// 没有实现此方法，则默认返回值为true。
func collectionView(UICollectionView, shouldDeselectItemAt: IndexPath) -> Bool

// 告诉委托人指定路径上的项已取消选择。
// 当用户成功取消选择集合视图中的项目时，集合视图会调用此方法。
// 当您以编程方式取消选择项目时，它不会调用此方法。
func collectionView(UICollectionView, didDeselectItemAt: IndexPath)

// 询问委托用户是否可以在集合视图中使用双指平移手势选择多个项目。
// 当系统识别双指平移手势时，它会在将 isEditing 设置为 true 之前调用此方法。如果您从此方法返回true，用户可以使用双指平移手势选择多个项目。
// 用户可以在水平或垂直滚动的集合视图上使用双指平移手势选择多个项目，但不能同时滚动。双向滚动的集合视图将无法识别手势或调用此方法。
// 不实现此方法，系统将使用允许 MultipleSelectionDuringEditing 的值来确定用户是否可以使用平移手势选择多个项目。
func collectionView(UICollectionView, shouldBeginMultipleSelectionInteractionAt: IndexPath) -> Bool

// 告诉委托用户何时开始使用双指平移手势在集合视图中选择多个项目。
// 您实现此方法是一个很好的地方，可以在应用程序的用户界面中指示用户正在选择多个项目；例如，您可以将编辑或选择按钮替换为完成按钮。
func collectionView(UICollectionView, didBeginMultipleSelectionInteractionAt: IndexPath)

// 告诉委托用户何时停止使用双指平移手势在集合视图中选择多个项目。
func collectionViewDidEndMultipleSelectionInteraction(UICollectionView)

```

## Managing cell highlighting 管理单元格高亮显示

```swift
// 询问代表在跟踪期间是否应该突出显示该项目。
// 随着触摸事件的到来，集合视图会突出显示项目，预计用户会选择它们。在处理这些触摸事件时，集合视图调用此方法，询问您的委托是否应该高亮显示给定单元格。它调用此方法只是为了响应用户交互，如果您以编程方式在单元格上设置高亮显示，则不会调用它。
// 如果您在实现中返回false，则单元格不会高亮显示，系统会绕过整个选择过程。也就是说，系统不调用 collectionView(_:shouldSelectItemAt:) 或任何其他与选择相关的方法。
// 如果您返回true，isHighlighted设置为true，调用collectionView(_:didHighlightItemAt:)，系统将开始选择过程。
// 没有实现此方法，则默认返回值为true。
func collectionView(UICollectionView, shouldHighlightItemAt: IndexPath) -> Bool

// 告诉委托，指定索引路径上的项已高亮显示。
// 集合视图仅响应用户交互调用此方法
// 以编程方式在单元格上设置高亮显示，则不会调用它。
func collectionView(UICollectionView, didHighlightItemAt: IndexPath)

// 告诉委托人在指定的索引路径上从项目中删除了高亮显示。
// 集合视图仅响应用户交互调用此方法
// 以编程方式更改单元格上的高亮显示，则不会调用此方法。
func collectionView(UICollectionView, didUnhighlightItemAt: IndexPath)

```

## Tracking the addition and removal of views 跟踪视图的添加和删除

```swift
// 告诉委托，指定的单元格即将显示在集合视图中。
// 集合视图在向其内容添加单元格之前调用此方法。使用此方法来检测单元格添加，而不是监控单元格本身以查看它何时出现。
func collectionView(UICollectionView, willDisplay: UICollectionViewCell, forItemAt: IndexPath)

// 告诉委托人指定的补充视图即将显示在集合视图中。
// 集合视图在为其内容添加补充视图之前调用此方法。使用此方法来检测视图添加，而不是监控视图本身以查看它何时出现。
func collectionView(UICollectionView, willDisplaySupplementaryView: UICollectionReusableView, forElementKind: String, at: IndexPath)

// 告诉委托人指定单元格已从集合视图中删除。
// 使用此方法来检测何时从集合视图中删除单元格，而不是监控视图本身以查看它何时消失。
func collectionView(UICollectionView, didEndDisplaying: UICollectionViewCell, forItemAt: IndexPath)

// 告诉委托人指定的补充视图已从集合视图中删除。
// 使用此方法来检测补充视图何时从集合视图中删除，而不是监控视图本身以查看它何时出现或消失。
func collectionView(UICollectionView, didEndDisplayingSupplementaryView: UICollectionReusableView, forElementOfKind: String, at: IndexPath)
```

## Handling layout changes 处理布局更改

```swift
// 要求在指定布局之间移动时使用自定义过渡布局。
// 如果您想返回在过渡期间使用的自定义UICollectionViewTransitionLayout对象，请实现此方法。
// 过渡布局对象允许您自定义从一个布局过渡到下一个布局时单元格和装饰视图的行为。
// 通常，布局之间的过渡会导致项目从当前位置直接动画到新位置。使用过渡布局对象，您可以让对象遵循非线性路径，使用不同的计时算法，或根据传入的触摸事件移动。
// 没有实现此方法，集合视图将创建一个标准的UICollectionViewTransitionLayout对象，并使用该对象来管理过渡。
func collectionView(UICollectionView, transitionLayoutForOldLayout: UICollectionViewLayout, newLayout: UICollectionViewLayout) -> UICollectionViewTransitionLayout

// 让委托人有机会为布局更改和动画更新自定义内容偏移量。
// Return Value:您想使用的内容偏移量。如果您不实现此方法，集合视图将使用拟议的ContentOffset参数中的值。
// 在布局更新期间或在布局之间过渡时，集合视图调用此方法，让您有机会更改建议的内容偏移量，以便在动画结束时使用。
// 如果布局或动画可能导致项目以不适合您设计的方式定位，则可能会返回新值。
// 此方法以布局对象的目标ContentOffset（forProposedContentOffset:）方法调用。在不想对布局对象进行子类以修改内容偏移量的情况下实现此方法。
func collectionView(UICollectionView, targetContentOffsetForProposedContentOffset: CGPoint) -> CGPoint

// 要求委托人提供在移动项目时使用的索引路径。
func collectionView(UICollectionView, targetIndexPathForMoveOfItemFromOriginalIndexPath: IndexPath, atCurrentIndexPath: IndexPath, toProposedIndexPath: IndexPath) -> IndexPath
```

## Managing context menus 管理上下文菜单

```swift
// 通知委托人何时会出现上下文菜单。
func collectionView(UICollectionView, willDisplayContextMenu: UIContextMenuConfiguration, animator: UIContextMenuInteractionAnimating?)

// 当上下文菜单消失时通知委托人。
func collectionView(UICollectionView, willEndContextMenuInteraction: UIContextMenuConfiguration, animator: UIContextMenuInteractionAnimating?)

// 当用户触发提交时，通过点击预览通知委托。
func collectionView(UICollectionView, willPerformPreviewActionForMenuWith: UIContextMenuConfiguration, animator: UIContextMenuInteractionCommitAnimating)

// 要求委托人在指定的索引路径上为项目提供上下文菜单配置。
// ios16
func collectionView(UICollectionView, contextMenuConfigurationForItemsAt: [IndexPath], point: CGPoint) -> UIContextMenuConfiguration?

// 当上下文-菜单交互开始时，要求委托人在指定的索引路径上预览项目。
// ios16
func collectionView(UICollectionView, contextMenuConfiguration: UIContextMenuConfiguration, highlightPreviewForItemAt: IndexPath) -> UITargetedPreview?

// 当上下文-菜单交互结束时，要求委托人在指定的索引路径上预览项目。
// ios16
func collectionView(UICollectionView, contextMenuConfiguration: UIContextMenuConfiguration, dismissalPreviewForItemAt: IndexPath) -> UITargetedPreview?
```

## Working with focus 专注地工作

```swift
// 询问委托人是否可以聚焦指定索引路径上的项目。
// 您可以使用此方法或单元格的 coneBecomeFocused 方法来控制集合视图中的哪些项目可以接收焦点。
// 焦点引擎首先调用单元格的 canBecomeFocused 方法，其默认实现服从于集合视图和此委托方法。
// 不实现此方法，则专注于项目的能力取决于集合视图的项目是否可以选择。当项目可选择时，它们也可以像此方法返回true一样聚焦；否则，它们不会受到焦点。
func collectionView(UICollectionView, canFocusItemAt: IndexPath) -> Bool

// 要求委托人提供应该聚焦的单元格的索引路径。
func indexPathForPreferredFocusedView(in: UICollectionView) -> IndexPath?

// 询问委托人是否应该更改焦点。
func collectionView(UICollectionView, shouldUpdateFocusIn: UICollectionViewFocusUpdateContext) -> Bool

// 告诉委托人发生了焦点更新。
func collectionView(UICollectionView, didUpdateFocusIn: UICollectionViewFocusUpdateContext, with: UIFocusAnimationCoordinator)

// 询问委托人是否在相应的索引路径上关联单元格的选择和聚焦行为。
func collectionView(UICollectionView, selectionFollowsFocusForItemAt: IndexPath) -> Bool
```

## Editing items 编辑项目

```swift
// 确定指定的项目是否可以编辑。
// 如果项目可编辑，则返回true；如果不可编辑，则返回false。默认值为true。
func collectionView(UICollectionView, canEditItemAt: IndexPath) -> Bool

```

## Managing actions for cells 管理单元格的操作

```swift
// 询问委托人是否在指定的索引路径上对单元格执行主要操作。
// ios16
func collectionView(UICollectionView, canPerformPrimaryActionForItemAt: IndexPath) -> Bool

// 告诉委托人在指定的索引路径上执行单元格的主要操作。
// ios16
func collectionView(UICollectionView, performPrimaryActionForItemAt: IndexPath)
```

## Handling scene transitions 处理场景过渡

```swift
//  返回场景激活配置，允许单元格扩展到新场景。
func collectionView(UICollectionView, sceneActivationConfigurationForItemAt: IndexPath, point: CGPoint) -> UIWindowScene.ActivationConfiguration?
```

## Controlling the spring-loading behavior 控制弹簧加载行为

```swift
// 确定是否为指定项目显示弹簧加载交互效果。
// 不实现此方法，集合视图将假设返回值为true。
func collectionView(UICollectionView, shouldSpringLoadItemAt: IndexPath, with: UISpringLoadedInteractionContext) -> Bool
```