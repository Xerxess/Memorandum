
# StatefulWidget

当一个控件的外观或数据需要在其生命周期内发生改变时，你需要一个 StatefulWidget 和一个与之配套的 State 对象。虽然 StatefulWidget 本身仍然是不可变的（其属性在创建后无法更改），但 State 对象是长期存在的。 可以存储可变数据，并且当数据发生变化时可以重建。 导致用户界面更新。

```dart
// StatefulWidget
class ExampleWidget extends StatefulWidget {
  ExampleWidget({super.key});

  @override
  State<ExampleWidget> createState() => _ExampleWidgetState();
}

// State
class _ExampleWidgetState extends State<ExampleWidget> {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```