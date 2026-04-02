
# CarouselView

CarouselView 是 Flutter 3.24 版本推出的官方 Material 3 轮播组件，旨在替代第三方插件（如 carousel_slider）来实现现代化的滑动视图。
采用 Material Design 设计的轮播小部件
CarouselView 显示一个可滚动的项目列表，每个项目的大小都可以根据所选布局动态变化

```dart
(new) CarouselView({
  Key? key,
  EdgeInsets? padding,
  Color? backgroundColor,
  double? elevation,
  ShapeBorder? shape,// 控制每个条目的形状，默认为带圆角的矩形（28.0 圆角）。
  Clip? itemClipBehavior,
  WidgetStateProperty<Color?>? overlayColor,
  bool itemSnapping = false, // 设为 true 时，滑动停止后会自动吸附到最近的条目，确保视图完整呈现。
  double shrinkExtent = 0.0, // 在滚动过渡期间，每个条目允许缩小的最小尺寸。
  CarouselController? controller, // 使用 CarouselController 来编程式控制跳转到特定项或监听位置变化。 
  Axis scrollDirection = Axis.horizontal, // 设置滚动方向，默认为水平（Axis.horizontal），也支持垂直滚动。
  bool reverse = false,
  void Function(int)? onTap, // 点击子项时的回调函数，会返回被点击项的索引。
  bool enableSplash = true,
  required double itemExtent, // 子元素在主轴方向（通常是宽度）的基本尺寸
  required List<Widget> children,
})
```

```
Material Design 3 引入了 4 种轮播布局
多视图浏览：此布局一次至少显示一个大、一个中、一个小轮播图项目。此布局由 CarouselView.weighted 支持。
非容器式（默认）：此布局显示滚动到容器边缘的项目。此布局受 CarouselView 支持。
主图：此布局一次至少显示一个大图和一个小图。此布局由 CarouselView.weighted 支持。
全屏布局：此布局一次显示一个占据屏幕边缘的大图项，并支持垂直滚动。两种构造函数均支持全屏布局。
```

## demo

```dart
void main() => runApp(
  Directionality(
    textDirection: TextDirection.ltr,
    child: SafeArea(child: MyCarousel()),
  ),
);

class MyCarousel extends StatefulWidget {
  @override
  State<MyCarousel> createState() => _MyCarouselState();
}

class _MyCarouselState extends State<MyCarousel> {
  // 1. 定义控制器和当前页码
  final CarouselController _controller = CarouselController();
  int _currentPage = 0;
  final int _itemCount = 5;
  var screenWidth = 0.0;
  @override
  void initState() {
    super.initState();
    // 监听滚动偏移量，实时计算当前页码
    _controller.addListener(() {
      // 假设 itemExtent 是全屏宽度 screenWidth
      int next = (_controller.offset / screenWidth).round();
      if (next != _currentPage) {
        setState(() {
          _currentPage = next;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    screenWidth = MediaQuery.of(context).size.width;
    return Column(
      children: [
        // 2. 轮播图部分
        SizedBox(
          height: 200,
          width: screenWidth,
          child: CarouselView(
            controller: _controller,
            itemExtent: screenWidth, // 全屏宽度
            shrinkExtent: screenWidth,
            itemSnapping: true,
            // 监听滚动来更新页码
            onTap: (index) {
              print("点击了 $index");
            },
            children: List.generate(
              _itemCount,
              (i) => Container(
                color: Colors.blue[(i + 1) * 100],
                child: Center(child: Text("Page $i")),
              ),
            ),
          ),
        ),

        const SizedBox(height: 10),

        // 3. 自定义指示器 (Dots)
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(_itemCount, (index) {
            return AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              margin: const EdgeInsets.symmetric(horizontal: 4),
              height: 8,
              width: _currentPage == index ? 24 : 8, // 选中的点变长
              decoration: BoxDecoration(
                color: _currentPage == index ? Colors.blue : Colors.grey,
                borderRadius: BorderRadius.circular(4),
              ),
            );
          }),
        ),
      ],
    );
  }
}
```