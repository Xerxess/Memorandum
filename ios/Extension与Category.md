
# Extension与Category

## Category

* Category只能添加方法
* 不能添加成员变量或属性
* 可以通过property添加属性，但也只是对属性的set、get方法声明，没有实现，也不能生成带下划线的变量

```c++
// 文件名规范：ClassName+Category.h
// ClassName+Category.h
#import "ClassName.h"
@interface ClassName (Category)
    -(void)saySex;
@end
```

## Extension

* 在实现文件中添加私有的成员变量、属性和方法
* 已知的类.m 中操作所以可以对外界隐藏一些方法或变量，使其成为私有
* 可以添加属性和成员变量，也可以为属性生成set、get方法和默认的实现。

```c++
//  Person.m
#import "Person.h"

@interface Person ()
{
    NSString * _address;
}
@property (nonatomic) NSInteger age;

-(NSString*)WhereAmI;

@end

@implementation Person

-(NSString*)WhereAmI{
    return @"哪里";
}

@end
```

## Extension与Category区别

* Extension
    * 在编译器决议，是类的一部分
    * 伴随着类的产生而产生，也随着类的消失而消失
    * Extension一般用来隐藏类的私有消息，你必须有一个类的源码才能添加一个类的Extension
* Category
    * 运行期决议
    * Category有名称，有自己的.m文件
    * 类扩展可以添加实例变量，分类不能添加实例变量
    * 可以通过property添加属性，但也只是对属性的set、get方法声明，没有实现，也不能生成带下划线的变量