# Json Schema

http://json-schema.org/learn/getting-started-step-by-step.html  

https://baike.baidu.com/item/jsonschema/15275465?fr=aladdin

https://ajv.js.org/

json Schema是描述你的JSON数据格式；JSON模式（应用程序/模式+ JSON）有多种用途，其中之一就是实例验证。验证过程可以是交互式或非交互式的。例如，应用程序可以使用JSON模式来构建用户界面使互动的内容生成除了用户输入检查或验证各种来源获取的数据。

Json Schema 是一种基于 JSON 格式定义 JSON 数据结构的规范。它被写在 IETF 草案下并于 2011 年到期。Json Schema：

描述现有数据格式。
干净的人类和机器可读的文档。
完整的结构验证，有利于自动化测试。
完整的结构验证，可用于验证客户端提交的数据。

## Json schema 格式

$schema | 描述 | 
--------|----|---
$schema | $schema 指出此架构是根据标准的特定草稿编写的，并且由于各种原因（主要是版本控制）而使用。
$id | 定义模式的URI，并解析模式中其他URI引用的基URI。 | 
title | 标题，用来描述结构 |  
description | 描述 |  
type | 定义我们的JSON数据的第一个约束，在这种情况下，它必须是一个JSON对象。 | .
properties | 定义属性 |  
required | 验证关键字列表
exclusiveMinimum|validation关键字指定值必须是零以外的值。

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/product.schema.json",
  "title": "Product",
  "description": "A product from Acme's catalog",
  "type": "object",
  "properties": {
    "productId": {
      "description": "The unique identifier for a product",
      "type": "integer"
    },
    "price": {
      "description": "The price of the product",
      "type": "number",
      "exclusiveMinimum": 0
    }
  },
  "required": [ "productId" ]
}
```