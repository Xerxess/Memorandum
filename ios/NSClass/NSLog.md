
<!-- TOC -->

- [NSLog](#nslog)
- [NSRange,CGRect等结构体](#nsrangecgrect等结构体)

<!-- /TOC -->

# NSLog

```c++
NSLog(@"字符串:%@",name);

NSLog(@"字符:%c",a);

NSLog(@"布尔值:%i",isShow);

NSLog(@"整形:%i",i);

NSLog(@"单精度浮点数： %f",f);

NSLog(@"精度浮点数,且只保留两位小数:%.2f",f);

NSLog(@"科学技术法:%e",f);

NSLog(@"科学技术法(用最简短的方式):%g",f);

NSLog(@"同时打印两个整数：i＝%i,f=%f",i,f);

```

# NSRange,CGRect等结构体

使用对应的转换
NSStringFromCGPoint  
NSStringFromCGSize  
NSStringFromCGRect  
NSStringFromCGAffineTransform  
NSStringFromUIEdgeInsets
比如
NSLog(@"rect1: %@", NSStringFromCGRect(rect1));