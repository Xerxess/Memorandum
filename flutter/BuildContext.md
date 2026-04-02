
# BuildContext

- context就是Widget在Widget树中的位置标识。它是用于在树中向上查找父级信息的关键凭证。
- context指的是BuildContext，是一个抽象类，它的实现由框架自动在 Widget 插入树时完成，其底层是对 Element 的封装。

## context 的核心作用

### 在 Widget 树中查找祖先 Widget 的状态或数据

- Theme.of(context)
- Navigator.of(context)
- ScaffoldMessenger.of(context)
- MediaQuery.of(context)

### 在构建 Widget 时作为 build 函数参数

### 弹出 Dialog、SnackBar、BottomSheet 等 UI 组件

### 与 InheritedWidget 和 Provider 模式联动