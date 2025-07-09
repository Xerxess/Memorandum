<https://developer.apple.com/documentation/swiftui/color>

# 常用颜色

```swift
// 主题色的颜色
static var accentColor: Color { get }

// 主要内容的颜色
static let primary: Color

// 辅助内容的颜色
static let secondary: Color
```

# 常用的修饰符

```swift
// 透明度
func opacity(_ opacity: Double) -> Color
```

# 自定义颜色

```swift
extension Color {
    // 方式1: 直接创建动态颜色
    static let customPrimary = Color(
        light: Color(red: 0.2, green: 0.4, blue: 0.8),
        dark: Color(red: 0.4, green: 0.6, blue: 1.0)
    )
    
    static let customBackground = Color(
        light: Color.white,
        dark: Color.black
    )
    
    static let customCard = Color(
        light: Color(red: 0.95, green: 0.95, blue: 0.97),
        dark: Color(red: 0.15, green: 0.15, blue: 0.17)
    )
    
    // 方式2: 使用UIColor创建动态颜色
    static let adaptiveBlue = Color(UIColor { traitCollection in
        switch traitCollection.userInterfaceStyle {
        case .dark:
            return UIColor(red: 0.4, green: 0.6, blue: 1.0, alpha: 1.0)
        default:
            return UIColor(red: 0.2, green: 0.4, blue: 0.8, alpha: 1.0)
        }
    })
    
    static let adaptiveText = Color(UIColor { traitCollection in
        switch traitCollection.userInterfaceStyle {
        case .dark:
            return UIColor.white
        default:
            return UIColor.black
        }
    })
    
    // 方式3: 基于colorScheme的动态颜色
    static func dynamicColor(
        light: Color,
        dark: Color
    ) -> Color {
        return Color(UIColor { traitCollection in
            switch traitCollection.userInterfaceStyle {
            case .dark:
                return UIColor(dark)
            default:
                return UIColor(light)
            }
        })
    }
}

// 使用扩展简化动态颜色创建
extension Color {
    init(light: Color, dark: Color) {
        self.init(UIColor { traitCollection in
            switch traitCollection.userInterfaceStyle {
            case .dark:
                return UIColor(dark)
            default:
                return UIColor(light)
            }
        })
    }
}
```
