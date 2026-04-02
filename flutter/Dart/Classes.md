<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Classes](#classes)
  - [获取对象的类型](#获取对象的类型)
  - [Constructors 构造函数](#constructors-构造函数)
    - [Generative constructors 生成式构造器](#generative-constructors-生成式构造器)
    - [Default constructors 默认构造函数](#default-constructors-默认构造函数)
    - [Named constructors 命名构造函数](#named-constructors-命名构造函数)
    - [Constant constructors 常量构造函数](#constant-constructors-常量构造函数)
    - [Redirecting constructors 重定向构造函数](#redirecting-constructors-重定向构造函数)

<!-- /code_chunk_output -->


# Classes

- Dart 是一种面向对象的语言，它使用类和基于 mixin 的继承机制。
- 除了 Null 之外，所有类都继承自 Object 
- 每个类都隐式地定义了一个接口，该接口包含该类及其实现的所有接口的所有实例成员。

```dart
class Point {
    // 实例变量
    double? x; // Declare instance variable x, initially null.
    double? y; // Declare y, initially null.
    double z = 0; // Declare z, initially 0.

    // 静态变量
    static const initialCapacity = 16;

    // 静态方法
    static double distanceBetween(Point a, Point b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return sqrt(dx * dx + dy * dy);
    }

}

// 实现多个接口
class Point implements Comparable, Location {
  ...
}
```

## 获取对象的类型

```dart
print('The type of a is ${a.runtimeType}');
```

## Constructors 构造函数

- Generative constructors 生成式构造器
- Default constructors 默认构造函数
- Named constructors 命名构造函数
- Constant constructors 常量构造函数
- Factory constructors 工厂构造器
- Redirecting constructor 重定向构造函数

### Generative constructors 生成式构造器

```dart
class Point {
  // Instance variables to hold the coordinates of the point.
  double x;
  double y;

  // 具有初始化形式参数的生成构造函数
  Point(this.x, this.y);
}
```

### Default constructors 默认构造函数

没有声明构造函数，Dart 会使用默认构造函数。默认构造函数是一个不带参数或名称的生成式构造函数。

### Named constructors 命名构造函数

- 使用命名构造函数可以为类实现多个构造函数
- 子类不会继承父类的命名构造函数。

```dart
const double xOrigin = 0;
const double yOrigin = 0;

class Point {
  final double x;
  final double y;

  // Sets the x and y instance variables
  // before the constructor body runs.
  Point(this.x, this.y);

  // 命名构造函数
  Point.origin() : x = xOrigin, y = yOrigin;
}

var dd = Point.origin();
```

### Constant constructors 常量构造函数

```dart
class ImmutablePoint {
  static const ImmutablePoint origin = ImmutablePoint(0, 0);

  final double x, y;

  const ImmutablePoint(this.x, this.y);
}
```

### Redirecting constructors 重定向构造函数

- 构造函数可能会重定向到同一类中的另一个构造函数。重定向构造函数的函数体为空。构造函数使用 this ( : ) 代替类名。

```dart
class Point {
  double x, y;

  // The main constructor for this class.
  Point(this.x, this.y);

  // Delegates to the main constructor.
  Point.alongXAxis(double x) : this(x, 0);
}

var dd = Point.alongXAxis(1.0);
```