
# LimitedBox

- 只有在不受约束时才会限制自身大小的盒子
- 核心逻辑是：如果父组件传下来的约束是无限的（Unconstrained），它就强制给子组件一个最大宽高；如果约束是有限的，它就完全不工作（直接透传约束）。
- 经典场景：ListView

```dart
(new) LimitedBox({
  Key? key,
  double maxWidth = double.infinity,
  double maxHeight = double.infinity,
  Widget? child,
})
```

## demo

```dart
// UnconstrainedBox 无约束
class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.ltr,
      child: Center(
        child: Container(
          color: Colors.green,
          width: 300,
          child: UnconstrainedBox(
            child: LimitedBox(
              maxHeight: 200,
              child: Container(color: Colors.red),
            ),
          ),
        ),
      ),
    );
  }
}
```

```dart
// ListView
class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.ltr,
      child: ListView(
        children: [
          Container(color: Colors.green),
          Container(height: 90, color: Colors.brown),
          LimitedBox(maxHeight: 200, child: Container(color: Colors.red)),
        ],
      ),
    );
  }
}
```