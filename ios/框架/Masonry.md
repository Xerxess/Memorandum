<!-- TOC -->

- [Masonry基础API](#masonry基础api)
- [更新约束和布局](#更新约束和布局)
- [对应关系](#对应关系)
- [MASViewAttribute](#masviewattribute)
- [添加新的约束](#添加新的约束)
- [常见约束的各种类型](#常见约束的各种类型)

<!-- /TOC -->

Masonry

一种强大而灵活的组织和布局视图的方式

* 使用Masonry不需要设置控件的translatesAutoresizingMaskIntoConstraints属性为NO;

```c++
UIEdgeInsets padding = UIEdgeInsetsMake(10, 10, 10, 10);

[view1 mas_makeConstraints:^(MASConstraintMaker *make) {
    make.top.equalTo(superview.mas_top).with.offset(padding.top); //with is an optional semantic filler
    make.left.equalTo(superview.mas_left).with.offset(padding.left);
    make.bottom.equalTo(superview.mas_bottom).with.offset(-padding.bottom);
    make.right.equalTo(superview.mas_right).with.offset(-padding.right);
}];
```
# Masonry基础API

```c++
mas_makeConstraints()    添加约束
mas_remakeConstraints()  移除之前的约束，重新添加新的约束
mas_updateConstraints()  更新约束，写哪条更新哪条，其他约束不变

equalTo()       参数是对象类型，一般是视图对象或者mas_width这样的坐标系对象
mas_equalTo()   和上面功能相同，参数可以传递基础数据类型对象，可以理解为比上面的API更强大

width()         用来表示宽度，例如代表view的宽度
mas_width()     用来获取宽度的值。和上面的区别在于，一个代表某个坐标系对象，一个用来获取坐标系对象的值
```

# 更新约束和布局

```
- (void)updateConstraintsIfNeeded  调用此方法，如果有标记为需要重新布局的约束，则立即进行重新布局，内部会调用updateConstraints方法
- (void)updateConstraints          重写此方法，内部实现自定义布局过程
- (BOOL)needsUpdateConstraints     当前是否需要重新布局，内部会判断当前有没有被标记的约束
- (void)setNeedsUpdateConstraints  标记需要进行重新布局
```

# 对应关系

.equalTo === NSLayoutRelationEqual ‘=’
.lessThanOrEqualTo === NSLayoutRelationLessThanOrEqual ‘<=’
.greaterThanOrEqualTo === NSLayoutRelationGreaterThanOrEqual '>='

# MASViewAttribute

| MASViewAttribute  | NSLayoutAttribute         |
| ----------------- | ------------------------- |
| view.mas_left     | NSLayoutAttributeLeft     |
| view.mas_right    | NSLayoutAttributeRight    |
| view.mas_top      | NSLayoutAttributeTop      |
| view.mas_bottom   | NSLayoutAttributeBottom   |
| view.mas_leading  | NSLayoutAttributeLeading  |
| view.mas_trailing | NSLayoutAttributeTrailing |
| view.mas_width    | NSLayoutAttributeWidth    |
| view.mas_height   | NSLayoutAttributeHeight   |
| view.mas_centerX  | NSLayoutAttributeCenterX  |
| view.mas_centerY  | NSLayoutAttributeCenterY  |
| view.mas_baseline | NSLayoutAttributeBaseline |

# 添加新的约束

```
 //这个方法只会添加新的约束
 [blueView mas_makeConstraints:^(MASConstraintMaker *make)  {
 
 }];
 
 // 这个方法会将以前的所有约束删掉，添加新的约束
 [blueView mas_remakeConstraints:^(MASConstraintMaker *make) {
 
 }];
 
 // 这个方法将会覆盖以前的某些特定的约束
 [blueView mas_updateConstraints:^(MASConstraintMaker *make) {
 
 }];
```

# 常见约束的各种类型

```
 1.尺寸：width、height、size
 2.边界：left、leading、right、trailing、top、bottom
 3.中心点：center、centerX、centerY
 4.边界：edges
 5.偏移量：offset、insets、sizeOffset、centerOffset
 6.priority()约束优先级（0~1000），multipler乘因数, dividedBy除因数
```
