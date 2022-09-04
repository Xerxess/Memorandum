<!-- TOC -->

- [UISearchTextField](#uisearchtextfield)
- [继承自](#继承自)
- [API](#api)
    - [将文本转换为令牌 Converting text into tokens](#将文本转换为令牌-converting-text-into-tokens)
    - [为令牌互动提供支持 Supporting token interactions](#为令牌互动提供支持-supporting-token-interactions)
    - [添加和删除令牌](#添加和删除令牌)
    - [自定令牌行为 Customizing token behavior](#自定令牌行为-customizing-token-behavior)
- [UISearchToken](#uisearchtoken)
- [UISearchTextFieldDelegate](#uisearchtextfielddelegate)

<!-- /TOC -->

# UISearchTextField

显示和编辑文本和搜索令牌的视图。

使用搜索文本字段显示以文本和令牌表示的搜索条件，并允许用户编辑该条件。  
令牌是非文本内容的离散表示形式，您的应用程序可以创建并使用它来表示限制搜索结果的过滤器。  
令牌总是连续出现在搜索字段中的任何文本之前。

```swift
@MainActor class UISearchTextField : UITextField
```

# 继承自

UITextField

# API

## 将文本转换为令牌 Converting text into tokens

```swift
// 将搜索栏中的文本转换为搜索令牌。
// 此方法删除指定范围内的任何文本，在指定索引处插入提供的令牌，并选择新插入的令牌。
// 比起使用其他方法执行每个步骤，更喜欢使用这种方便的方法。
// 当您的应用程序调用replaceTextualPortion（of:with:at:）时，UIKit在修改文本之前提交任何标记的文本，并创建一个撤销组。
// 此方法不会删除textRange中的任何令牌，因此在此方法中使用之前，您不必手动修剪所选文本范围。
func replaceTextualPortion(of textRange: UITextRange,with token: UISearchToken,at tokenIndex: Int)

// 字段文本内容的范围
// 令牌和文本都包含在从beginningOfDocument to endOfDocument的范围内。
// 此属性仅提供对文本的便捷访问。
var textualRange: UITextRange { get }
```

## 为令牌互动提供支持 Supporting token interactions

```swift
// 一个布尔值，指示用户是否可以从搜索字段中删除令牌。
var allowsDeletingTokens: Bool { get set }

// 一个布尔值，指示用户是否可以从搜索字段复制或拖动令牌。
// 此属性的默认值为true。
// 为了支持复制令牌，允许复制令牌必须为true，搜索字段的委托还必须实现searchTextField（_:itemProviderForCopying:）。
// UISearchTextField在用户选择文本时启用复制命令，即使选择还包括令牌，并且允许复制令牌为false。
var allowsCopyingTokens: Bool { get set }

// 文本字段的委托。
var delegate: UITextFieldDelegate?

```

## 添加和删除令牌

```swift
// 搜索文本字段中令牌的集合。
// 使用此属性访问现有令牌，或一次性替换所有令牌。
// 要将搜索字段中的文本转换为令牌，请使用replaceTextualPortion(of:with:at:)。
var tokens: [UISearchToken] { get set }

// 在特定索引中添加搜索令牌。
func insertToken(UISearchToken, at: Int)

// 从搜索文本字段中删除特定的搜索令牌。
func removeToken(at: Int)

```

## 自定令牌行为 Customizing token behavior

```swift
// 搜索文本字段中所有令牌的背景颜色。
var tokenBackgroundColor: UIColor!

// 返回在给定范围内的搜索字段令牌。
func tokens(in: UITextRange) -> [UISearchToken]

// 将令牌索引转换为文本位置。
func positionOfToken(at: Int) -> UITextPosition

```

# UISearchToken

搜索文本字段中的搜索条件，由文本和可选图标表示。

使用搜索令牌帮助用户理解和编辑UISearchTextField中的复杂搜索查询。  
令牌在标准文本交互（如删除、选择或拖动）中充当单个字符。搜索令牌应始终有文本，并且可能有一个图标。

为每个对您的应用程序有意义的搜索令牌分配一个代表对象。  
通过将这些额外数据附加到令牌中，您可以使用搜索字段中提供的信息重建完整的搜索查询，例如，当您的应用程序从状态恢复开始或用户开始搜索时。

请参阅将建议的搜索与搜索控制器一起使用，以了解如何使用搜索令牌。

```swift
@MainActor class UISearchToken : NSObject
```

```swift
// Creating a search token
init(icon: UIImage?, text: String)

// 由搜索令牌表示的对象。
// 使用此属性保留从状态恢复恢复搜索、粘贴搜索令牌或执行用户搜索所需的信息。
var representedObject: Any? { get set }
```

# UISearchTextFieldDelegate

用于委托搜索栏的界面。

当用户开始复制或移动令牌时，搜索字段会要求其委托提供NSItemProvider。  
要支持这些交互，请将搜索字段的委托设置为实现searchTextField(_:itemProviderForCopying:)的UISearchTextFieldDelegate实例，并将搜索字段的allowsCopyingTokens属性设置为true。

搜索栏的粘贴代表处理粘贴和删除令牌以及文本。

```swift
@MainActor protocol UISearchTextFieldDelegate

// 要求委托人提供一个可以在粘贴复制的令牌时提供令牌的对象。
func searchTextField(UISearchTextField, itemProviderForCopying: UISearchToken) -> NSItemProvider

// 当一个人在搜索文本字段中选择搜索建议时，告诉委托。
// ios16
func searchTextField(UISearchTextField, didSelect: UISearchSuggestion)

```