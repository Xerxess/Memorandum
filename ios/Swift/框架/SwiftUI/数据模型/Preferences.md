<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Preferences](#preferences)
- [修饰符](#修饰符)
- [示例](#示例)
  - [preference](#preference)
  - [anchorPreference](#anchorpreference)
  - [transformAnchorPreference](#transformanchorpreference)
  - [backgroundPreferenceValue](#backgroundpreferencevalue)

<!-- /code_chunk_output -->

# Preferences

- 环境变量(environment)来配置视图的子视图
- preferences 从子视图将配置发送到其容器视图
- PreferenceKey 协议
- Preferences 是 SwiftUI 中用于子视图向父视图传递数据的机制。

PreferenceKey 必须定义：

- defaultValue：默认值
- reduce：合并多个值的方法

```swift
// 1. 定义 PreferenceKey
struct HeightPreferenceKey: PreferenceKey {
    static var defaultValue: CGFloat = 0
    
    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) {
        value = nextValue()
    }
}

// 2. 使用示例
struct PreferencesDemo: View {
    @State private var childHeight: CGFloat = 0
    var body: some View {
        VStack {
            Text("子视图高度: \(Int(childHeight))")
            
            Text("子视图")
                .padding()
                .background(Color.blue.opacity(0.2))
                .background(
                    GeometryReader { geometry in
                        Color.clear.preference(
                            key: HeightPreferenceKey.self,
                            value: geometry.size.height
                        )
                    }
                )
        }
        .onPreferenceChange(HeightPreferenceKey.self) { height in
            childHeight = height
        }
    }
}
```

# 修饰符

```swift
// 给定首选项设置一个值
func preference<K>(
    key: K.Type = K.self,
    value: K.Value
) -> some View where K : PreferenceKey

// 通过闭包的 inout 传递 
func transformPreference<K>(
    _ key: K.Type = K.self,
    _ callback: @escaping (inout K.Value) -> Void
) -> some View where K : PreferenceKey

// preference与类型只是通过闭包可以转换一下数据类型
func anchorPreference<A, K>(
    key _: K.Type = K.self,
    value: Anchor<A>.Source,
    transform: @escaping (Anchor<A>) -> K.Value
) -> some View where K : PreferenceKey

// transformPreference类型只是通过闭包 inout 可以转换一下数据类型
func transformAnchorPreference<A, K>(
    key _: K.Type = K.self,
    value: Anchor<A>.Source,
    transform: @escaping (inout K.Value, Anchor<A>) -> Void
) -> some View where K : PreferenceKey

// 添加在指定首选项键的值更改时要执行的作
func onPreferenceChange<K>(
    _ key: K.Type = K.self,
    perform action: @escaping (K.Value) -> Void
) -> some View where K : PreferenceKey, K.Value : Equatable

// 从视图中读取指定的首选项值，并使用该值生成第二个视图，该视图将应用为原始视图的背景
func backgroundPreferenceValue<Key, T>(
    _ key: Key.Type = Key.self,
    @ViewBuilder _ transform: @escaping (Key.Value) -> T
) -> some View where Key : PreferenceKey, T : View

func backgroundPreferenceValue<K, V>(
    _ key: K.Type,
    alignment: Alignment = .center,
    @ViewBuilder _ transform: @escaping (K.Value) -> V
) -> some View where K : PreferenceKey, V : View

func overlayPreferenceValue<Key, T>(
    _ key: Key.Type = Key.self,
    @ViewBuilder _ transform: @escaping (Key.Value) -> T
) -> some View where Key : PreferenceKey, T : View

func overlayPreferenceValue<K, V>(
    _ key: K.Type,
    alignment: Alignment = .center,
    @ViewBuilder _ transform: @escaping (K.Value) -> V
) -> some View where K : PreferenceKey, V : View
```

# 示例

## preference

```swift
struct GetInfoByPreferenceKey: View {
    var body: some View {
        ScrollView {
            Text("Hello world")
                .overlay(
                    GeometryReader { proxy in
                        Color.clear
                            .preference(key: MinYKey.self, value: proxy.frame(in: .global).minY)
                    }
                )
        }
        .onPreferenceChange(MinYKey.self) { value in
            print(value)
        }
    }
}

struct MinYKey: PreferenceKey {
    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) {
        value = nextValue()
    }
    static var defaultValue: CGFloat = .zero
}
```

## anchorPreference

- 为指定的首选项键设置一个值，该值是与当前坐标空间绑定的几何值的函数，允许该值的读取者将几何图形转换为其本地坐标。
- transform Return Value:写入首选项的视图的新版本
- 由于 Anchor<Type> 需要 GeometryReader 配合使用

```swift
func anchorPreference<A, K>(
    key _: K.Type = K.self,
    value: Anchor<A>.Source,
    transform: @escaping (Anchor<A>) -> K.Value
) -> some View where K : PreferenceKey
```

```swift
// 1. 定义数据结构
struct ViewAnchorData:Equatable {
    let viewId: Int
    let anchor: Anchor<CGRect>
}

// 2. 定义 PreferenceKey
struct ViewAnchorKey: PreferenceKey {
    static var defaultValue: [ViewAnchorData] = []
    
    static func reduce(value: inout [ViewAnchorData], nextValue: () -> [ViewAnchorData]) {
        value.append(contentsOf: nextValue())
    }
}

// 3. 使用示例
struct Page1: View {
    @State private var anchors: [ViewAnchorData] = []
    
    var body: some View {
        ZStack {
            // 内容视图
            VStack(spacing: 20) {
                ForEach(0..<3) { index in
                    Text("视图 \(index)")
                        .padding()
                        .background(Color.blue.opacity(0.2))
                        .anchorPreference(
                            key: ViewAnchorKey.self,
                            value: .bounds
                        ) { anchor in
                           return [ViewAnchorData(viewId: index, anchor: anchor)]
                        }
                }
            }
            
            // 覆盖层，显示边框
            GeometryReader { geometry in
                ForEach(anchors, id: \.viewId) { data in
                    let rect = geometry[data.anchor]
                    Rectangle()
                        .strokeBorder(Color.red, lineWidth: 2)
                        .frame(width: rect.width, height: rect.height)
                        .position(x: rect.midX, y: rect.midY)
                }
            }
        }
        .onPreferenceChange(ViewAnchorKey.self) { value in
            print(value)
            anchors = value
        }
    }
}
```

## transformAnchorPreference

- 为指定的首选项键设置一个值
- 与 anchorPreference 不同 transformAnchorPreference 通过 inout 修改数据
- 由于 Anchor<Type> 需要 GeometryReader 配合使用

```swift
func transformAnchorPreference<A, K>(
    key _: K.Type = K.self,
    value: Anchor<A>.Source,
    transform: @escaping (inout K.Value, Anchor<A>) -> Void
) -> some View where K : PreferenceKey
```

```swift
struct ViewInfo: Equatable {
    let id: Int
    var frame: CGRect
}

struct ViewInfoKey: PreferenceKey {
    static var defaultValue: [ViewInfo] = []
    
    static func reduce(value: inout [ViewInfo], nextValue: () -> [ViewInfo]) {
        value.append(contentsOf: nextValue())
    }
}

struct TransformAnchorDemo: View {
    @State private var viewInfos: [ViewInfo] = []
    
    var body: some View {
        ZStack {
            VStack(spacing: 20) {
                ForEach(0..<3) { index in
                    Text("项目 \(index)")
                        .padding()
                        .background(Color.blue.opacity(0.2))
                        .transformAnchorPreference(
                            key: ViewInfoKey.self,
                            value: .bounds
                        ) { (value: inout [ViewInfo], anchor: Anchor<CGRect>) in
                            value.append(ViewInfo(id: index, frame: .zero))
                        }
                }
            }
            
            // 使用 GeometryReader 转换坐标
            GeometryReader { geometry in
                ForEach(viewInfos, id: \.id) { info in
                    Text("位置信息 \(info.id)")
                        .font(.caption)
                        .position(x: info.frame.midX, y: info.frame.maxY + 20)
                }
            }
        }
        .onPreferenceChange(ViewInfoKey.self) { value in
            viewInfos = value
        }
    }
}
```

## backgroundPreferenceValue

```swift
struct MyPreferenceKey: PreferenceKey {
    typealias V = [Anchor<CGRect>]
    static var defaultValue: V = []
    
    static func reduce(value: inout V, nextValue: () -> V) {
        value = nextValue()
    }
    
}

struct Page1: View {
    let backgroundGradient = LinearGradient(
        colors: [Color.red, Color.blue],
        startPoint: .top, endPoint: .bottom)
    var body1:some View {
        ZStack {
            backgroundGradient
        }.ignoresSafeArea(.container,edges: .all)
    }
    var body:some View {
        VStack() {
            
            VStack{
                HStack{
                    Text("Home")
                    Spacer()
                    Text("Home")
                }.padding().background(.red,ignoresSafeAreaEdges:[.top])
            }.frame(height: 44)
            
            
            RoundedRectangle(cornerRadius: 10)
                .fill(.blue)
                .frame(width:100, height: 100)
            
            ZStack {
                Text("MyPreferenceKey")
                    .padding()
                    .background(.secondary,in:.capsule)
                    .anchorPreference(key: MyPreferenceKey.self, value: .bounds) { anchor in
                       return [anchor]
                    }
            }.backgroundPreferenceValue(MyPreferenceKey.self) {
                preference in
                GeometryReader { proxy in
                    var _ = print(preference)
                    if let first = preference.first {
                        let frame = proxy[first]
                        RoundedRectangle(cornerRadius: 10)
                            .fill(.red)
                            .frame(width: frame.width,height: frame.height)
                    }else {
                        EmptyView()
                    }
                }
            }
        }
        .onPreferenceChange(MyPreferenceKey.self) { preference in
            print(preference)
        }
    }
}
```
