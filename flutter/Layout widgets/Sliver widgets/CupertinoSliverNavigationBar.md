
# CupertinoSliverNavigationBar

CupertinoSliverNavigationBar 是 Flutter 中用于模拟 iOS 风格（UIKit）大标题滚动效果 的核心组件。

```dart
void main() => runApp(
  Material(
    child: MaterialApp(home: SafeArea(child: MyWidget())),
  ),
);

class MyWidget extends StatelessWidget {
  const MyWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return // 注意：根部建议使用 CupertinoApp 和 CupertinoPageScaffold
    CupertinoPageScaffold(
      child: CustomScrollView(
        slivers: <Widget>[
          CupertinoSliverNavigationBar(
            largeTitle: Text('设置'), // 初始显示的大文字
            middle: Text('设置'), // 滚动后出现在顶部的微型文字
            trailing: Icon(CupertinoIcons.add), // 右侧按钮
            previousPageTitle: '返回', // 返回箭头的文字
          ),
          // 接下来是滚动的列表内容
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) => CupertinoListTile(title: Text('选项 $index')),
              childCount: 20,
            ),
          ),
        ],
      ),
    );
  }
}
```