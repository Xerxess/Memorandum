<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [NSManagedObjectContext](#nsmanagedobjectcontext)
  - [Notifications 通知](#notifications-通知)
  - [NSFetchRequest](#nsfetchrequest)
    - [NSPredicate](#nspredicate)
  - [示例代码](#示例代码)

<!-- /code_chunk_output -->

# NSManagedObjectContext

- 用于操作和跟踪托管对象更改的对象空间
- 一个上下文包含一组相关的模型对象，这些对象代表一个或多个持久存储的内部一致视图。
- 对托管对象的更改将保留在关联的上下文中，直到 Core Data 将上下文保存到一个或多个持久存储中。
- 单个托管对象实例只存在于一个上下文中，但一个对象可以在不同的上下文中存在多个副本。因此，一个对象是特定上下文独有的。

## Notifications 通知

```swift
NotificationCenter.default.addObserver(self,
                                       selector: #selector(<#methodToCall#>),
                                       name: .NSManagedObjectContextDidSave,
                                       object: <#managedObjectContext#>)
```


## NSFetchRequest

* 用于从持久存储中检索数据的搜索条件的描述

```swift
let request: NSFetchRequest = {
    // Create a fetch request.
    let request = ShoppingItem.fetchRequest()
    
    // Limit the maximum number of items that the request returns.
    request.fetchLimit = 100
            
    // Filter the request results, such as to only return unchecked items.
    request.predicate = NSPredicate(format: "isChecked = false")
    
    // Sort the fetched results, such as ascending by name.
    request.sortDescriptors = [NSSortDescriptor(keyPath: \ShoppingItem.name, ascending: true)]


    return request
}()
```

### NSPredicate

* 用于限制提取搜索或内存过滤的逻辑条件的定义

```swift
// 1. 基本比较
let ageFilter = NSPredicate(format: "age > %d", 18)
let nameFilter = NSPredicate(format: "name == %@", "张三")
let salaryRange = NSPredicate(format: "salary BETWEEN {5000, 10000}")

// 2. 字符串匹配
let nameStartsWith = NSPredicate(format: "name BEGINSWITH %@", "张")
let nameContains = NSPredicate(format: "name CONTAINS[cd] %@", "三") // [cd]忽略大小写和重音
let emailLike = NSPredicate(format: "email LIKE[c] %@", "*@gmail.com")

// 3. 逻辑运算
let complexFilter = NSPredicate(format: "age > 20 AND salary > 8000 OR name == %@", "张三")
let notFilter = NSPredicate(format: "NOT (age < 18)")

// 4. 集合操作
let idList = [1, 2, 3]
let inList = NSPredicate(format: "id IN %@", idList)
let arrayContains = NSPredicate(format: "ANY orders.price > 100")

// 5. 日期比较
let dateFilter = NSPredicate(format: "createDate > %@", Date())
```

## 示例代码

```swift
import CoreData

// Define an observable class to encapsulate all Core Data-related functionality.
class CoreDataStack: ObservableObject {
    static let shared = CoreDataStack()
    
    // Create a persistent container as a lazy variable to defer instantiation until its first use.
    lazy var persistentContainer: NSPersistentContainer = {
        
        // Pass the data model filename to the container’s initializer.
        let container = NSPersistentContainer(name: "Model")
        
        // Load any persistent stores, which creates a store if none exists.
        container.loadPersistentStores { _, error in
            if let error {
                // Handle the error appropriately. However, it's useful to use
                // `fatalError(_:file:line:)` during development.
                fatalError("Failed to load persistent stores: \(error.localizedDescription)")
            }
        }
        return container
    }()
    
    // 2. 管理上下文
    var context: NSManagedObjectContext {
        return persistentContainer.viewContext
    }
    
    func saveContext(){
        try? context.save()
    }
    
    private init() { }
    
    // Function to save a task with the given task name
    func addUser(name: String?) {
        let user = TestUser(context: context)
        user.id = UUID()
        user.name = name
        user.age = 18
        context.insert(user)
        saveContext()
    }
    
    func fetchUser(onCompletion: @escaping ([TestUser]?, Error?) -> Void) {
        let request: NSFetchRequest = {
            // Create a fetch request.
            let request = TestUser.fetchRequest()
            // Limit the maximum number of items that the request returns.
            request.fetchLimit = 100
            return request
        }()
        let list = try? context.fetch(request)
        onCompletion(list, nil)
    }
    
    func updateUser(user: TestUser, name: String) {
        let user = user
        // Assign the new task name and it will saves automatically
        user.name = "小明"
        saveContext()
    }
    
    func deleteUser(user: TestUser){
        context.delete(user)
        saveContext()
    }
}

```
