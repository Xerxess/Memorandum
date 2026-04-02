<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Flutter Widget 生命周期](#flutter-widget-生命周期)
  - [App（全局）生命周期](#app全局生命周期)
  - [StatelessWidget](#statelesswidget)
  - [StatefulWidget](#statefulwidget)

<!-- /code_chunk_output -->

# Flutter Widget 生命周期

## App（全局）生命周期

整个 App 在操作系统层面的状态。你可以通过 WidgetsBindingObserver 或新版本中的 AppLifecycleListener 来监听这些状态。

- resumed：前台可见。App 处于活跃状态，可以响应用户输入。
- inactive：非活动状态。App 仍在前台但无法接收输入（例如：接听电话、下拉通知栏、进入多任务切换界面时）。
- paused：后台运行。App 对用户不可见，无法响应输入。此时引擎通常会暂停部分渲染工作以节省资源。
- detached：组件分离。App 仍在运行，但已与所有视图（View）脱离。通常发生在应用即将关闭或初始化之前。
- hidden (Flutter 3.13+ 新增)：应用的所有视图都已隐藏，但尚未进入后台（目前主要用于非移动端平台的统一）。

- 要开始接收通知，请调用WidgetsBinding.instance.addObserver，并引用实现WidgetsBindingObserver接口的对象。为了避免内存泄漏，请调用WidgetsBinding.instance.removeObserver，以便在对象达到生命周期结束时取消注册。
- 暂停/恢复动画、计时器
- 保存/恢复用户数据（如 SharedPreferences）
- 统计埋点

```dart
// 推荐使用 AppLifecycleListener（Flutter 3.13 引入）
late final AppLifecycleListener _listener;

@override
void initState() {
  super.initState();
  _listener = AppLifecycleListener(
    onResume: () => print('App 恢复前台'),
    onPause: () => print('App 进入后台'),
    // 还可以监听 onHide, onDetach, onRestart 等
  );
}

@override
void dispose() {
  _listener.dispose(); // 别忘了释放
  super.dispose();
}
```

```dart
// 旧版本中，你需要混入 WidgetsBindingObserver 并重写 didChangeAppLifecycleState 方法
class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> with WidgetsBindingObserver {
  @override
  void initState() {
    super.initState();
    // 注册观察者
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    // 移除观察者
    // WidgetsBinding 是 Flutter 框架的一个单例，负责 Flutter 引擎 与 Widget 层 之间的通信。它是应用级别事件的总调度中心。
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  // 当应用程序尺寸发生变化时调用。例如，当手机旋转时。
  @override
  void didChangeMetrics(){
    print('当应用程序尺寸发生变化时调用。例如，当手机旋转时。')
  }



  // 当系统将应用程序置于后台或将应用程序返回前台时调用。
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    // 状态变化时会回调
    switch (state) {
      case AppLifecycleState.resumed:
        // 应用从后台进入前台
        print('应用从后台进入前台')
        break;
      case AppLifecycleState.inactive:
        // 处于不活动状态（例如来电、Android 的多窗口）
        print('处于不活动状态（例如来电、Android 的多窗口）')
        break;
      case AppLifecycleState.paused:
        // 进入后台
        print('入后台')
        break;
      case AppLifecycleState.detached:
        // 应用正被完全销毁（仅在 Android/iOS 的极端情况出现）
        print('应用正被完全销毁（仅在 Android/iOS 的极端情况出现）')
        break;
      case AppLifecycleState.hidden:
        // Android 12+ 多任务视图隐藏
        print('Android 12+ 多任务视图隐藏')
        break;
    }
  }

  // 当平台亮度发生变化时调用
  @override
  void didChangePlatformBrightness(){
    print('当平台亮度发生变化时调用')
  }


  @override
  Widget build(BuildContext context) => Container();
}
```


## StatelessWidget

- StatelessWidget 没有保存状态的能力，build() 每次都会在父 Widget 重建时被调用。

```dart
class MyStateless extends StatelessWidget {
  final String title;
  MyStateless(this.title);

  @override
  Widget build(BuildContext context) {
    // 每次父 Widget 重建，这里都会被调用
    return Text(title);
  }
}
```

## StatefulWidget

- 构造函数
- createState 框架创建 StatefulWidget 后立即调用，创建对应的 State 对象。
- initState 	仅调用一次。用于初始化变量、网络请求或订阅监听器。 
- didChangeDependencies 	在 initState 后或当依赖的 InheritedWidget（如 Theme/Locale）变化时触发。
- build 最核心方法。定义 UI 结构。会在 setState 或配置变化后多次被调用。
- didUpdateWidget 	父组件重建并传入新配置（Key 没变）时调用，用于对比新旧 Widget。
- deactivate 暂时从树中移除（例如被 Navigator 压栈），State 可能被重新插入。
- dispose 	永久销毁。在此必须取消定时器、流订阅等，防止内存泄漏。

```dart
class CounterWidget extends StatefulWidget {
  final int initialCount;
  const CounterWidget({Key? key, this.initialCount = 0}) : super(key: key);
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  late int _count;

  // 1️⃣ 只调用一次，做一次性初始化
  @override
  void initState() {
    super.initState();
    _count = widget.initialCount;
    // e.g. 启动计时器、Stream、监听器
    print('initState');
  }


  // 2️⃣ 当依赖的 InheritedWidget 变化时，会再次被调用
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print('didChangeDependencies');
  }

  // 3️⃣ 每次 build 都会执行（只要 setState 或父 Widget 重建）
  @override
  Widget build(BuildContext context) {
    print('build');
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text('Count: $_count'),
        ElevatedButton(
          onPressed: () => setState(() => ++_count),
          child: const Text('+1'),
        ),
      ],
    );
  }

  // 4️⃣ 当父 Widget 用新的 CounterWidget 重建时调用
  @override
  void didUpdateWidget(covariant CounterWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    // 如果需要根据 newConfig 更新状态，可在这里同步
    if (widget.initialCount != oldWidget.initialCount) {
      _count = widget.initialCount;
    }
    print('didUpdateWidget');
  }

  // 5️⃣ 临时从树中移除（比如父 Widget 使用 Key 改变位置）
  @override
  void deactivate() {
    print('deactivate');
    super.deactivate();
  }

  // 6️⃣ 永久移除，释放资源
  @override
  void dispose() {
    print('dispose');
    // 取消动画、关闭 Timer、取消订阅 etc.
    super.dispose();
  }
}
```

