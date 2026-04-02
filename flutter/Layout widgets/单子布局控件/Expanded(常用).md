
# Expanded

- 可以展开 Row 、 Column 或 Flex 组件子元素的控件。
- 使用 Expanded 组件会将其创建为 Row 、 Column 或 Flex 组件的子组件。 沿主轴方向扩展以填充可用空间（例如，水平方向）。 （ 行或列的垂直方向）。如果展开多个子元素，则可用空间将根据弹性因子在它们之间分配。
- 可以想成css 中flex:1 的使用方式
- Expanded 组件必须是 Row 、 Column 或 Flex 组件的子组件

```dart
(new) Expanded({
  Key? key,
  int flex = 1, // 适用的弹性系数
  required Widget child,
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
        child: Container(
          color: Colors.green,
          width: 300,
          height: 100,
          child: Row(
            children: [
              Icon(Icons.access_alarms),
              VerticalDivider(width: 10, color: Colors.red),
              Expanded(child: Container(width: 100, color: Colors.amberAccent)),
              Container(width: 100, color: Colors.cyan),
            ],
          ),
        ),
      ),
    );
  }
}
```