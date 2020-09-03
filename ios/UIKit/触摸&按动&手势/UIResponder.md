<!-- TOC -->

- [UIResponder](#uiresponder)

<!-- /TOC -->

# UIResponder

 响应和处理事件的抽象接口

 ```c++
 // 返回响应者链中的下一个响应者
@property(nonatomic, readonly) UIResponder *nextResponder;

// YES接收者是第一响应者还是NO不是第一响应者
@property(nonatomic, readonly) BOOL isFirstResponder;
 ```

 ## 第一响应者

 ```c++
// 成为其窗口中的第一个响应者
- (BOOL)becomeFirstResponder;

// 放弃其作为第一响应者
// 可重写
- (BOOL)resignFirstResponder;
 ```

 ## 响应触摸事件

 ```c++
 // 开始
- (void)touchesBegan:(NSSet<UITouch *> *)touches 
           withEvent:(UIEvent *)event;

// 移动
- (void)touchesMoved:(NSSet<UITouch *> *)touches 
           withEvent:(UIEvent *)event;

// 结束
- (void)touchesEnded:(NSSet<UITouch *> *)touches 
           withEvent:(UIEvent *)event;

// 取消
- (void)touchesCancelled:(NSSet<UITouch *> *)touches 
               withEvent:(UIEvent *)event;
 ```

 ## 输入视图 (自定义键盘)

 ```c++
// 文本输入模式
@property(nonatomic, readonly, strong) UITextInputMode *textInputMode;

 // 当接收方成为第一响应方时显示的自定义输入视图
@property(nonatomic, readonly, strong) __kindof UIView *inputView;

// 接收者成为第一响应者时要使用的定制输入视图控制器
@property(nonatomic, readonly, strong) UIInputViewController *inputViewController;

// UITextField && UITextView 自定义输入附件视图
@property(nonatomic, readonly, strong) __kindof UIView *inputAccessoryView;

// UITextField && UITextView 自定义输入附件视图ViewController
@property(nonatomic, readonly, strong) UIInputViewController *inputAccessoryViewController;
 ```

 # UIEvent

 请见UIEvent.md
