<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [CGRect](#cgrect)

<!-- /code_chunk_output -->


# CGRect

https://developer.apple.com/documentation/corefoundation/cgrect

包含矩形位置和尺寸的结构

```swift
func rect(){
    let rect = CGRect(x: 0, y: 0, width: 100, height: 100)
    print(rect) // (0.0, 0.0, 100.0, 100.0)
    print("origin",rect.origin) // origin (0.0, 0.0)
    print("size",rect.size) // (100.0, 100.0)
    print("width",rect.width) // 100.0
    print("height",rect.height) // 100.0
    print("minX",rect.minX) // 0.0
    print("minY",rect.minY) // 0.0
    print("midX",rect.midX) // 50.0
    print("midY",rect.midY) // 50.0
    print("maxX",rect.maxX) // 100.0
    print("maxY",rect.maxY) // 100.0
    
    print("standardized",rect.standardized)
    // standardized (0.0, 0.0, 100.0, 100.0)
    
    // 返回一个比源矩形更小或更大的矩形，中心点相同。
    print("insetBy",rect.insetBy(dx: -10.0, dy: -10.0))
    // insetBy (-10.0, -10.0, 120.0, 120.0)
    
    // 根据UIEdgeInsets 调整 rect 的大小 中心点不变
    print("inset",rect.inset(by: UIEdgeInsets(top: 10, left: 10, bottom: 10, right: 10)))
    // inset (10.0, 10.0, 80.0, 80.0)
    
    // 返回一个与源矩形的原点偏移的矩形
    print("offsetBy",rect.offsetBy(dx: 50.0, dy: 50.0))
    // offsetBy (50.0, 50.0, 100.0, 100.0)
    
    // 返回包含两个源矩形的最小矩形
    print("union",rect.union(CGRect(x: 150, y: 150, width: 200, height: 200)))
    // union (0.0, 0.0, 350.0, 350.0)
    
    // 返回两个矩形的交点
    print("intersection",rect.intersection(CGRect(x: 50, y: 50, width: 200, height: 200)))
    // intersection (50.0, 50.0, 50.0, 50.0)
    
    // 两个矩形是否相交
    print("intersects",rect.intersects(CGRect(x: 0, y: 0, width: 200, height: 200)))
    // intersects true
    
    // 矩形是否包含指定点
    print("contains(point:)",rect.contains(.init(x: 50, y: 50)))
    // contains(point:) true
    
    // 返回第一个矩形是否包含第二个矩形。
    print("contains(rect:)",rect.contains(CGRect(x: 0, y: 0, width: 200, height: 200)))
    // contains(rect:) false
    
    // 分割原始矩形来创建两个矩形。
    print("divided.minXEdge",rect.divided(atDistance: 50, from: CGRectEdge.minXEdge))
    // divided.minXEdge (slice: (0.0, 0.0, 50.0, 100.0), remainder: (50.0, 0.0, 50.0, 100.0))
    
    // 分割原始矩形来创建两个矩形。
    print("divided.maxXEdge",rect.divided(atDistance: 50, from: CGRectEdge.maxXEdge))
    // divided.maxXEdge (slice: (50.0, 0.0, 50.0, 100.0), remainder: (0.0, 0.0, 50.0, 100.0))
    
    
}
```