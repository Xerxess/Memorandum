
# Padding

按给定内边距内缩进子元素的控件

```dart
(const) Padding({
  Key? key,
  required EdgeInsetsGeometry padding,
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
        child: Container(
          width: 300,
          height: 200,
          color: Colors.blue,
          child: const Card(
            margin: EdgeInsets.all(0),
            child: Padding(
              padding: EdgeInsets.all(10.0),
              child: Text('Hello World!'),
            ),
          ),
        ),
      ),
    );
  }
}
```