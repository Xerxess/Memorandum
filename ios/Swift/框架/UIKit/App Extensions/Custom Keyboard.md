<!-- TOC -->

- [Custom Keyboard](#custom-keyboard)
    - [protocol UITextDocumentProxy](#protocol-uitextdocumentproxy)
        - [Inherits From](#inherits-from)
        - [API](#api)
    - [protocol UIInputViewAudioFeedback](#protocol-uiinputviewaudiofeedback)
    - [class UIInputViewController](#class-uiinputviewcontroller)
        - [Inherits From](#inherits-from-1)
        - [API](#api-1)
            - [Providing a User Interface for a Custom Keyboard 为自定键盘提供用户界面](#providing-a-user-interface-for-a-custom-keyboard-为自定键盘提供用户界面)
            - [Controlling a Custom Keyboard 控制自定义键盘](#controlling-a-custom-keyboard-控制自定义键盘)
            - [Interacting with a Text Input Object 与文本输入对象交互](#interacting-with-a-text-input-object-与文本输入对象交互)
            - [Obtaining a Supplementary Lexicon 获得补充词典](#obtaining-a-supplementary-lexicon-获得补充词典)
            - [Changing the Primary Language of a Custom Keyboard  更改自定义键盘的主要语言](#changing-the-primary-language-of-a-custom-keyboard--更改自定义键盘的主要语言)
            - [Configuring the Keyboard Behaviors 配置键盘行为](#configuring-the-keyboard-behaviors-配置键盘行为)
    - [class UILexicon](#class-uilexicon)
    - [class UILexiconEntry](#class-uilexiconentry)

<!-- /TOC -->
# Custom Keyboard

## protocol UITextDocumentProxy

为自定义键盘提供文本上下文的对象。

通过遵守UIKeyInput协议，文本文档代理使自定义键盘（基于UIInputViewController类）能够插入和删除文本，调整插入点的位置，并确定文本输入对象是否为空。  
文本文档代理使用键盘的textDocumentProxy属性来执行此操作。

有关使用文本文档代理的更多信息，请参阅UIInputViewController和创建自定义键盘。

```swift
@MainActor protocol UITextDocumentProxy
```

### Inherits From

UIKeyInput

### API

```swift
// 键盘的文本输入模式。
// 必填。
// @MainActor class UITextInputMode : NSObject
var documentInputMode: UITextInputMode?

// 当前文本输入对象插入点后的文本上下文。
// 必填。
var documentContextAfterInput: String?

// 当前文本输入对象插入点之前的文本上下文。
// 必填。
var documentContextBeforeInput: String?

// 在当前文本输入对象中向前或向后移动插入点。
// 填。
func adjustTextPosition(byCharacterOffset: Int)

// 文档中当前选择的文本。
// 必填。
var selectedText: String?

// 插入提供的文本并标记它，以表明它是活动输入会话的一部分。
// 必填。
func setMarkedText(String, selectedRange: NSRange)

// 取消标记当前标记的文本。
// 必填。
func unmarkText()


// 文档的唯一标识符。
// 必填。
var documentIdentifier: UUID


```

```swift
@MainActor protocol UITextDocumentProxy
```

## protocol UIInputViewAudioFeedback

允许自定义输入或键盘配件视图播放标准键盘输入点击的属性。

```swift
@MainActor protocol UIInputViewAudioFeedback

// 指定输入视图是否启用输入点击。
var enableInputClicksWhenVisible: Bool
```

## class UIInputViewController

自定义键盘应用程序扩展的主要视图控制器。

要创建自定义键盘，请首先对`UIInputViewController`类进行`子类`，然后将键盘的用户界面添加到子类的inputView属性中。  
在Xcode中，您可以通过选择自定义键盘目标模板来启动自定义键盘。

自定义键盘可以通过以下方式响应用户输入事件：

* 通过调用textDocumentProxy属性上的`insertText(_:)`方法，在当前文本输入对象的插入点添加未归因NSString对象形式的文本。此属性通过其与`UIKeyInput`协议的一致性来提供该方法
* 通过调用textDocumentProxy属性上的`deleteBackward()`方法，从插入点开始，向后删除文本。
* 通过调用 `advanceToNextInputMode() `方法，切换到用户支持的键盘集中的另一个键盘。
* 通过调用`dismissKeyboard()`方法关闭键盘。

### Inherits From

UIViewController

### API

#### Providing a User Interface for a Custom Keyboard 为自定键盘提供用户界面

```swift
// 输入视图控制器的主视图。
var inputView: UIInputView?

```

#### Controlling a Custom Keyboard 控制自定义键盘

```swift
// 切换到启用用户的键盘列表中的下一个键盘。
func advanceToNextInputMode()

// 从屏幕上关闭自定键盘。
func dismissKeyboard()

// 支持与启用用户的键盘列表进行交互。
func handleInputModeList(from: UIView, with: UIEvent)

```

#### Interacting with a Text Input Object 与文本输入对象交互

```swift
// 自定义键盘正在交互的文本输入对象的代理。
var textDocumentProxy: UITextDocumentProxy
```

#### Obtaining a Supplementary Lexicon 获得补充词典

```swift
// 获取自定义键盘中术语对的补充词典。
func requestSupplementaryLexicon(completion: (UILexicon) -> Void)

```

#### Changing the Primary Language of a Custom Keyboard  更改自定义键盘的主要语言

```swift
// 自定义键盘的主要语言。
var primaryLanguage: String?
```

#### Configuring the Keyboard Behaviors 配置键盘行为

```swift
// 一个布尔值，指示键盘是否必须显示输入切换器键。
var needsInputModeSwitchKey: Bool

// 一个布尔值，指示键盘是否具有完全访问权限。
var hasFullAccess: Bool

// 一个布尔值，指示键盘是否具有听写键。
var hasDictationKey: Bool
```

## class UILexicon

## class UILexiconEntry
