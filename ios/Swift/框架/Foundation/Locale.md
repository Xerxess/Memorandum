<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Locale](#locale)
  - [语言标签 (BCP 47)](#语言标签-bcp-47)

<!-- /code_chunk_output -->

# Locale

用于格式化数据以进行演示的语言、文化和技术惯例的信息

## 语言标签 (BCP 47)

|Language Tag 语言标签 |   Language 语言 | Region 地区 | Description 描述|
|---|---|---|---|
|en-US|English|United States|
|zh-CN|Chinese|China| 中国大陆，简体字
|zh-HK|Chinese|Hond Kong| 香港，繁体字
|zh-TW|Chinese|Taiwan| 台湾、繁体字

```swift
let locale = Locale(identifier: "en-US")
let locale = Locale(identifier: "zh-CN")
```


```swift

BCP-47（语言标签）是一个用于标识人类语言的标准。让我为您详细解释一下：

BCP-47 主要特点：

1. 语言标签的格式
- 基本格式： language[-script][-region][-variant]
- 语言代码（必需）：使用 ISO 639-1 或 ISO 639-2 标准的两字母或三字母代码
- 文字代码（可选）：使用 ISO 15924 的四字母代码
- 地区代码（可选）：使用 ISO 3166-1 的两字母代码

// 简体中文（中国大陆）
let zhCN = "zh-Hans-CN"

// 简体中文（中国大陆）
let zhCN = "zh-CN"

// 繁体中文（台湾）
let zhTW = "zh-TW"

// 英语（美国）
let enUS = "en-US"

// 日语（日本）
let jaJP = "ja-JP"

// 带文字系统的示例：简体中文
let zhHans = "zh-Hans"

// 带文字系统和地区的示例：简体中文（新加坡）
let zhHansSG = "zh-Hans-SG"
```
