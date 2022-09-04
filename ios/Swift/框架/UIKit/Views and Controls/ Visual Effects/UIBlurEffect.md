<!-- TOC -->

- [UIBlurEffect](#uiblureffect)
- [API](#api)
    - [](#)

<!-- /TOC -->

# UIBlurEffect

将模糊效果应用于视觉效果视图后面分层的内容的对象。

您添加到 contentView 视觉效果视图不受模糊效果的影响。

```swift
@MainActor class UIBlurEffect : UIVisualEffect
```

# API

## 

```swift
// 使用指定样式创建模糊效果。
init(style: UIBlurEffect.Style)


// 适用于模糊效果对象的模糊样式。

// Adaptable styles 适应性强的风格
// case systemUltraThinMaterial 适应性强的模糊效果，创造超薄材料的外观。
// case systemThinMaterial 一种适应性强的模糊效果，创造出薄材料的外观。
// case systemMaterial 一种适应性强的模糊效果，创造出厚度正常的材料的外观。
// case systemThickMaterial 适应性强的模糊效果，创造出比平时更厚的材料的外观。
// case systemChromeMaterial 一种适应性强的模糊效果，可以创建系统铬的外观。

// Light styles 轻盈的风格
// case systemUltraThinMaterialLight 一种模糊效果，创造出超薄材料的外观，并且总是很轻。
// case systemThinMaterialLight 一种模糊效果，创造出薄材料的外观，并且总是很轻盈。
// case systemMaterialLight 一种模糊效果，创造出厚度正常的材料的外观，并且总是很轻。
// case systemThickMaterialLight 一种模糊效果，创造出比平时更厚且总是轻盈的材料的外观。
// case systemChromeMaterialLight 一种模糊效果，创造系统铬的外观，并且总是很轻。

// Dark styles 深色风格
// case systemUltraThinMaterialDark 一种模糊效果，创造出超薄材料的外观，并且总是很暗。
// case systemThinMaterialDark 一种模糊的效果，创造出薄材料的外观，并且总是黑暗的。
// case systemMaterialDark 一种模糊效果，创造出厚度正常且总是深色的材料的外观。
// case systemThickMaterialDark 一种模糊效果，创造出比正常颜色更厚且总是深色的材料的外观。
// case systemChromeMaterialDark 一种模糊效果，可以创建系统铬的外观，并且总是很暗。

// Additional styles 其他样式
// case extraLight 视图的区域比底层视图更轻。
// case light 视图的面积与底层视图的近似亮度相同。
// case dark 视图的区域比底层视图更暗。
// case extraDark 视图的区域甚至比底层视图更暗。
// case regular 适应用户界面风格的常规模糊风格。
// case prominent 一种模糊的风格，使内容更突出，适应用户界面风格。
enum UIBlurEffect.Style

```