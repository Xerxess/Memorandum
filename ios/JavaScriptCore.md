<!-- TOC -->

- [JavaScriptCore](#javascriptcore)
- [JSContext](#jscontext)
- [JSValue](#jsvalue)
  - [Objective-C 或 Swift 与 JavaScript 之间的类型转换](#objective-c-或-swift-与-javascript-之间的类型转换)
- [JSManagedValue](#jsmanagedvalue)
- [JSVirtualMachine](#jsvirtualmachine)
- [JSExport](#jsexport)
- [demo](#demo)

<!-- /TOC -->

# JavaScriptCore

http://www.ecma-international.org/publications/standards/Ecma-262.htm

* 支持 Ecma-262（es5）

苹果 Safari 浏览器的 javascript 引擎, 主要负责 OC 与 JS 之间的交互

# JSContext

表示一个JavaScript执行环境。

# JSValue

js 对象与 OC 对象进行转换

## Objective-C 或 Swift 与 JavaScript 之间的类型转换

| Objective-C                                     | JavaScript |
| ----------------------------------------------- | ---------- |
| nil                                             | undefined  |
| NSNull                                          | null       |
| NSString                                        | String     |
| NSNumber                                        | Number     |
| NSDictionary                                    | Object     |
| NSArray                                         | Array      |
| NSDate                                          | Date       |
| Objective-C(id 或 AnyObject)(Class 或 AnyClass) | Object     |
| NSRange，CGRect，CGPoint，CGSize                | Object     |
| Objective-C 块                                  | Function   |

# JSManagedValue

对底层Javascript值的引用


# JSVirtualMachine

一个实例代表JavaScript执行一个独立的环境。将该类用于两个主要目的：支持并发JavaScript执行，以及管理在JavaScript和Objective-C或Swift之间桥接的对象的内存。

# JSExport

协议，用于将Objective-C类及其实例方法，类方法和属性导出到JavaScript代码。

# demo

```c++
  JSContext *context=[[JSContext alloc] init];
  // js注入
  [context evaluateScript:@"let name='lower';"];
  [context evaluateScript:@"var a = 1+2*3;"];
  [context evaluateScript:@"function fun(a,b){return a+b;}"];
  // oc通过kvc获取js 变量
  NSLog(@"JSValue%@",context[@"name"]);
  NSLog(@"a = %@", context[@"a"]);
  NSLog(@"fn = %@", context[@"fun"]);

  // 执行js方法
  [context[@"fun"] callWithArguments:@[@(1),@(2)]];
```