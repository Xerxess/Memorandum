<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [使用 Builder 模式改进对象构建](#使用-builder-模式改进对象构建)

<!-- /code_chunk_output -->


# 使用 Builder 模式改进对象构建

* 初始化逻辑复杂时，可以使用 Builder 模式简化对象的创建
  * 链式调用：通过链式调用设置对象属性。
  * 不可变性：使用 struct 保证对象的不可变性。

```swift
struct User {
    let name: String
    let age: Int
    let email: String
}

class UserBuilder {
    private var name: String = ""
    private var age: Int = 0
    private var email: String = ""
    
    func setName(_ name: String) -> UserBuilder {
        self.name = name
        return self
    }
    
    func setAge(_ age: Int) -> UserBuilder {
        self.age = age
        return self
    }
    
    func setEmail(_ email: String) -> UserBuilder {
        self.email = email
        return self
    }
    
    func build() -> User {
        return User(name: name, age: age, email: email)
    }
}

let user = UserBuilder()
    .setName("Alice")
    .setAge(30)
    .setEmail("alice@example.com")
    .build()

print(user) // 输出: User(name: "Alice", age: 30, email: "alice@example.com")
```
