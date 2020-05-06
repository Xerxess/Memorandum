<!-- TOC -->

- [UIControl](#uicontrol)
- [控件](#控件)
- [UIControlEvents](#uicontrolevents)

<!-- /TOC -->

# UIControl

控件的基类，控件是视觉元素，可响应用户交互传达特定的动作或意图。

# 控件

- UIButton 响应用户交互执行自定义代码的控件。
- UIDatePicker 用于输入日期和时间值的控件。
- UIPageControl 显示水平水平的点的控件，每个点对应于应用程序文档或其他数据模型实体中的页面。
- UISegmentedControl 由多个片段组成的水平控件，每个片段都充当一个离散按钮。
- UISlider 用于从连续值范围中选择单个值的控件。
- UIStepper 用于增加或减少值的控件。
- UISwitch 提供二进制选择的控件，例如“开/关”。

# UIControlEvents

| 名称                                 | 描述                                                               |
| ------------------------------------ | ------------------------------------------------------------------ |
| UIControlEventTouchDown              | 控件中的按下事件。                                                 |
| UIControlEventTouchDownRepeat        | 控件中的重复触地事件；对于此事件，UITouch 方法的值大于 1。tapCount |
| UIControlEventTouchDragInside        | 在控件的边界内拖动手指的事件。                                     |
| UIControlEventTouchDragOutside       | 手指被拖动到控件边界之外的事件。                                   |
| UIControlEventTouchDragEnter         | 将手指拖动到控件范围内的事件。                                     |
| UIControlEventTouchDragExit          | 手指从控件内拖动到其边界之外的事件。                               |
| UIControlEventTouchUpInside          | 控件中的触摸事件，其中手指在控件范围内。                           |
| UIControlEventTouchUpOutside         | 控件中的触摸事件，其中手指在控件的边界之外。                       |
| UIControlEventTouchCancel            | 系统事件取消控件的当前触摸。                                       |
| UIControlEventValueChanged           | 触摸拖动或以其他方式操纵控件，使其发出一系列不同的值。             |
| UIControlEventPrimaryActionTriggered | 按钮触发的语义动作。                                               |
| UIControlEventEditingDidBegin        | 通过输入对象的边界在对象中启动编辑会话的触摸。UITextField          |
| UIControlEventEditingChanged         | 在对象中进行编辑更改的触摸。UITextField                            |
| UIControlEventEditingDidEnd          | 通过离开对象边界来结束对象中的编辑会话的触摸。UITextField          |
| UIControlEventEditingDidEndOnExit    | 结束对象中的编辑会话的触摸。UITextField                            |
| UIControlEventAllTouchEvents         | 所有触摸事件。                                                     |
| UIControlEventAllEditingEvent        | 对象的所有编辑接触。UITextField                                    |
| UIControlEventApplicationReserved    | 一系列可用于应用程序的控制事件值。                                 |
| UIControlEventSystemReserved         | 保留供内部框架使用的一系列控制事件值。                             |
| UIControlEventAllEvents              | 所有事件，包括系统事件。                                           |
