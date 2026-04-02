
# Rust 宏

Rust 宏（Macros）是一种在编译时生成代码的强大工具，它允许你在编写代码时创建自定义语法扩展。

- 两种类型
  - 声明式宏（Declarative Macros）
  - 过程宏（Procedural Macros）

## 宏的定义

```rust
// 使用 macro_rules! 关键字来定义声明式宏。 
macro_rules! greet {
    // 模式匹配
    ($name:expr) => {
        // 宏的展开
        println!("Hello, {}!", $name);
    };
}

fn main() {
    // 调用宏
    greet!("World");
}
```

## 过程宏

过程宏是一种更为灵活和强大的宏，允许在编译时通过自定义代码生成过程来操作抽象语法树（AST）。过程宏在功能上更接近于函数，但是它们在编写和使用上更加复杂。

- 过程宏的类型
  - 派生宏（Derive Macros）：用于自动实现trait（比如Copy、Debug）的宏。
  - 属性宏（Attribute Macros）：用于在声明上附加额外的元数据，如#[derive(Debug)]。
