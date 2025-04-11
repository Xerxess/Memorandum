<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [ModelContext](#modelcontext)
  - [Fetching models 获取模型](#fetching-models-获取模型)
  - [Demo](#demo)

<!-- /code_chunk_output -->

# ModelContext

- 一个对象，可用于获取、插入和删除模型，并将任何更改保存到磁盘
- 模型上下文是 SwiftData 的核心，因为它负责管理持久化模型的整个生命周期
- 使用上下文插入新模型、跟踪和保留对这些模型的更改，并在不再需要这些模型时删除这些模型。

## Fetching models 获取模型

```swift
func fetch<T>(
    _ descriptor: FetchDescriptor<T>,
    batchSize: Int
) throws -> FetchResultsCollection<T> where T : PersistentModel
```

- FetchDescriptor 一种类型，用于描述执行 fetch 时要使用的条件、排序顺序和任何其他配置。

```swift
struct FetchDescriptor<T> where T : PersistentModel

init(
    predicate: Predicate<T>? = nil,
    sortBy: [SortDescriptor<T>] = []
)
```

```swift
import SwiftData

// 1. 基础模型定义
@Model
class Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}

// 2. Schema 配置
class DataManager {
    let container: ModelContainer
    
    init() throws {
        // 创建 Schema
        let schema = Schema([
            Person.self,  // 可以添加多个模型类
        ])
        
        // Schema 配置选项
        let modelConfiguration = ModelConfiguration(
            schema: schema,
            isStoredInMemoryOnly: false,  // 是否只存储在内存中
            cloudKitDatabase: .automatic,  // CloudKit 配置
            migrations: []  // 数据迁移配置
        )
        
        // 创建容器
        container = try ModelContainer(
            for: schema,
            configurations: [modelConfiguration]
        )
    }
}

// 使用 Predicate（_：）宏  创建谓词
// 谓词不能包含任何嵌套声明，不能使用任何流控制（如 for 循环），也不能修改其封闭作用域中的变量
let messagePredicate = #Predicate<Message> { message in
    message.length < 100 && message.sender == "Jeremy"
}
// 创建排序描述符
let descriptor = SortDescriptor(\Task.title,order:.forward) // 按标题字母顺序 默认升序
let fetchDescriptor =  FetchDescriptor(predicate:messagePredicate,sortBy:[descriptor])
// 分页
fetchDescriptor.fetchLimit = 10
fetchDescriptor.fetchOffset = 0

```

## Demo

```swift

import SwiftData
import Foundation
import Combine
import PlaygroundSupport

PlaygroundPage.current.needsIndefiniteExecution = true

// 1. 基础模型定义
@Model
class Person:Identifiable {   
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}

// 2. Schema 配置
class DataManager {
    static let shared: DataManager? = {
        do {
            return try DataManager()
        } catch {
            print("初始化失败: \(error)")
            return nil
        }
    }()
    let container: ModelContainer
    let context: ModelContext
    init() throws {
        // 创建 Schema
        let schema = Schema([
            Person.self,  // 可以添加多个模型类
        ])
        
        let config = ModelConfiguration(isStoredInMemoryOnly: true)
        
        // 创建容器
        container = try ModelContainer(
            for: schema,
            configurations: [config]
        )
        context = ModelContext(container)
    }  
}

// 增
func addPerson() throws -> Void {   
    guard let context = DataManager.shared?.context else {return} 
    let model = Person(name: "小明", age: 18)
    context.insert(model)
    try context.save()
}

// 删
func deletePerson(id:PersistentIdentifier) throws -> Void {   
    guard let context = DataManager.shared?.context else {return} 
    guard let model = try getPerson(id: id) else { return }
    context.delete(model)
    try context.save()
}

// 改
func updatePerson(id:PersistentIdentifier) throws -> Void {   
    guard let context = DataManager.shared?.context else {return} 
    guard let model = try getPerson(id: id) else { return }
    model.name = "小明2号"
    model.age = 16
    try context.save()
}

// 查
func personList() throws -> [Person]? {
    guard let context = DataManager.shared?.context else {return nil} 
    // 使用 Predicate（_：）宏  创建谓词
    // 谓词不能包含任何嵌套声明，不能使用任何流控制（如 for 循环），也不能修改其封闭作用域中的变量
    let messagePredicate = #Predicate<Person> { person in
        person.age <= 18 
    }
    // 创建排序描述符
    let descriptor = SortDescriptor(\Person.name,order:.forward) // 按标题字母顺序 默认升序
    var fetchDescriptor =  FetchDescriptor(predicate:messagePredicate,sortBy:[descriptor])
    // 分页
    fetchDescriptor.fetchLimit = 10
    fetchDescriptor.fetchOffset = 0
    fetchDescriptor.propertiesToFetch = [\Person.name,\Person.age]
    do {
        let list = try? context.fetch(fetchDescriptor)
        return list
    } catch (let error) {
        print(error)
        throw error
    }    
}

// 获取单个实体对象
func getPerson(id:PersistentIdentifier) throws -> Person? {
    guard let context = DataManager.shared?.context else {return nil}     
    do {
        let model = try? context.model(for: id)
        return model as? Person
    } catch (let error) {
        print(error)
        throw error
    }
}

var cancellables = Set<AnyCancellable>()

do {
    let context = DataManager.shared?.context
    NotificationCenter.default
        .publisher(for: ModelContext.didSave, object: context)
        .receive(on: RunLoop.main)
        .sink { notification in
            print("notification") // 不知为何未生效
        }.store(in: &cancellables)
    
    try addPerson()
    let list = try personList()
    print(list)
    if let list = list,list.count > 0 {
        let id = list[0].persistentModelID
        let person = try getPerson(id: id)
        print("\(person?.name)")
        try updatePerson(id: id)
    }
    
    if let list = list,list.count > 0 {
        let id = list[0].persistentModelID
        let person = try getPerson(id: id)
        print("\(person?.name)")
    }
    
    Timer.scheduledTimer(withTimeInterval: 5, repeats: false) {  _  in
        if let list = list,list.count > 0 {
            let id = list[0].persistentModelID
            do {
                try deletePerson(id: id)
                print("删除成功")
                let list = try personList()
                print(list)
            } catch {
                print("错误: \(error)")
            }
        }    
        
    }
}
```
