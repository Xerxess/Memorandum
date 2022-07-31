<!-- TOC -->

- [UIDevice](#uidevice)
- [API](#api)
    - [获取共享设备实例](#获取共享设备实例)
    - [Determining the Available Features 确定可用功能](#determining-the-available-features-确定可用功能)
    - [Identifying the Device and Operating System 识别设备和操作系统](#identifying-the-device-and-operating-system-识别设备和操作系统)
    - [Tracking the Device Orientation 跟踪设备方向](#tracking-the-device-orientation-跟踪设备方向)
    - [Determining the Current Orientation 确认方向](#determining-the-current-orientation-确认方向)
    - [Getting the Device Battery State 获取设备电池状态](#getting-the-device-battery-state-获取设备电池状态)
    - [Using the Proximity Sensor 使用距离感应器](#using-the-proximity-sensor-使用距离感应器)
    - [Playing Input Clicks 播放键盘点击（应该是音频）](#playing-input-clicks-播放键盘点击应该是音频)
    - [Managing Notifications](#managing-notifications)

<!-- /TOC -->

# UIDevice

当前设备的表示。

* 使用UIDevice对象`获取`有关`设备的信息`，例如分配的名称、设备型号以及操作系统名称和版本。
* 您还可以使用UIDevice实例来`检测设备特征的变化`，例如物理方向。
    您可以使用方向属性获取当前方向，或通过注册方向DidChangeNotification通知接收更改通知。在使用这些技术之一获取定向数据之前，您必须使用 beginGeneratingDeviceOrientationNotifications() 方法启用数据交付。当您不再需要跟踪设备方向时，请调用endGeneratingDeviceOrientationNotifications()方法来禁用通知的传递。
* UIDevice实例来获取有关`电池充电状态`（由电池状态属性描述）和电量（由电池级别属性描述）变化的信息和通知。
* UIDevice实例还提供对`接近传感器状态的访问`（由接近状态属性描述）。接近传感器检测用户`是否将设备靠近脸部`。仅在需要时启用电池监控或接近感应。
* 您还可以使用playInputClick()实例方法在自定义输入和键盘配件视图中播放键盘输入点击。

```swift
@MainActor class UIDevice : NSObject
```

# API

## 获取共享设备实例

```swift
// 表示当前设备的对象。
class var current: UIDevice

```

## Determining the Available Features 确定可用功能

```swift
// 一个布尔值，指示当前设备是否支持多任务处理。
var isMultitaskingSupported: Bool

```

## Identifying the Device and Operating System 识别设备和操作系统

```swift
// 设备的名称。
var name: String

// 设备上运行的操作系统的名称。
var systemName: String

// 操作系统的当前版本。
var systemVersion: String

// 设备的型号。
var model: String

// 设备作为本地化字符串的模型。
var localizedModel: String

// 在当前设备上使用的界面样式。
// 对于通用应用程序，您可以使用此属性为特定类型的设备定制应用程序的行为。
// 例如，iPhone和iPad设备的屏幕尺寸不同，因此您可能需要根据当前设备的类型创建不同的视图和控件。
// enum UIUserInterfaceIdiom : Int, @unchecked Sendable
// case unspecified 一个未指明的成语。
// case phone 为iPhone和iPod touch设计的界面。
// case pad 专为iPad设计的界面。
// case tv 为 Apple tvOS 和 Apple TV 设计的界面。
// case carPlay 专为车内体验设计的界面。
// case mac 为Mac设计的界面。
var userInterfaceIdiom: UIUserInterfaceIdiom

// 一个字母数字字符串，用于唯一标识应用程序供应商的设备。
var identifierForVendor: UUID?

```

## Tracking the Device Orientation 跟踪设备方向

```swift
// 设备的物理方向。
// 该属性的值是一个常量，指示设备的当前方向。此值表示设备的物理方向，可能与应用程序用户界面的当前方向不同。有关可能值的描述，请参阅UIDeviceOrientation。
// 除非通过调用 beginGeneratingDeviceOrientationNotifications() 启用方向通知，否则此属性的值始终返回 0。
// enum UIDeviceOrientation
//case unknown 无法确定设备的方向。
//case portrait 设备处于纵向模式，设备保持直立状态，主屏幕按钮位于底部。
//case portraitUpsideDown 设备处于纵向模式，但颠倒，设备直立，主屏幕按钮位于顶部。
//case landscapeLeft 设备处于横向模式，设备保持直立，主屏幕按钮位于右侧。
//case landscapeRight 设备处于横向模式，设备保持直立，主屏幕按钮位于左侧。
//case faceUp 设备与地面平行，屏幕朝上。
//case faceDown 设备与地面平行，屏幕朝下。
//
//var isPortrait: Bool 一个布尔值，指示设备是否处于纵向方向。
//var isLandscape: Bool 一个布尔值，指示设备是否处于横向方向。
//var isFlat: Bool 一个布尔值，指示指定的方向是正面朝上还是朝下。
//var isValidInterfaceOrientation: Bool 一个布尔值，指示指定方向是纵向还是横向之一。
var orientation: UIDeviceOrientation

// 一个布尔值，指示设备是否生成方向通知。
var isGeneratingDeviceOrientationNotifications: Bool

// 开始生成设备方向更改的通知。
func beginGeneratingDeviceOrientationNotifications()

// 停止生成设备方向更改的通知。
func endGeneratingDeviceOrientationNotifications()


```

## Determining the Current Orientation 确认方向

```swift
// 一个布尔值，指示设备是否处于纵向方向。
var isPortrait: Bool

// 一个布尔值，指示设备是否处于横向方向。
var isLandscape: Bool

// 一个布尔值，指示指定的方向是正面朝上 or 朝下。
var isFlat: Bool

// 一个布尔值，指示指定方向是纵向 or 横向之一。
var isValidInterfaceOrientation: Bool
```

## Getting the Device Battery State 获取设备电池状态

```swift
// 设备的电池电量。
// 电池电量从0.0（完全放电）到1.0（100%充电）不等。
// 在访问此属性之前，请确保已启用电池监控。
//
// 如果没有启用电池监控，电池状态为UIDevice.BatteryState.unknown，此属性的值为-1.0。
var batteryLevel: Float

// 一个布尔值，指示是否启用了电池监控。
// 如果您的应用程序需要收到电池状态变化的通知，或者如果您想检查电池电量，请启用电池监控。
//
// 此属性的默认值为false，即：禁用电池相关通知的发布无法读取电池电量和电池状态
var isBatteryMonitoringEnabled: Bool

// 设备的电池状态。
// enum BatteryState
// case unknown 无法确定设备的电池状态。
// case unplugged 设备未插接电源；电池正在放电。
// case charging 设备已插入电源，电池电量低于100%。
// case full 设备已接入电源，电池电量为 100%。
var batteryState: UIDevice.BatteryState

```

## Using the Proximity Sensor 使用距离感应器

```swift
//  一个布尔值，指示是否启用了接近监控。
var isProximityMonitoringEnabled: Bool

// 一个布尔值，指示接近传感器是否靠近用户。
var proximityState: Bool

```

## Playing Input Clicks 播放键盘点击（应该是音频）

```swift
// 在启用的输入视图中播放输入单击。
func playInputClick()

```

## Managing Notifications

所有UIDevice通知都由当前返回的单例设备 `current` 发布。

```swift
// 当电池电量发生变化时发布的通知。
class let batteryLevelDidChangeNotification: NSNotification.Name

// 当电池状态发生变化时发布的通知。
class let batteryStateDidChangeNotification: NSNotification.Name

// 当设备方向发生变化时发布的通知。
class let orientationDidChangeNotification: NSNotification.Name

// 当接近传感器的状态发生变化时发布的通知。
class let proximityStateDidChangeNotification: NSNotification.Name


```
