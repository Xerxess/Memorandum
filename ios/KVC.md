<!-- TOC -->

- [KVC](#kvc)
- [基础](#基础)
  - [出现异常，该key不存在 forUndefinedKey](#出现异常该key不存在-forundefinedkey)
  - [accessInstanceVariablesDirectly](#accessinstancevariablesdirectly)
- [NSArray 、 NSSet](#nsarray--nsset)
- [搜索模式](#搜索模式)
- [KVC设值](#kvc设值)

<!-- /TOC -->

# KVC

https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/KeyValueCoding/index.html#//apple_ref/doc/uid/10000107i

KVC（Key-value coding）键值编码，就是指iOS的开发中，可以允许开发者通过Key名直接访问对象的属性，或者给对象的属性赋值。

# 基础

```c++

//直接通过Key来取值
- (nullable id)valueForKey:(NSString *)key;                          

//通过Key来设值
- (void)setValue:(nullable id)value forKey:(NSString *)key;          

//通过KeyPath来取值
- (nullable id)valueForKeyPath:(NSString *)keyPath;                  

//通过KeyPath来设值
- (void)setValue:(nullable id)value forKeyPath:(NSString *)keyPath;  
```

## 出现异常，该key不存在 forUndefinedKey

```c++
- (void)setValue:(id)value 
 forUndefinedKey:(NSString *)key;
```

## accessInstanceVariablesDirectly

返回一个布尔值，该值指示在找不到属性的访问器方法时，键值编码方法是否应直接访问相应的实例变量。   
YES如果键值编码方法应在找不到属性的访问器方法时直接访问相应的实例变量，否则NO。

# NSArray 、 NSSet

# 搜索模式

1. 搜索实例与像一个名字找到的第一个访问方法get<Key>，<key>，is<Key>，或者_<key>，按照这个顺序。
2. 如果没有找到简单的访问器方法，请在实例中搜索名称与模式countOf<Key>和objectIn<Key>AtIndex:（与NSArray该类定义的原始方法<key>AtIndexes:相对应）和（与该NSArray方法相对应）相匹配的方法objectsAtIndexes:。
4. 没有找到简单的访问方法或阵列访问方法组，寻找一个三重的方法命名countOf<Key>，enumeratorOf<Key>和memberOf<Key>:（对应于由所定义的原始的方法NSSet类）。
5. 如果发现收集的访问方法没有简单的存取方法或者组，如果接收器的类方法accessInstanceVariablesDirectly返回YES，搜索名为实例变量_<key>，_is<Key>，<key>，或者is<Key>，按照这个顺序。如果找到，请直接获取实例变量的值
6. 如果检索到的属性值是对象指针，则只需返回结果。如果该值是所支持的标量类型NSNumber，则将其存储在NSNumber实例中并返回它。如果结果是NSNumber不支持的标量类型，请转换为NSValue对象并返回该对象。
7.如果其他所有方法均失败，请调用valueForUndefinedKey:。默认情况下会引发异常，但是的子类NSObject可能提供特定于键的行为。

# KVC设值
