# CSS权重

1. !important，加在样式属性值后，权重值为 10000
2. 内联样式，如：style=””，权重值为1000
3. ID选择器，如：#content，权重值为100
4. 类，伪类和属性选择器，如： .content、:hover 权重值为10
5. 标签选择器和伪元素选择器，如：div、p、:before 权重值为1
6. 通用选择器（*）、子选择器（>）、相邻选择器（+）、同胞选择器（~）、权重值为0

注意：
* 权重大的覆盖权重小的样式
* 权重相同后面的样式覆盖前面的样式
