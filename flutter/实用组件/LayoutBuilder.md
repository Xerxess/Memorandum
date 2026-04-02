
# LayoutBuilder

LayoutBuilder 是 Flutter 中做响应式布局的核心组件。它能实时感知父容器传来的尺寸约束（Constraints），并让你可以根据这些尺寸（宽、高）动态返回不同的 UI。

工作原理:

- constraints.maxWidth: 父容器允许的最大宽度。
- constraints.maxHeight: 父容器允许的最大高度。

```dart
LayoutBuilder(
  builder: (BuildContext context, BoxConstraints constraints) {
    // 1. 判断宽度是否大于 600
    if (constraints.maxWidth > 600) {
      // 2. 宽屏幕：返回左右并排布局
      return _buildWideLayout();
    } else {
      // 3. 窄屏幕：返回上下堆叠布局
      return _buildNarrowLayout();
    }
  },
)

Widget _buildWideLayout() => Row(children: [Expanded(child: Text("左")), Expanded(child: Text("右"))]);
Widget _buildNarrowLayout() => Column(children: [Text("上"), Text("下")]);

```