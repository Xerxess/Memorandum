<!-- TOC -->

- [UITextFieldDelegate](#uitextfielddelegate)
- [API](#api)
    - [管理编辑](#管理编辑)
    - [编辑文本字段的文本](#编辑文本字段的文本)
    - [管理文本选择](#管理文本选择)
    - [提供上下文菜单](#提供上下文菜单)
    - [Customizing an edit menu](#customizing-an-edit-menu)

<!-- /TOC -->

# UITextFieldDelegate

一套可选方法，用于管理文本字段对象中文本的编辑和验证。

文本字段根据重要更改调用其委托的方法。  
您`可以使用这些方法来验证用户键入的文本``，响应与键盘的特定交互`，`并控制整个编辑过程`。  
在文本字段成为第一个响应器并显示键盘（或其分配的输入视图）之前不久开始编辑。  
编辑过程的流程如下：

1. 在成为第一个响应者之前，文本字段调用其委托的textFieldShouldBeginEditing(_:)方法。使用这种方法允许或阻止编辑文本字段的内容。
2. 文本字段成为第一个响应者。
    作为回应，系统显示键盘（或文本字段的输入视图），并根据需要发布键盘WillShowNotification和keyboardDidShowNotification通知。如果键盘或其他输入视图已经可见，系统将发布键盘WillChangeFrameNotification和keyboardDidChangeFrameNotification通知。

3. 文本字段调用其委托人的textFieldDidBeginEditing(_:)方法，并发布textDidBeginEditingNotification通知。
4. 文本字段在编辑期间调用各种委托方法：
    - 每当当前文本更改时，它都会调用textField(_:shouldChangeCharactersIn:replacementString:)方法并发布textDidChangeNotification通知。
    - 当用户点击内置按钮清除文本时，它会调用textFieldShouldClear(_:)方法。
    - 当用户点击键盘的返回按钮时，它会调用textFieldShouldReturn(_:)方法。
5. 在辞去第一响应者职务之前，文本字段调用其委托人的textFieldShouldEndEditing(_:)方法。使用这种方法来验证当前文本。
6. 文本字段作为第一响应者辞职。
    作为回应，系统会根据需要隐藏或调整键盘。隐藏键盘时，系统会发布键盘WillHideNotification和keyboardDidHideNotification通知。
7. 文本字段调用其委托人的textFieldDidEndEditing(_:)方法，并发布textDidEndEditingNotification通知。

有关文本字段功能的更多信息，请参阅UITextField。

```swift
@MainActor protocol UITextFieldDelegate
```

# API

## 管理编辑

```swift
// 询问委托人是否要开始在指定的文本字段中进行编辑。
// 当用户执行通常会启动文本编辑文本的操作时，文本字段会调用此方法。
// 如果您想防止在某些情况下进行编辑，请实施此方法。例如，您可以使用这种方法来防止用户多次编辑文本字段的内容。大多数情况下，您应该返回true以允许编辑继续。
// 没有实现此方法，文本字段将显示为该方法返回true。
func textFieldShouldBeginEditing(UITextField) -> Bool

// 告诉委托何时在指定的文本字段中开始编辑。
// 此方法通知委托，指定的文本字段刚刚成为第一个响应者。
// 使用此方法更新状态信息或执行其他任务。例如，您可以使用这种方法来显示仅在编辑时可见的叠加视图。
// 委托实现此方法是可选的。
optional func textFieldDidBeginEditing(_ textField: UITextField)

// 询问委托人是否停止在指定的文本字段中编辑。
// 当文本字段被要求撤销第一响应者状态时，它会调用此方法。当用户选择另一个控件或调用文本字段的resignFirstResponder()方法时，可能会发生这种情况。然而，在焦点更改发生之前，文本字段调用此方法，并让您有机会防止更改发生。
// 通常，您将从此方法返回true，以允许文本字段撤销第一响应者状态。但是，如果您的委托人在文本字段中检测到无效内容，您可能会返回false。
// 返回false可以防止用户切换到另一个控件，直到文本字段包含有效值。
// 请注意，此方法仅提供有关编辑是否应该结束的建议。即使您返回false，UIKit仍然可能会强制停止编辑。例如，当文本字段从父视图或窗口中删除时，它们总是会撤销第一个响应者状态。
// 委托实现此方法是可选的。
// 如果您没有实现此方法，文本字段将撤销第一个响应者状态，就好像此方法返回true一样。
optional func textFieldShouldEndEditing(_ textField: UITextField) -> Bool

// 告诉委托指定文本字段的编辑何时停止，以及停止的原因。
// 在文本字段撤销其第一个响应者状态后调用此方法。您可以使用此方法更新委托的状态信息。例如，您可以使用这种方法来隐藏仅在编辑时才可见的叠加视图。
// 委托实现此方法是可选的。
// UIKit调用此方法，而不是 textFieldDidEndEditing(_ textField: UITextField) 方法。
optional func textFieldDidEndEditing(_ textField: UITextField,reason: UITextField.DidEndEditingReason)

// 在指定文本字段的编辑停止时告诉委托。
// 在文本字段撤销其第一个响应者状态后调用此方法。您可以使用此方法更新委托的状态信息。例如，您可以使用这种方法来隐藏仅在编辑时才可见的叠加视图。
// 委托实现此方法是可选的。
// 如果您的委托还实现了textFieldDidEndEditing(_:reason:)方法，UIKit会调用该方法，而不是此方法。
optional func textFieldDidEndEditing(_ textField: UITextField)

// 指示在文本字段中结束编辑原因的常量。
// case committed 用户接受文本字段更改。
// case cancelled 文本字段更改中止。
enum DidEndEditingReason : Int, @unchecked Sendable
```

## 编辑文本字段的文本

```swift
// 询问委托是否要更改指定的文本。
// 每当用户操作导致其文本更改时，文本字段都会调用此方法。
// 使用此方法验证用户键入的文本。例如，您可以使用这种方法来防止用户输入数值以外的任何东西。
optional func textField(_ textField: UITextField,shouldChangeCharactersIn range: NSRange,replacementString string: String) -> Bool

// 询问委托人是否要删除文本字段的当前内容。
// 文本字段调用此方法，以响应用户按下内置的清除按钮。
// （默认情况下不显示此按钮，但可以通过更改文本字段的cleatonMode属性中的值来启用。）
// 当编辑开始并且文本字段的cleinsOnBeginEditing属性设置为true时，也会调用此方法。
// 如果您没有实现此方法，文本字段将清除文本，就像该方法返回true一样。
func textFieldShouldClear(UITextField) -> Bool

// 询问委托人是否要处理文本字段的返回按钮的按压。
// 每当用户点击返回按钮时，文本字段都会调用此方法。
// 当点击按钮时，您可以使用此方法实现任何自定义行为。
// 例如，如果您想在用户点击返回按钮时关闭键盘，您的实现可以调用resignFirstResponder()方法。
func textFieldShouldReturn(UITextField) -> Bool

```

## 管理文本选择

```swift
// 告诉委托指定文本字段中文本选择何时更改。
optional func textFieldDidChangeSelection(_ textField: UITextField)
```

## 提供上下文菜单

```swift
// 根据系统提供的文本范围和操作，要求委托将菜单显示在文本字段中。
// ios16
func textField(UITextField, editMenuForCharactersIn: NSRange, suggestedActions: [UIMenuElement]) -> UIMenu?
```

## Customizing an edit menu

```swift
func textField(UITextField, willPresentEditMenuWith: UIEditMenuInteractionAnimating)
Beta
func textField(UITextField, willDismissEditMenuWith: UIEditMenuInteractionAnimating)
```
