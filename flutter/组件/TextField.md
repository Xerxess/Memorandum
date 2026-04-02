
# TextField

```dart
(new) TextField({
  Key? key,
  Object groupId = EditableText,
  TextEditingController? controller, // 绑定 TextEditingController，用于读取、设置或清除输入内容。
  FocusNode? focusNode,
  UndoHistoryController? undoController,
  InputDecoration? decoration = const InputDecoration(), // 定制输入框的几乎所有外观
  TextInputType? keyboardType, // 指定弹出哪种键盘（如 TextInputType.number 弹出数字键盘，emailAddress 弹出带 @ 的键盘）。
  TextInputAction? textInputAction, // 更改键盘右下角按钮的文字/图标（如 done、search、next）。
  TextCapitalization textCapitalization = TextCapitalization.none,
  TextStyle? style,
  StrutStyle? strutStyle,
  TextAlign textAlign = TextAlign.start,
  TextAlignVertical? textAlignVertical,
  TextDirection? textDirection,
  bool readOnly = false,
  ToolbarOptions? toolbarOptions,
  bool? showCursor,
  bool autofocus = false, // 页面打开时是否自动弹出键盘。
  WidgetStatesController? statesController,
  String obscuringCharacter = '•',
  bool obscureText = false, // 设为 true 时，输入内容会变成星号或圆点，用于密码输入。
  bool? autocorrect,
  SmartDashesType? smartDashesType,
  SmartQuotesType? smartQuotesType,
  bool enableSuggestions = true,
  int? maxLines = 1,
  int? minLines,
  bool expands = false,
  int? maxLength,
  MaxLengthEnforcement? maxLengthEnforcement,
  void Function(String)? onChanged, // 当用户输入发生变化时的实时回调（常用于搜索建议）。
  void Function()? onEditingComplete,
  void Function(String)? onSubmitted, // 用户点击键盘上的“确认/完成”按钮时的回调。
  void Function(String, Map<String, dynamic>)? onAppPrivateCommand,
  List<TextInputFormatter>? inputFormatters, // 限制输入规则。例如 FilteringTextInputFormatter.digitsOnly 强制只能输入数字。
  bool? enabled,
  bool? ignorePointers,
  double cursorWidth = 2.0,
  double? cursorHeight,
  Radius? cursorRadius,
  bool? cursorOpacityAnimates,
  Color? cursorColor,
  Color? cursorErrorColor,
  BoxHeightStyle? selectionHeightStyle,
  BoxWidthStyle? selectionWidthStyle,
  Brightness? keyboardAppearance,
  EdgeInsets scrollPadding = const EdgeInsets.all(20.0),
  DragStartBehavior dragStartBehavior = DragStartBehavior.start,
  bool? enableInteractiveSelection,
  bool? selectAllOnFocus,
  TextSelectionControls? selectionControls,
  void Function()? onTap,
  bool onTapAlwaysCalled = false,
  void Function(PointerDownEvent)? onTapOutside,
  void Function(PointerUpEvent)? onTapUpOutside,
  MouseCursor? mouseCursor,
  Widget? Function(BuildContext, {required int currentLength, required bool isFocused, required int? maxLength})? buildCounter,
  ScrollController? scrollController,
  ScrollPhysics? scrollPhysics,
  Iterable<String>? autofillHints = const <String>[],
  ContentInsertionConfiguration? contentInsertionConfiguration,
  Clip clipBehavior = Clip.hardEdge,
  String? restorationId,
  bool scribbleEnabled = true,
  bool stylusHandwritingEnabled = EditableText.defaultStylusHandwritingEnabled,
  bool enableIMEPersonalizedLearning = true,
  Widget Function(BuildContext, EditableTextState)? contextMenuBuilder = _defaultContextMenuBuilder,
  bool canRequestFocus = true,
  SpellCheckConfiguration? spellCheckConfiguration,
  TextMagnifierConfiguration? magnifierConfiguration,
  List<Locale>? hintLocales,
})
```

```dart
1. 文本提示类（Labels & Hints）
labelText / label: 输入框上方的标签。输入时会浮动。
hintText / hint: 占位文字，点击或输入时消失。
helperText: 底部的辅助说明文字（常态显示）。
errorText: 错误提示。一旦设置，边框通常会变红。
counterText: 右下角的计数器（如 "0/20"）。 

2. 图标与附件类（Icons & Affixes）
icon: 整个输入框外侧左方的图标。
prefixIcon / suffixIcon: 输入框内侧左右两端的图标（常用于搜索镜或清除按钮）。
prefix / suffix: 跟在输入文字前后的 Widget（如货币符号 ¥ 或单位 kg）。
prefixText / suffixText: 简单的纯文本前缀/后缀。 

3. 样式与颜色类（Styles & Colors）
filled / fillColor: 设置背景色。必须先设 filled: true。
isDense / isCollapsed: 压缩垂直高度，让输入框看起来更紧凑。
contentPadding: 控制内部文字与边框的间距。
floatingLabelBehavior: 控制标签什么时候浮动（总是、从不、或自动）。 

4. 边框全家桶（Borders）—— 最核心部分
这是最容易搞混的地方，取决于输入框当前的状态：
border: 基准边框（通常设为 OutlineInputBorder()）。
enabledBorder: 未获得焦点时的边框。
focusedBorder: 正在输入时的边框（通常加粗或变色）。
errorBorder: 有错误信息且未获得焦点时。
focusedErrorBorder: 有错误且正在输入时。 

(new) InputDecoration({
  Widget? icon,
  Color? iconColor,
  Widget? label,
  String? labelText,
  TextStyle? labelStyle,
  TextStyle? floatingLabelStyle,
  Widget? helper,
  String? helperText,
  TextStyle? helperStyle,
  int? helperMaxLines,
  String? hintText,
  Widget? hint,
  TextStyle? hintStyle,
  TextDirection? hintTextDirection,
  int? hintMaxLines,
  Duration? hintFadeDuration,
  bool maintainHintHeight = true,
  bool maintainHintSize = true,
  bool maintainLabelSize = false,
  Widget? error,
  String? errorText,
  TextStyle? errorStyle,
  int? errorMaxLines,
  FloatingLabelBehavior? floatingLabelBehavior,
  FloatingLabelAlignment? floatingLabelAlignment,
  bool? isCollapsed,
  bool? isDense,
  EdgeInsetsGeometry? contentPadding,
  Widget? prefixIcon,
  BoxConstraints? prefixIconConstraints,
  Widget? prefix,
  String? prefixText,
  TextStyle? prefixStyle,
  Color? prefixIconColor,
  Widget? suffixIcon,
  Widget? suffix,
  String? suffixText,
  TextStyle? suffixStyle,
  Color? suffixIconColor,
  BoxConstraints? suffixIconConstraints,
  Widget? counter,
  String? counterText,
  TextStyle? counterStyle,
  bool? filled,
  Color? fillColor,
  Color? focusColor,
  Color? hoverColor,
  InputBorder? errorBorder,
  InputBorder? focusedBorder,
  InputBorder? focusedErrorBorder,
  InputBorder? disabledBorder,
  InputBorder? enabledBorder,
  InputBorder? border,
  bool enabled = true,
  String? semanticCounterText,
  bool? alignLabelWithHint,
  BoxConstraints? constraints,
  VisualDensity? visualDensity,
})
```