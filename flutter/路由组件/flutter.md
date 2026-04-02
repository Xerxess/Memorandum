
# 

```dart
Widget getRootWidget() {
  final routes = getRoutes(); // 先获取
  return CupertinoApp(routes: routes);
}

// 返回所有路由配置
Map<String, Widget Function(BuildContext)> getRoutes() {
  return {
    '/': (BuildContext context) => const HomePage(),
    '/about': (BuildContext context) => const AboutPage(),
    '/settings': (BuildContext context) => const SettingsPage(),
    '/other': (BuildContext context) => const EmptyPage(),
  };
}

class HomePage extends StatefulWidget {
  const TabPage1({super.key});

  @override
  State<HomePage> createState() => _TabPage1State();
}

class _TabPage1State extends State<HomePage> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Center(child: Text("HomePage$count")),
            TextButton(
              onPressed: () {
                Navigator.of(context, rootNavigator: true).pushNamed('/other');
              },
              child: Text('跳转'),
            ),
            TextButton(
              onPressed: () {
                count += 1;
                setState(() {});
              },
              child: Text('改变状态'),
            ),
          ],
        ),
      ),
    );
  }
}

```