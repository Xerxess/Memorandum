
# IntrinsicHeight

能根据子组件自身高度调整其大小的组件
IntrinsicHeight 的作用是：将其子组件的高度调整为子组件自身的“固有高度”
- 放置一个 在 IntrinsicHeight 内的 Row 将允许 Row 中的所有子元素与最高的子元素一样高。
- 性能开销非常大,尽可能避免使用它


## demo

```dart
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
          // Container 的高度由Row的最高子组件确定
          child: IntrinsicHeight(
            child: Row(
              children: [
                Text("小明明明1"),
                VerticalDivider(color: Colors.amber),
                Text("小明明明2"),
                VerticalDivider(width: 20, color: Colors.red),
                Text("小明\n明\n明\n\n\n\n\n\n3"),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```