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
