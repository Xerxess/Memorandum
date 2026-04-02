<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [ValueListenableBuilder](#valuelistenablebuilder)
  - [ValueNotifier 与 ChangeNotifier](#valuenotifier-与-changenotifier)

<!-- /code_chunk_output -->

# ValueListenableBuilder

是 Flutter 中最轻量级、高性能的局部刷新工具

工作原理:

- 监听一个名为 ValueNotifier 的小容器
- 当容器里的值发生变化时，它只重新构建 ValueListenableBuilder 包裹的那一小部分 UI，页面的其他部分完全不动

```dart
// 第一步：创建一个监听器（通常在类成员变量中）
// 这里的 int 可以换成 String, bool, 甚至是你的自定义对象
final ValueNotifier<int> _counter = ValueNotifier<int>(0);

// 第二步：在 UI 中使用 Builder 监听
ValueListenableBuilder<int>(
  valueListenable: _counter, // 监听这个变量
  builder: (context, value, child) {
    // 只有这里的代码会随着 _counter 的变化而重新执行
    return Text('当前数值: $value');
  },
)

// 第三步：改变值（触发 UI 更新）
// 只要修改 .value，UI 就会瞬间局部刷新
_counter.value++;
```

## ValueNotifier 与 ChangeNotifier

ValueNotifier 是 ChangeNotifier 的一个特化子类。

- 它内部维护了一个 .value 属性。
- 核心逻辑：当你修改 .value 时，它会自动调用 notifyListeners()。
- 适用场景：监听一个单一变量（如开关状态、计数、当前选中的索引）。

ChangeNotifier（全能型选手）

- 核心逻辑：你需要手动在逻辑结束处调用 notifyListeners()，UI 才会刷新
- 适用场景：复杂的业务模型。比如一个 UserModel，里面有用户名、头像、登录状态等多个属性。

```dart
class UserProvider extends ChangeNotifier {
  String name = "";
  int age = 0;

  void updateInfo(String n, int a) {
    name = n;
    age = a;
    notifyListeners(); // 必须手动点火，UI 才会动
  }
}
```