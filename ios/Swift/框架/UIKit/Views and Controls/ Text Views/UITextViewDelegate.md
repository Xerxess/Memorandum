<!-- TOC -->

- [UITextViewDelegate](#uitextviewdelegate)
- [继承自](#继承自)
- [API](#api)
    - [回复编辑通知](#回复编辑通知)
    - [Responding to text changes 回复文本更改](#responding-to-text-changes-回复文本更改)
    - [响应选择更改](#响应选择更改)
    - [与文本数据交互](#与文本数据交互)
    - [提供上下文菜单](#提供上下文菜单)

<!-- /TOC -->

# UITextViewDelegate

接收文本视图对象编辑相关消息的方法。

本协议中的所有方法都是可选的。您可以在可能想要调整用户正在编辑的文本（例如在拼写检查程序的情况下）或修改预期插入点的情况下使用它们。

```swift
@MainActor protocol UITextViewDelegate
```

# 继承自

UIScrollViewDelegate

# API

## 回复编辑通知

```swift
// 询问委托是否在指定的文本视图中开始编辑。
// 当用户执行通常会启动编辑会话的操作时，文本视图首先调用此方法，看看是否真的应该继续编辑。在大多数情况下，您只需从此方法返回true，即可继续编辑。
// 委托实现此方法是可选的。
// 如果没有它，则继续编辑，就像此方法返回true一样。
optional func textViewShouldBeginEditing(_ textView: UITextView) -> Bool

// 告诉委托何时开始编辑指定的文本视图。
// 此方法的实现是可选的。在用户在文本视图中开始编辑后，在实际进行任何更改之前，文本视图会立即将此消息发送给其委托人。
// 您可以使用此方法设置任何与编辑相关的数据结构，并通常为委托接收未来的编辑消息做好准备。
optional func textViewDidBeginEditing(_ textView: UITextView)

// 询问委托是否停止在指定的文本视图中编辑。
// 当文本视图被要求撤销第一响应者状态时，将调用此方法。当用户尝试将编辑焦点更改为另一个控件时，可能会发生这种情况。然而，在焦点实际更改之前，文本视图调用此方法，让您的代表有机会决定是否应该这样做。
// 通常，您将从此方法返回true，以允许文本视图撤销第一个响应者状态。但是，如果您的委托人想要验证文本视图的内容，您可能会返回false。通过返回false，您可以防止用户切换到另一个控件，直到文本视图包含有效值。
// 请注意，此方法仅提供有关编辑是否应该结束的建议。即使您从此方法返回false，编辑也可能仍然结束。例如，当文本视图被迫通过从父视图或窗口中删除来撤销第一个响应者状态时，可能会发生这种情况。
// 委托实现此方法是可选的。
// 如果没有它，第一个响应者状态将被撤销，就像此方法返回true一样。
optional func textViewShouldEndEditing(_ textView: UITextView) -> Bool

// 在编辑指定的文本视图结束时告诉委托。
func textViewDidEndEditing(UITextView)

```

## Responding to text changes 回复文本更改

```swift
// 询问委托人是否要替换文本视图中的指定文本。
func textView(UITextView, shouldChangeTextIn: NSRange, replacementText: String) -> Bool

// 告诉委托用户何时更改指定文本视图中的文本或属性。
func textViewDidChange(UITextView)

```

## 响应选择更改

```swift
// 告诉委托指定文本视图中文本选择何时更改。
func textViewDidChangeSelection(UITextView)

```

## 与文本数据交互

```swift
// 询问委托人指定的文本视图是否允许指定类型的用户与指定文本范围内提供的文本附件进行交互。
// 如果用户点击或长按文本附件，并且其图像属性不是零，则文本视图调用此方法。
// 除了与文本内联显示文本附件外，您还可以使用此方法触发操作。
func textView(UITextView, shouldInteractWith: NSTextAttachment, in: NSRange, interaction: UITextItemInteraction) -> Bool

// 询问委托人指定的文本视图是否允许指定类型的用户与指定文本范围内的指定URL进行交互。
// 仅在与URL链接的第一次交互时调用此方法。
// 例如，当用户希望与URL的第一次交互显示他们可以采取的操作列表时，会调用此方法；
// 如果用户从列表中选择打开的操作，则不会调用此方法，因为“打开”表示具有相同URL的第二次交互。
func textView(UITextView, shouldInteractWith: URL, in: NSRange, interaction: UITextItemInteraction) -> Bool
```

## 提供上下文菜单

```swift
// 根据系统提供的文本范围和操作，让委托将菜单显示在文本视图中。
func textView(UITextView, editMenuForTextIn: NSRange, suggestedActions: [UIMenuElement]) -> UIMenu?
```
