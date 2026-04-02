<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Riverpod](#riverpod)
  - [Providers 提供者](#providers-提供者)
  - [使用提供商](#使用提供商)
  - [Consumers 消费者](#consumers-消费者)
  - [Refs](#refs)

<!-- /code_chunk_output -->

# Riverpod

- Riverpod 是 Flutter 官方推荐的新一代状态管理库，是 Provider 的升级版。

<https://riverpod.dev/>

## Providers 提供者

- 供应商共有 6 种类型
  - 不可修改的
    - Provider
    - FutureProvider
    - StreamProvider
  - 可编辑
    - NotifierProvider
    - AsyncNotifierProvider
    - StreamNotifierProvider

```dart
// 不可修改的
final name = SomeProvider.someModifier<Result>((ref) {
  <your logic here>
});

// Modifiable (notifier) 可修改（通知）
final name = SomeNotifierProvider.someModifier<MyNotifier, Result>(MyNotifier.new);
class MyNotifier extends SomeNotifier<Result> {
  @override
  Result build() {
    <your logic here>
  }
  <your methods here>
}
```

## 使用提供商

- Flutter 应用程序包装在 ProviderScope

```dart
void main() {
  runApp(ProviderScope(child: MyApp()));
}
```

## Consumers 消费者

- Widget 树需要一种特殊的组件，称为 Consumers
    - 可以对所有情况都使用 Consumer
- ConsumerWidget 是 StatelessWidget 组件的一个变体。
- ConsumerStatefulWidget 是 StatefulWidget 小部件的一个变体
- hooks_riverpod 包中找到额外的消费者。

```dart
// Consumer
class Example extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer(
      builder: (context, ref, _) {
        // Obtain the value of the provider
        final helloWorld = ref.watch(helloWorldProvider);

        // Use the value in the UI
        return Text(helloWorld);
      },
    );
  }
}
```

```dart
// ConsumerWidget
// We subclass ConsumerWidget instead of StatelessWidget
class MyWidget extends ConsumerWidget {
  // "build" receives an extra parameter
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // We can use that "ref" to listen to providers
    final value = ref.watch(myProvider);
    return Text(value.toString());
  }
}
```

```dart
// ConsumerStatefulWidget
class MyWidget extends ConsumerStatefulWidget {
  @override
  ConsumerState<MyWidget> createState() => _MyWidgetState();
}
// We subclass ConsumerState instead of State
class _MyWidgetState extends ConsumerState<MyWidget> {
  // A "this.ref" property is available
  @override
  Widget build(BuildContext context) {
    // We can use that "ref" to listen to providers
    final value = ref.watch(myProvider);
    return Text(value.toString());
  }
}
```

## Refs


