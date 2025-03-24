<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Tables](#tables)
  - [Table](#table)

<!-- /code_chunk_output -->

# Tables

显示按行和列排列的可选择、可排序的数据

与 List 一样，表包含隐式垂直滚动，您可以使用 Scroll views 中描述的视图修饰符对其进行配置

## Table

- iPhone可以放弃 仅显示第一列数据 请采用List

Table 是 SwiftUI 在 iOS 16 及更高版本中引入的一个组件，用于显示结构化的表格数据。它类似于 macOS 上的 NSTableView 或 Web 开发中的 HTML 表格，提供了行和列的布局，非常适合展示结构化数据。

定义单个表以在 macOS、iOS 和 iPadOS 上使用。但是，在 iPhone 上或在紧凑的水平大小类环境中（通常在 iPad 上的某些模式，如侧拉）中），表格显示其列的空间有限。为了节省空间，当表检测到此情况时，`它会自动隐藏第一个列之后的标题和所有列`。

`重要： 在 iPhone 上，表格会折叠以仅显示第一列数据，但在 iPad 和 Mac 上，它们将显示所有数据`

```swift
//
//  page1.swift
//  SwiftUI_Demo
//
//  Created by yang.chuan on 2025/3/20.
//

import SwiftUI
struct Product: Identifiable {
    let id = UUID()
    let name: String
    let category: String
    let price: Double
    let stock: Int
}

struct Page1: View {
    let products = [
        Product(name: "iPhone 13", category: "手机", price: 5999, stock: 120),
        Product(name: "MacBook Pro", category: "电脑", price: 12999, stock: 45),
        Product(name: "AirPods Pro", category: "配件", price: 1999, stock: 200),
        Product(name: "iPad Air", category: "平板", price: 4799, stock: 75)
    ]
    
    @State private var sortOrder = [KeyPathComparator(\Product.name)]
    @State private var selection: Product.ID?
    
    var body: some View {
        VStack {
            Text("产品库存管理")
                .font(.largeTitle)
                .padding()
            
            Table(products, selection: $selection, sortOrder: $sortOrder) {
                TableColumn("产品名称", value: \.name) { product in
                    Text(product.name)
                        .bold()
                }
                TableColumn("类别", value: \.category) { product in
                    Text(product.category)
                }
                TableColumn("价格", value: \.price) { product in
                    Text("¥\(String(format: "%.2f", product.price))")
                        .foregroundStyle(.blue)
                }
                TableColumn("库存", value: \.stock) { product in
                    HStack {
                        Text("\(product.stock)")
                        
                        // 库存状态指示器
                        Circle()
                            .fill(stockStatusColor(product.stock))
                            .frame(width: 10, height: 10)
                    }
                }
                TableColumn("操作") { product in
                    Button("编辑") {
                        // 编辑操作
                    }
                    .buttonStyle(.bordered)
                    .controlSize(.small)
                }
            }
            .onChange(of: sortOrder) { _ in
                // 处理排序变化
            }
        }
        .padding()
    }
    
    func stockStatusColor(_ stock: Int) -> Color {
        if stock < 50 {
            return .red
        } else if stock < 100 {
            return .yellow
        } else {
            return .green
        }
    }
}

#Preview {
    Page1()
}

```
