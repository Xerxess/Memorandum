<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Flutter 中的布局](#flutter-中的布局)
  - [常用布局组件](#常用布局组件)
    - [标准组件](#标准组件)
    - [Material 组件](#material-组件)
    - [Cupertino widgets(苹果风格)](#cupertino-widgets苹果风格)
  - [Container](#container)
  - [GridView](#gridview)
  - [ListView](#listview)
  - [Stack](#stack)
  - [Card](#card)
  - [ListTile](#listtile)
- [构建 Flutter 布局](#构建-flutter-布局)

<!-- /code_chunk_output -->

# Flutter 中的布局

## 常用布局组件

### 标准组件

- Container 为小部件添加内边距、外边距、边框、背景颜色或其他装饰。
- GridView 将组件以可滚动网格的形式排列。
- ListView 将组件以可滚动列表的形式排列。
- Stack 将一个组件覆盖在另一个组件之上。

### Material 组件

- Scaffold 提供结构化的布局框架，其中包含用于常见 Material Design 应用元素的插槽。
- AppBar 创建一个水平条，通常显示在屏幕顶部。
- Card 将相关信息整理到一个带有圆角和阴影的方框中。
- ListTile 将最多 3 行文本以及可选的行首和行尾图标排列成一行。

### Cupertino widgets(苹果风格)

- CupertinoPageScaffold 提供 iOS 风格页面的基本布局结构。
- CupertinoNavigationBar 在屏幕顶部创建一个 iOS 风格的导航栏。
- CupertinoSegmentedControl 创建用于选择的分段控件。
- CupertinoTabBar 和 CupertinoTabScaffold 创建 iOS 特有的底部标签栏。

## Container

- 添加内边距、外边距、边框
- 更改背景颜色或图像
- 包含一个子控件，但该子控件可以是 Row 。 Column ，甚至是组件树的根节点

## GridView

- 将组件以网格形式排列
- 检测列内容何时超出渲染框，并自动提供滚动条。
- 可以创建自己的自定义网格，也可以使用提供的网格之一

## ListView

- 一个专门的 Column 用于整理盒子清单
- 可以水平放置或垂直放置
- 检测内容何时无法完整显示，并提供滚动功能。
- 比 Column 配置性差，但更易于使用。 支持滚动

## Stack

- 用于与其他控件重叠的控件
- 子组件列表中的第一个组件是基础组件；后续的子组件都覆盖在该基础组件之上。
- Stack 的内容无法滚动
- 您可以选择裁剪超出渲染框的子元素

## Card

- 来自Material library
- 以圆角和阴影效果显示
- Card 的内容无法滚动
 
## ListTile

- 来自Material library
- 一个特殊的行，最多可包含 3 行文本和可选图标。
- 比 Row 配置选项少，但更易于使用。

# 构建 Flutter 布局

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    const String appTitle = 'Flutter layout demo';
    return MaterialApp(
      title: appTitle,
      home: Scaffold(
        appBar: AppBar(title: const Text(appTitle)),
        body: SingleChildScrollView(
          child: Column(
            spacing: 20,
            children: [
              ImageSection(image: "images/lake.jpg"),
              TitleSection(name: '小明', location: '小明'),
              ButtonSection(),
              TextSection(
                description:
                    'Lake Oeschinen lies at the foot of the Blüemlisalp in the '
                    'Bernese Alps. Situated 1,578 meters above sea level, it '
                    'is one of the larger Alpine Lakes. A gondola ride from '
                    'Kandersteg, followed by a half-hour walk through pastures '
                    'and pine forest, leads you to the lake, which warms to 20 '
                    'degrees Celsius in the summer. Activities enjoyed here '
                    'include rowing, and riding the summer toboggan run.',
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class TitleSection extends StatelessWidget {
  final String name;
  final String location;

  const TitleSection({super.key, required this.name, required this.location});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        border: Border.all(width: .1, color: Colors.red),
      ),
      margin: EdgeInsets.all(8.0),
      padding: EdgeInsets.all(8.0),
      child: Row(
        children: [
          Expanded(
            child: Padding(
              padding: EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [Text("Title"), Text('content')],
              ),
            ),
          ),
          Icon(Icons.star, color: Colors.red[500]),
          Center(child: Text("41")),
        ],
      ),
    );
  }
}

class ButtonSection extends StatelessWidget {
  const ButtonSection({super.key});

  @override
  Widget build(BuildContext context) {
    final Color color = Theme.of(context).primaryColor;
    return SizedBox(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          ButtonWithText(color: color, icon: Icons.call, label: 'CALL'),
          ButtonWithText(color: color, icon: Icons.near_me, label: 'ROUTE'),
          ButtonWithText(color: color, icon: Icons.share, label: 'SHARE'),
        ],
      ),
    );
  }
}

class ButtonWithText extends StatelessWidget {
  final Color color;
  final IconData icon;
  final String label;

  const ButtonWithText({
    super.key,
    required this.color,
    required this.icon,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(icon),
        Padding(
          padding: EdgeInsets.only(top: 10),
          child: Text(
            label,
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight(700),
              color: color,
            ),
          ),
        ),
      ],
    );
  }
}

class TextSection extends StatelessWidget {
  const TextSection({super.key, required this.description});
  final String description;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(8),
      child: Text(description, softWrap: true),
    );
  }
}

class ImageSection extends StatelessWidget {
  const ImageSection({super.key, required this.image});
  final String image;
  @override
  Widget build(BuildContext context) {
    return Image.asset(image, width: 600, height: 240, fit: BoxFit.cover);
  }
}

```