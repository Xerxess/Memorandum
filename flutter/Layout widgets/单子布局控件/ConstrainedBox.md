
# ConstrainedBox

- 对其子组件施加额外约束的组件
- 约束minWidth、minHeight、maxWidth、maxHeight

```dart
(new) ConstrainedBox({
  Key? key,
  required BoxConstraints constraints, // 对child施加的额外限制
  Widget? child,
})
```

## demo

```dart
class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.ltr,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(
            minWidth: 200,
            minHeight: 90,
            maxWidth: 200, // 限制最大宽度
            maxHeight: 90,
          ),
          child: Card(child: Center(child: Text('Hello World!'))),
        ),
      ),
    );
  }
}
```