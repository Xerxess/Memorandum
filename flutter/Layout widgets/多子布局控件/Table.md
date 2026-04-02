
# Table

Table 组件用于创建严格的、非滚动的表格布局。它与 GridView 或 ListView 不同，Table 的每一行高度由该行内最高的子组件决定，而每一列的宽度可以通过列宽算法精确控制。
Table 的直接子组件必须是 TableRow，而 TableRow 的子组件才是实际的 Widget。

Table: 适用于静态、行列关系固定的数据（如报表、价目表）。它不支持滚动，且由于需要计算每一行的高度，所有内容会一次性渲染。
GridView: 适用于大量重复、可滚动的网格数据。支持懒加载（Builder）。
Column + Row: 组合布局灵活性最高，但无法保证不同行之间“列与列”的宽度强制对齐，而 Table 能确保每一列的垂直对齐完美一致。

## demo

```dart
Table(
  border: TableBorder.all(color: Colors.grey), // 设置边框
  columnWidths: const <int, TableColumnWidth>{
    0: FixedColumnWidth(100.0), // 第一列固定 100px
    1: FlexColumnWidth(),       // 第二列自动占据剩余空间
  },
  defaultVerticalAlignment: TableCellVerticalAlignment.middle, // 垂直对齐方式
  children: <TableRow>[
    TableRow(
      children: <Widget>[
        Container(height: 32, color: Colors.green),
        TableCell(
          verticalAlignment: TableCellVerticalAlignment.top,
          child: Container(height: 64, color: Colors.red),
        ),
      ],
    ),
    // 更多 TableRow...
  ],
)
```