<!-- TOC -->

- [NSJSONSerialization](#nsjsonserialization)
- [NSJSONReadingOptions (转oc对象)](#nsjsonreadingoptions-转oc对象)
- [NSJSONWritingOptions (转json)](#nsjsonwritingoptions-转json)

<!-- /TOC -->

https://developer.apple.com/documentation/foundation/nsjsonserialization?language=occ

# NSJSONSerialization

```c++
// 从给定的JSON数据返回Foundation对象。
+ (id)JSONObjectWithData:(NSData *)data 
                 options:(NSJSONReadingOptions)opt 
                   error:(NSError * _Nullable *)error;

// 从给定流中的JSON数据返回Foundation对象。
+ (id)JSONObjectWithStream:(NSInputStream *)stream 
                   options:(NSJSONReadingOptions)opt 
                     error:(NSError * _Nullable *)error;
```

# NSJSONReadingOptions (转oc对象)

* NSJSONReadingMutableContainers 指定将数组和字典创建为可变对象。
* NSJSONReadingMutableLeaves 指定将JSON对象图中的叶字符串创建为的实例。NSMutableString

# NSJSONWritingOptions (转json)

* NSJSONWritingPrettyPrinted 使用空格和缩进的写入选项使输出更具可读性。
* NSJSONWritingSortedKeys 按字典顺序对键进行排序的写入选项。
