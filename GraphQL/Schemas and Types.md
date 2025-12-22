<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Schemas and Types 模式和类型](#schemas-and-types-模式和类型)
  - [六种命名类型定义](#六种命名类型定义)
    - [Scalar types 标量类型](#scalar-types-标量类型)
    - [Enum types 枚举类型](#enum-types-枚举类型)
    - [Type modifiers](#type-modifiers)
    - [Interface types 接口类型](#interface-types-接口类型)
    - [Union types 联合类型](#union-types-联合类型)
    - [Input Object types 输入对象类型](#input-object-types-输入对象类型)
  - [Directives 指令](#directives-指令)
  - [Documentation 文档](#documentation-文档)
  - [注释](#注释)

<!-- /code_chunk_output -->

# Schemas and Types 模式和类型

GraphQL 类型系统描述了可以从 API 查询哪些数据。这些功能的集合被称为服务的模式（schema） ，客户端可以使用该模式向 API 发送查询，从而获得可预测的结果。

## 六种命名类型定义

### Scalar types 标量类型

- 标量类型：它们代表查询的叶子节点值
- 默认的标量类型
  - Int
  - Float
  - String
  - Boolean
  - ID 唯一标识符，通常用于重新获取对象或作为缓存键。ID 类型 ID 序列化方式与 String 相同；但是，将其定义为 ID 表明它并非旨在供人类阅读。
- 自定义标量类型

### Enum types 枚举类型

枚举类型 （也称为枚举值类型）是一种特殊的标量，它仅限于一组特定的允许值

```
enum Episode {
  NEWHOPE
  EMPIRE
  JEDI
}
```

### Type modifiers

- GraphQL 中，类型默认是可为空且为单数
  - Non-Null 非空
  - List

```
// Non-Null 非空
type Character {
  name: String!
}

// List
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

### Interface types 接口类型

- 支持抽象类型

```
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}

type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}
```

```

interface Node {
  id: ID!
}
 
// 接口类型也可以实现其他接口类型
interface Character implements Node {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
```

### Union types 联合类型

- 联合类型与接口类型有相似之处，但它们不能定义组成类型之间的任何共享字段
- 联合类型的成员必须是具体的 Object 类型；
- 您不能使用接口类型或其他联合类型作为成员来定义联合类型。

```
union SearchResult = Human | Droid | Starship
```

### Input Object types 输入对象类型

- 输入对象类型与常规对象类型类似，只是关键字 input 而不是 type

```
input ReviewInput {
  stars: Int!
  commentary: String
}
 
type Mutation {
  createReview(episode: Episode, review: ReviewInput!): Review
}

mutation {
  createReview(
    episode: JEDI, 
    review: {
      stars: 5
      commentary: "This is a great movie!"
    }
  ) {
    stars
    commentary
  }
}
```

## Directives 指令

 指令允许我们使用 @ 字符后跟指令名称来修改 GraphQL 模式或操作的部分内容

- @skip
- @include
- @deprecated
- @specifiedBy
- @oneOf

```
type User {
  fullName: String
  name: String @deprecated(reason: "Use `fullName`.")
}
```

## Documentation 文档

GraphQL 允许您为模式中的类型、字段和参数添加文档。

```GraphQL
"""
A character from the Star Wars universe
"""
type Character {
  "The name of the character."
  name: String!
}
```

## 注释

- 通过在文本前面加上 # 字符，向 SDL 添加单行注释

```GraphQL
# This line is treated like whitespace and ignored by GraphQL
type Character {
  name: String!
}
```
