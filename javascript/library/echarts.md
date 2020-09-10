<!-- TOC -->

- [echarts](#echarts)
- [dataset](#dataset)
    - [dimensions 维度设置](#dimensions-维度设置)
    - [series.seriesLayoutBy](#seriesserieslayoutby)
    - [series.encode](#seriesencode)
    - [demo](#demo)
- [自定义绘图系列](#自定义绘图系列)
    - [renderItem(params,api)](#renderitemparamsapi)
    - [type='group'](#typegroup)
    - [type='text'](#typetext)
- [小技巧](#小技巧)
    - [tooltip.formatter](#tooltipformatter)

<!-- /TOC -->

# echarts

# dataset

使用 dataset 管理数据

## dimensions 维度设置

常用图表所描述的数据大部分是“二维表”结构，上述的例子中，我们都使用二维数组来容纳二维表。现在，当我们把系列（series）对应到“列”的时候，那么每一列就称为一个“维度（dimension）”，而每一行称为数据项（item）。反之，如果我们把系列（series）对应到表行，那么每一行就是“维度（dimension）”，每一列就是数据项（item）。

- 'number': 默认，表示普通数据。
- 'ordinal': 对于类目、文本这些 string 类型的数据，如果需要能在数轴上使用，须是'ordinal' 类型。ECharts 默认会自动判断这个类型。但是自动判断也是不可能很完备的，所以使用者也可以手动强制指定。
- 'time': 表示时间数据。设置成 'time' 则能支持自动解析数据成时间戳（timestamp），比如该维度的数据是 '2017-05-10'，会自动被解析。如果这个维度被用在时间数轴（axis.type 为 \* 'time'）上，那么会被自动设置为 'time' 类型。时间类型的支持参见 data。
- 'float': 如果设置成 'float'，在存储时候会使用 TypedArray，对性能优化有好处。
- 'int': 如果设置成 'int'，在存储时候会使用 TypedArray，对性能优化有好处。

```js
// dataset
dimensions: ['product', '2015', '2016', '2017'];
// dataset
dataset: {
    dimensions: [
        {name: 'score'},
        // 可以简写为 string，表示维度名。
        'amount',
        // 可以在 type 中指定维度类型。
        {name: 'product', type: 'ordinal'}
    ],
    source: [...]
}

// series
series: {
        type: 'line',
        // 在系列中设置的 dimensions 会更优先采纳。
        dimensions: [
            null, // 可以设置为 null 表示不想设置维度名
            'amount',
            {name: 'product', type: 'ordinal'}
        ]
    }
```

## series.seriesLayoutBy

```js
series: [
  // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行,即每一行为一个维度
  { type: 'bar', seriesLayoutBy: 'row' },
  // 默认 column 即每一列为一个维度
  { type: 'bar', seriesLayoutBy: 'column' },
];
```

## series.encode

## demo

```js
option = {
  legend: {},
  tooltip: {},
  dataset: {
    // 提供一份数据。
    source: [
      ['product', '2015', '2016', '2017'],
      ['Matcha Latte', 43.3, 85.8, 93.7],
      ['Milk Tea', 83.1, 73.4, 55.1],
      ['Cheese Cocoa', 86.4, 65.2, 82.5],
      ['Walnut Brownie', 72.4, 53.9, 39.1],
    ],
  },
  // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
  xAxis: { type: 'category' },
  // 声明一个 Y 轴，数值轴。
  yAxis: {},
  // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
};
```

# 自定义绘图系列

https://echarts.apache.org/zh/option.html#series-custom.type

- 动画还不清楚怎样处理

## renderItem(params,api)

https://echarts.apache.org/zh/option.html#series-custom.renderItem
https://echarts.apache.org/zh/option.html#series-custom.renderItem.arguments.params
https://echarts.apache.org/zh/option.html#series-custom.renderItem.arguments.api

## type='group'

https://echarts.apache.org/zh/option.html#series-custom.renderItem.return_group

- group 是唯一的可以有子节点的容器。group 可以用来整体定位一组图形元素。

## type='text'

- 无法设置宽度，需要自行处理换行

```js
series: [
  {
    type: 'custom',
    animation: true,
    coordinateSystem: 'none',
    datasetIndex: 0,
    renderItem(params, api) {
      const labelWidth = 140;
      const label2Width = 30;
      const rectWidth = 300;
      const boxWidth = api.getWidth();
      const wrapWidth = labelWidth + label2Width + rectWidth + 40;
      return {
        type: 'group',
        position: [boxWidth / 2 - wrapWidth - 40, 46 + params.dataIndex * 30],
        width: labelWidth + label2Width + rectWidth + 40,
        children: [
          {
            type: 'rect',
            left: 'right',
            shape: { x: labelWidth + label2Width + 40, y: 0, width: rectWidth, height: 20 },
            style: Object.assign(api.style(), {
              fill: '#ddd',
            }),
          },
          {
            type: 'rect',
            shape: { x: labelWidth + label2Width + 40 + (rectWidth - (rectWidth * api.value(1)) / 100), y: 0, width: (rectWidth * api.value(1)) / 100, height: 20 },
            style: api.style(),
          },
          {
            type: 'text',
            style: {
              text: params.dataIndex === 0 ? '已授权人脸识别员工占比(TOP10)' : '',
              textAlign: 'right',
              font: 'bolder 20px "Microsoft YaHei", sans-serif',
              x: labelWidth + label2Width + rectWidth + 40,
              y: -40,
            },
          },
          {
            type: 'text',
            style: {
              text: api.value(0),
              textAlign: 'right',
              x: labelWidth,
              y: 5,
            },
          },
          {
            type: 'text',
            style: {
              text: `${api.value(1)}%`,
              textAlign: 'right',
              x: labelWidth + label2Width + 20,
              y: 5,
            },
          },
        ],
      };
    },
  },
];
```

# 小技巧

## tooltip.formatter

- 自定时需要显示前面的小点要使用.marker

```js
tooltip: {
    trigger: 'axis',
    formatter: function(p) {
        let str = [p[0].name]
         p.forEach((item) => {
            str.push(`${item.marker} ${item.seriesName}: ${item.value[item.seriesIndex + 1]}%`)
        })
         return str.join('<br/>')
    }
}
```
