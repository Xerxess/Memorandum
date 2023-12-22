
# NSKeyedArchiver,NSKeyedUnarchiver,NSCoding,NSSecureCoding

* 用于将对象归档（序列化）成二进制数据

## 使用 NSSecureCoding

* NSSecureCoding 继承 NSCoding
* NSKeyedUnarchiver.unarchivedObject 需要使用NSSecureCoding 否则无法实现

```swift
let url = try! FileManager.default.url(for: .documentDirectory, in: .userDomainMask,appropriateFor: nil,create: false)
let fileURL = url.appending(path: "archiverData")
print(fileURL)

class MyArchiverData:NSObject,NSSecureCoding {
    static var supportsSecureCoding = true // 符合 NSSecureCoding

    var name = "小明"
    var age = 10
    var sex = "女"
    
    override init() {
    }
    
    required init?(coder: NSCoder) {        
        name = coder.decodeObject(forKey: "name") as! String
        age = Int(coder.decodeInt32(forKey: "age"))
        sex = coder.decodeObject(forKey: "sex") as! String
    }
    
    func encode(with coder: NSCoder) {
        coder.encode(name,forKey: "name")
        coder.encode(age,forKey: "age")
        coder.encode(sex,forKey: "sex")
    }
}

let archiverData = try NSKeyedArchiver.archivedData(withRootObject: MyArchiverData(), requiringSecureCoding: false)
try archiverData.write(to: fileURL)

let contentData = FileManager.default.contents(atPath: fileURL.path())
do {
    let unArchiverData = try NSKeyedUnarchiver.unarchivedObject(ofClass: MyArchiverData.self, from: contentData!)! as! MyArchiverData
    print(unArchiverData.name)
}
catch let error1 {
    print("解档失败：\(error1)")
}
```

## 使用 NSCoding

* 使用NSCoding 使用旧API
* unarchiveTopLevelObjectWithData 使用旧API 不报错

```swift
let url = try! FileManager.default.url(for: .documentDirectory, in: .userDomainMask,appropriateFor: nil,create: false)
let fileURL = url.appending(path: "archiverData")
print(fileURL)

class MyArchiverData:NSObject,NSCoding {
    var name = "小明"
    var age = 10
    var sex = "女"
    
    override init() {
    }

    required init?(coder: NSCoder) {        
        name = coder.decodeObject(forKey: "name") as! String
        age = Int(coder.decodeInt32(forKey: "age"))
        sex = coder.decodeObject(forKey: "sex") as! String
    }
    
    func encode(with coder: NSCoder) {
        coder.encode(name,forKey: "name")
        coder.encode(age,forKey: "age")
        coder.encode(sex,forKey: "sex")
    }
}

let archiverData = try NSKeyedArchiver.archivedData(withRootObject: MyArchiverData(), requiringSecureCoding: false)
try archiverData.write(to: fileURL)

let contentData = FileManager.default.contents(atPath: fileURL.path())
do {
    let unArchiverData = try NSKeyedUnarchiver.unarchiveTopLevelObjectWithData(contentData!)! as! MyArchiverData
    print(unArchiverData.name)
}
catch let error1 {
    print("解档失败：\(error1)")
}
```
