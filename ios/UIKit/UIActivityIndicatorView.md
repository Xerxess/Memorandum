<!-- TOC -->

- [UIActivityIndicatorView](#uiactivityindicatorview)

<!-- /TOC -->

https://developer.apple.com/documentation/uikit/uiactivityindicatorview?language=objc

# UIActivityIndicatorView

系统 自带的loading...

```c++
 UIActivityIndicatorView *loading=[[UIActivityIndicatorView alloc] init];
    [loading startAnimating];
    loading.backgroundColor=[UIColor colorWithRed:0.0 green:0.0 blue:0.0 alpha:.5];
    loading.color=[UIColor whiteColor];
    // 一个布尔值，控制动画停止时是否不显示loading
    loading.hidesWhenStopped=true;
    
    UILabel *label=[[UILabel alloc] initWithFrame:CGRectMake(0, 0, 0,0)];
    [label setText:@"正在加载中。。。"];
    [label setTextColor:UIColor.whiteColor];
    [label setTextAlignment:NSTextAlignmentCenter];
    
    // 开始旋转
    [self.view addSubview:loading];
    [loading addSubview:label];

    // Masonry.h 建立约束
    [loading mas_makeConstraints:^(MASConstraintMaker *make) {
//        make.center.equalTo(self.view);
        make.size.equalTo(self.view);
    }];
    [label mas_makeConstraints:^(MASConstraintMaker *make) {
        make.width.equalTo(self.view);
        make.top.equalTo(loading.subviews[0].mas_bottom).and.offset(10);
    }];
```